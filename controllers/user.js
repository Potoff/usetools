const db = require("../models");
const Admin = db.admin;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
  Admin.findOne({ where: { login: req.body.login } })
    .then((user) => {
        if(user){
            res.redirect("/admin");  
        } else {
            res.render('error', {message: 'utilisateur non identifié'})
        }
    })
    .catch((error) => res.status(500).json({ error: error }));
};
