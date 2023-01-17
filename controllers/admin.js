const db = require("../models");
const Admin = db.admin;
const Category = db.category;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

exports.dashboard = (req, res, next) => {
  console.log('caca')
  Category.findAll() 
    .then((categories) => {
      console.log(categories)
      res.render('dashboard', {category: categories})
    })
};

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

exports.newCategoryForm = (req, res, next) => {
  res.render('newCategoryForm');
}

exports.newCategory = (req, res, next) => {
  const category = new db.Category({
    name: req.body.name,
    description: req.body.description
  })
  category.save()
    .then((category) =>{
      req.flash('message', 'La catégorie a bien été enregistrée')
      res.render('newCategoryForm', {message: req.flash('message')})
    })
    .catch((err) => {
      req.flash('error')
      res.render('newCategoryForm', {error: err})
    })
};