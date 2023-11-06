import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import passport from "passport";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import session from "express-session";
import connect from "./config/database";
import User from "./model/user";
import { verifyToken } from "./middleware/auth";
import "./strategies/passport-github-strategy";

connect();

const app: Application = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies)
  methods: "GET,POST,PUT,DELETE",
};

// Set up the express-session middleware
app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// setupGitHubStrategy();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(200).json({ token: user.token });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcryptjs.compare(password, user.password!))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json({ token: user.token });
    }
    res.status(400).send("Account could not found. Please SignUp");
  } catch (err) {
    console.log(err);
  }
});

app.post("/classification", verifyToken, async (req, res) => {
  const decodedUser = JSON.parse(JSON.stringify(req.user));
  const user = await User.findById(decodedUser.user_id);
  if (!user) return res.status(404).send("No requested user");
  res.status(200).send({ name: user.name, email: user.email });
});

app.get("/login/success", (req, res) => {
  if (req.user) {
    const githubUser = JSON.parse(JSON.stringify(req.user));
    res.status(200).send({
      name: githubUser.displayName,
      email: githubUser.profileUrl,
    });
  }
});

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/",
    successRedirect: "http://localhost:3000/",
  })
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error during logout");
    }
  });
  res.redirect("http://localhost:3000/");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

module.exports = app;
