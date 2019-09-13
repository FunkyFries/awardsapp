require("dotenv").config();
const express = require("express");
const next = require("next");
const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require("./models/users");
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth-routes");
const studentRoutes = require("./routes/students");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  // Connect to Database
  mongoose
    .connect("mongodb://localhost/awardsapi", {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(err.message));

  // Add sesion management
  server.use(
    cookieSession({
      secret: process.env.SESSION_SECRET,
      name: "session",
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000
    })
  );

  //Configure Azure Strategy
  passport.use(
    new AzureAdOAuth2Strategy(
      {
        clientID: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        callbackURL: "/auth/outlook/callback",
        // tenant: process.env.TENANT_ID,
        scope: ["User.read"],
        authorizationURL: process.env.OUTLOOK_AUTHORITY,
        tokenURL: process.env.OUTLOOK_TOKEN_URL
      },
      async function(accessToken, refresh_token, params, profile, done) {
        // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
        // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
        var waadProfile = jwt.decode(params.access_token);

        await User.findOne({ email: waadProfile.upn.toLowerCase() }).then(
          currentUser => {
            if (currentUser) {
              done(null, currentUser);
            } else {
              new User({
                profileId: profile.id,
                email: profile.EmailAddress
              })
                .save()
                .then(newUser => {
                  done(null, newUser);
                });
            }
          }
        );
      }
    )
  );

  // Configure Passport
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }).then(user => {
      done(null, user);
    });
  });

  // Add Passport and Auth routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use("/auth", authRoutes);
  server.use("/students", studentRoutes);

  // Restrict Access to Routes
  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/outlook");
  };

  // handling everything else with Next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`listening on port ${process.env.PORT}`);
  });
});
