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
router.get('/allLink', adminCtrl.getAllLinks);
router.post('/killLink/:id', adminCtrl.killLink);
router.get('/allCategories', adminCtrl.allCategories);
router.post('/killCategory/:id', adminCtrl.killCategory);
router.get('/updateCategory/:id', adminCtrl.updateCategoryForm);
router.get('/updateLink/:id', adminCtrl.updateLinkForm);
router.post('/updateLink/:id', adminCtrl.updateLink);
router.post('/updateCategory/:id', adminCtrl.updateCategory);
module.exports = router;
