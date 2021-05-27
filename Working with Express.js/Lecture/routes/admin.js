const path = require(`path`);

const express = require(`express`);

const adminController = require(`../controllers/admin`);

const router = express.Router();

// Get
router.get(`/add-product`, adminController.getAddProduct);
router.get(`/products`, adminController.getProducts);

// Post
router.post(`/add-product`, adminController.postAddProduct);

module.exports = router;
