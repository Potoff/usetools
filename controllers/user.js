const db = require("../models");
const Admin = db.admin;
const Links = db.link;
const Categories = db.category;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
  Admin.findOne({ where: { login: req.body.login } })
    .then((user) => {
      if (user) {
        res.redirect("/admin");

      } else {
        res.render("error", { message: "utilisateur non identifié" });
      }
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.index = (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 6;
  let offset = (page - 1) * limit;
  Categories.findAll({ include: { model: Links } }).then((categories) => {
    Links.findAll({
      offset: offset,
      limit: limit,
      include: { model: Categories },
    }).then((links) => {
       Links.count().then((totalItems) => {
        let totalPages = Math.ceil(totalItems / limit);
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
          pages.push({
            page: i,
            isCurrent: i === page,
          });
        }
        res.render("index", {
          categories: categories,
          links: links,
          categoriesLinks: categories.Links,
          pagination: {
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages,
            url: req.url,
            pages: pages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
          },
        });
      });
    });
  });
};
