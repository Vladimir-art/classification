import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../model/user";

// export const setupGitHubStrategy = () =>
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: "/auth/github/callback",
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      done(null, profile);
      // try {
      //   // Search for an existing user by GitHub ID
      //   let user = await User.findOne({ githubId: profile.id });

      //   if (user) {
      //     // If the user exists, simply return the user
      //     return done(null, user);
      //   } else {
      //     user = new User({
      //       githubId: profile.id,
      //       ...profile,
      //       // other user properties
      //     });

      //     // Save the new user to the database
      //     await user.save();

      //     // Return the newly created user
      //     return done(null, user);
      //   }
      // } catch (error) {
      //   return done(error, null);
      // }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
