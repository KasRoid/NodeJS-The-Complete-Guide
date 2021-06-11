const path = require(`path`);

const express = require(`express`);

const shopController = require(`../controllers/shop`);

const router = express.Router();

// GET
router.get(`/`, shopController.getIndex);
router.get(`/products`, shopController.getProducts);
router.get(`/products/:productID`, shopController.getProduct);
router.get(`/cart`, shopController.getCart);
router.get(`/orders`, shopController.getOrders);
router.get(`/checkout`, shopController.getCheckout);

// POST
router.post(`/cart/remove-product/:productID`, shopController.deleteCart);
router.post(`/cart`, shopController.postCart);
router.post(`/cart-delete-item`, shopController.postCartDeleteProduct);

module.exports = router;
