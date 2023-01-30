const db = require("../models");
const Admin = db.admin;
const Links = db.link;
const Categories = db.category;
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

exports.index = (req, res, next) => {
    Categories.findAll({ include: { model: Links } })
        .then((categories) => {
            Links.findAll({ include: { model: Categories } })
                .then((links) => {
                    res.render('index', {
                        categories: categories,
                        links: links,
                        categoriesLinks: categories.Links
                    })
                })
        })
}