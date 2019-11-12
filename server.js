require("dotenv").config();
const express = require("express");
const next = require("next");
const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require("./models/users");
const { Student } = require("./models/students");
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth-routes");
const studentRoutes = require("./routes/students");
const userRoutes = require("./routes/users");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const schedule = require("node-schedule");

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  // Connect to Database
  mongoose
    .connect(process.env.DB, {
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
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })
  );

  //Configure Azure Strategy
  passport.use(
    new AzureAdOAuth2Strategy(
      {
        clientID: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        callbackURL: `${process.env.HTTP}/auth/callback`,
        // tenant: process.env.TENANT_ID,
        scope: ["User.read"],
        authorizationURL: process.env.OUTLOOK_AUTHORITY,
        tokenURL: process.env.OUTLOOK_TOKEN_URL
      },
      async function(accessToken, refresh_token, params, profile, done) {
        // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
        // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
        var waadProfile = jwt.decode(params.access_token);
        await User.findOne({ email: waadProfile.upn.toLowerCase() })
          .then(currentUser => {
            if (currentUser) {
              done(null, currentUser);
            } else {
              throw "I'm afraid I may have broken something... Gathering duct tape... Please try again later";
            }
          })
          .catch(err => {
            done(err);
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
  server.use("/users", userRoutes);

  // Restrict Access to Routes
  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth");
  };

  // Schedule database updates for each quarter
  function newQuarterJob() {
    Student.find({}, function(err, students) {
      if (err) {
        console.log("Error!");
      }

      console.log(students);

      const updatePromises = students.map(student => {
        if (student.threeR !== "none") {
          return Student.findOneAndUpdate(
            { _id: student._id },
            {
              $push: { pastAwards: student.threeR },
              $set: {
                allInAward: false,
                outstandingAchievement: false,
                wowAward: false,
                cougarCommunityService: false,
                ccsWriteup: "",
                terrificKid: false,
                terrificKidChosenBy: "null",
                terrificKidWriteUp: "",
                threeR: "none",
                acceleratedReader: false,
                threeRwriteUp: ""
              }
            }
          );
        }
        if (student.terrificKid) {
          return Student.findOneAndUpdate(
            { _id: student._id },
            {
              $push: {
                pastAwards: `Terrific Kid chosen by ${student.terrificKidChosenBy}`
              },
              $set: {
                allInAward: false,
                outstandingAchievement: false,
                wowAward: false,
                cougarCommunityService: false,
                ccsWriteup: "",
                terrificKid: false,
                terrificKidChosenBy: "null",
                terrificKidWriteUp: "",
                threeR: "none",
                acceleratedReader: false,
                threeRwriteUp: ""
              }
            }
          );
        }
        if (student.allInAward) {
          return Student.findOneAndUpdate(
            { _id: student._id },
            {
              $push: {
                pastAwards: "All In Award"
              },
              $set: {
                allInAward: false,
                outstandingAchievement: false,
                wowAward: false,
                cougarCommunityService: false,
                ccsWriteup: "",
                terrificKid: false,
                terrificKidChosenBy: "null",
                terrificKidWriteUp: "",
                threeR: "none",
                acceleratedReader: false,
                threeRwriteUp: ""
              }
            }
          );
        }
        if (student.outstandingAchievement) {
          return Student.findOneAndUpdate(
            { _id: student._id },
            {
              $push: {
                pastAwards: "Outstanding Achievement"
              },
              $set: {
                allInAward: false,
                outstandingAchievement: false,
                wowAward: false,
                cougarCommunityService: false,
                ccsWriteup: "",
                terrificKid: false,
                terrificKidChosenBy: "null",
                terrificKidWriteUp: "",
                threeR: "none",
                acceleratedReader: false,
                threeRwriteUp: ""
              }
            }
          );
        }
        if (student.cougarCommunityService) {
          return Student.findOneAndUpdate(
            { _id: student._id },
            {
              $push: {
                pastAwards: "Cougar Community Service"
              },
              $set: {
                allInAward: false,
                outstandingAchievement: false,
                wowAward: false,
                cougarCommunityService: false,
                ccsWriteup: "",
                terrificKid: false,
                terrificKidChosenBy: "null",
                terrificKidWriteUp: "",
                threeR: "none",
                acceleratedReader: false,
                threeRwriteUp: ""
              }
            }
          );
        }
        return Student.findOneAndUpdate(
          { _id: student._id },
          {
            $set: {
              allInAward: false,
              outstandingAchievement: false,
              wowAward: false,
              cougarCommunityService: false,
              ccsWriteup: "",
              terrificKid: false,
              terrificKidChosenBy: "null",
              terrificKidWriteUp: "",
              threeR: "none",
              acceleratedReader: false,
              threeRwriteUp: ""
            }
          }
        );
      });

      Promise.all(updatePromises)
        .then(console.log("New quarter complete!"))
        .catch(console.error);
    });
  }

  // Test Job
  // schedule.scheduleJob("5 * * * * *", newQuarterJob);

  schedule.scheduleJob("* * 20 11 *", newQuarterJob);
  schedule.scheduleJob("* * 12 2 *", newQuarterJob);
  schedule.scheduleJob("* * 22 4 *", newQuarterJob);

  // handling everything else with Next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`listening on port ${process.env.PORT}`);
  });
});
