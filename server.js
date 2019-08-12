require("dotenv").config();
const express = require("express");
const next = require("next");
const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require("./models/users");
const OutlookStrategy = require("passport-outlook");
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

  // Configure OutlookStrategy
  passport.use(
    new OutlookStrategy(
      {
        clientID: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        authorizationURL: process.env.OUTLOOK_AUTHORITY,
        tokenURL: process.env.OUTLOOK_TOKEN_URL,
        callbackURL: "/auth/outlook/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        await User.findOne({ profileId: profile.id }).then(currentUser => {
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
        });
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
