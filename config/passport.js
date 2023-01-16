//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
const db = require('../models');
const Admin = db.admin;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "login",
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, login, password, done) {
    // When a user tries to sign in this code runs
    const admins = await Admin.findOne({ where: { login: login }}) 
      .then((admin) => {
        if(!admin){
          return done(null, false, {
            message: 'Utilisateur inconnu'
          })
        }
        bcrypt.compare(req.body.password, admin.password)
          .then((valid) => {
            if(!valid){
              return done(null, false, {
                message: 'Mot de passe invalide'          
              })
            } else {
              return done(null, admin);
            }
          })  
          .catch((err) =>{
            return done(err)
          })
        
      }) 
      .catch((err) => {
        return done(err)
      })
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findByPk(id).then(function(admin) { done(null, admin); });
});
//
// Exporting our configured passport
module.exports = passport;
