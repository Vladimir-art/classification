import express, { Application } from "express";
import dotenv from "dotenv";
import passport from "passport";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "./config/database";
import User from "./model/user";
import { verifyToken } from "./middleware/auth";
import { setupGitHubStrategy } from "./strategies/passport-github-strategy";


//For env File
dotenv.config();

connect();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

setupGitHubStrategy();

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
    res.status(200).json(user);
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
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/classification", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.get("/auth/google", passport.authenticate("google"), function (req, res) {
  // The request will be redirected to Google for authentication, so
  // this function will not be called.
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/classification");
  }
);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

module.exports = app;
