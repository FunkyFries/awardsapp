const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with outlook
router.get("/", passport.authenticate("azure_ad_oauth2"));

// Callback route for outlook strategy
router.get(
  "/callback",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.HTTP}/awards`);
  }
);

module.exports = router;
