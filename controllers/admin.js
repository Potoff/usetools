const db = require("../models");
const Admin = db.admin;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        login: req.body.login,
        password: hash,
      });
      admin
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  Admin.findOne({ where: { login: req.body.login } })
    .then((user) => {
      if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
      }
      req.flash(
        "error",
        "Vous devez être connecté et administrateur pour acceder à cette page !"
      );
      res.render("login", { message: req.flash("error") });
    })
    .catch((error) => res.status(500).json({ error: error }));
};
