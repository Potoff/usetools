const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminCtrl = require('../controllers/admin');
const { admin } = require('../models');

/* GET users listing. */

router.get('/', adminCtrl.dashboard);

router.get('/newCategoryForm', adminCtrl.newCategoryForm);
router.post('/newCategory', adminCtrl.newCategory);
router.post('/newLink', adminCtrl.newLink);

module.exports = router;
