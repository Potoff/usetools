const db = require("../models");
const Admin = db.admin;
const Category = db.category;
const Link = db.link;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

exports.dashboard = (req, res, next) => {
  Category.findAll().then((categories) => {
    res.render("dashboard", { category: categories });
  });
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
        res.redirect("/admin/dashboard");
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
  res.render("newCategoryForm");
};

exports.newCategory = (req, res, next) => {
  const category = new db.Category({
    name: req.body.name,
    description: req.body.description,
  });
  category
    .save()
    .then((category) => {
      req.flash("message", "La catégorie a bien été enregistrée");
      res.render("newCategoryForm", { message: req.flash("message") });
    })
    .catch((err) => {
      req.flash("error");
      res.render("newCategoryForm", { error: err });
    });
};

exports.newLink = (req, res, next) => {
  const link = new db.link(
    {
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
      img_url: req.body.img_url,
      CategoryId: req.body.categoryId,
    },
    {
      include: [
        {
          model: db.category,
        },
      ],
    }
  );
  link
    .save()
    .then((link) => {
      req.flash("message", "Lien ajouté avec succés.");
      res.render("dashboard", { message: req.flash("message") });
    })
    .catch((err) => {
      req.flash("error");
      res.render("dashboard", { error: err });
    });
};

exports.getAllLinks = (req, res, next) => {
  Category.findAll({ include: { model: db.link } }).then((categories) => {
    res.render("allLinkDashboard", {
      categories: categories,
    });
  });
};

exports.killLink = (req, res, next) => {
  Link.findOne({
    where: { id: req.params.id },
  })
    .then((link) => {
      link.destroy().then(() => {
        Category.findAll({ include: { model: db.link } }).then((categories) => {
          req.flash("message", "Le lien a bien été supprimé");
          res.render("allLinkDashboard", {
            message: req.flash("message"),
            categories: categories,
          });
        });
      });
    })
    .catch((err) => {
      req.flash("error");
      res.render("allLinkDashboard", { error: err });
    });
};

exports.allCategories = (req, res, next) => {
  Category.findAll().then((categories) => {
    res.render("allCategoriesDashboard", { categories: categories });
  });
};

exports.killCategory = (req, res, next) => {
  Category.findOne({
    where: { id: req.params.id },
  }).then((category) => {
    // Link.findAll({ where: { CategoryId: category.id } }).then((links) => {
    //   console.log(links)
    //   // links.destroy();
    // });
    category.destroy();
    Category.findAll()
      .then((categories) => {
        req.flash("message", "La catégorie a bien été supprimée.");
        res.render("allCategoriesDashboard", {
          categories: categories,
          message: req.flash("message"),
        });
      })
      .catch((err) => {
        req.flash("error");
        res.render("allCategoriesDashboard", { error: err });
      });
  });
};

exports.updateCategoryForm = (req, res, next) => {
  Category.findOne({
    where: { id: req.params.id },
  }).then((category) => {
    res.render("updateCategory", { category: category });
  });
  console.log(req.params);
};

exports.updateLinkForm = (req, res, next) => {
  Link.findOne({
    where: { id: req.params.id },
    include: [{ model: Category }],
  }).then((link) => {
    console.log(link);
    Category.findAll().then((categories) => {
      res.render("updateLink", {
        link: link,
        categories: categories,
      });
    });
  });
};

exports.updateLink = (req, res, next) => {
  Link.findOne({ where: { id: req.params.id }, include: [{ model: Category }] })
    .then((link) => {
      link.set({
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        img_url: req.body.img_url,
        CategoryId: req.body.categoryId,
      });
      return link;
    })
    .then((link) => {
      link.save();
      Category.findAll().then((categories) => {
        req.flash("message", "Lien modifié avec succès");
        res.render("updateLink", {
          message: req.flash("message"),
          link: link,
          categories: categories,
        });
      });
    })
    .catch((err) => {
      req.flash("error");
      res.render("updateLink", { error: err });
    });
};

exports.updateCategory = (req, res, next) => {
  Category.findOne({
    where: { id: req.params.id },
  }).then((category) => {
    category.set({
      name: req.body.name,
      description: req.body.description,
    });
    return category
  })
  .then((category) => {
    category.save()
    req.flash("message", "Catégorie modifiée avec succès");
        res.render("updateCategory", {
          message: req.flash("message"),
          category: category,
        });
  })
  .catch((err) => {
    req.flash("error");
    res.render("updateCategory", { error: err });
  });
};
