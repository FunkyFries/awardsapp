const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with outlook
// router.get("/outlook", passport.authenticate("azure_ad_oauth2"));
router.get(
  "https://ccsawardsapp.herokuapp.com/auth/outlook",
  passport.authenticate("azure_ad_oauth2")
);

// Callback route for outlook strategy
router.get(
  // "/outlook/callback",
  "https://ccsawardsapp.herokuapp.com/auth/outlook/callback",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/outlook" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://ccsawardsapp.herokuapp.com/awards");
  }
);

module.exports = router;
