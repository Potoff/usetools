const express = require('express');
const router = express.Router();
const db = require('../models');
const Admin = db.admin;
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/newAdmin', function(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const admin = new Admin({
        login: req.body.login,
        password: hash
      });
      admin.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé!'}))
        .catch((err) => res.status(400).json({ err }))
    })
    .catch((err) => res.status(500).json( { err } ))
});

module.exports = router;
