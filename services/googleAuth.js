const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models/index');
require('dotenv').config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope:['profile','email'],
  passReqToCallback: true,
},
  async (request, accessToken, refreshToken, profile, done) => {
    const usertabledata = await db.User.findOne({
      where: {
        email: profile.email
      }
    });
    if (usertabledata == null) {
      await db.User.create({
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        is_verified: 1
      })
    }
    done(null, profile);
  }
));


passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
})