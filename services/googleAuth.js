const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models/index');
require('dotenv').config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, done) => {
    // await db.User.findAll();
    // const email = profile.email;
    // const serchCritaria = {
    //   where: {
    //     email: email
    //   }
    // };

    // const defaults = {
    //   first_name: profile.given_name
    // };

    // const [users, created] = await db.User.findOrCreate(serchCritaria, defaults, function (err, User) {
    //   return done(err, User)
    // });
    // console.log(users);
    const newid = profile.id.slice(-3)
    const id = parseInt(newid)

    await db.User.findOrCreate({
      where:{
        id:profile.id.slice(-3)
      }} , function (err, User) {
      return done(err, User);
    });

    // console.log(refreshToken);
    // console.log(profile);
    // const newid = profile.id.slice(-3)
    // const id = parseInt(newid)
    console.log(id);
    console.log(typeof id); 
    // console.log(profile.id.slice(-3));
    done(null, profile);
  }
));


passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
})