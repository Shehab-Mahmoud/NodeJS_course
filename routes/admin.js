const path = require('path');
const express = require('express');

const adminController = require('../controller/admin')
const rootDir = require('../util/path');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//router.get('/products',adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /

exports.routes = router;

