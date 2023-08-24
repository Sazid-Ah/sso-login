const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "917064149894-o73qqjujq67mnquu6rku538f8rl8s869.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "57fbac0b9dadd426f897";
GITHUB_CLIENT_SECRET = "28c18389b6075d2eeccafb0e6e8b335ac34c1e0a";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value; // Assuming the first email is the primary one
      console.log(email);
      const displayName = profile.displayName; // Use the display name as the username
      console.log(displayName);
      done(null, profile, email, displayName);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const username = profile.username;

      // Do something with the email and username (e.g., store in database)
      // console.log('Email:', email);
      // console.log('Username:', username);
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
