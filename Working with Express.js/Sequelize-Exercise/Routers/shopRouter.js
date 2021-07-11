const express = require(`express`);

const router = express.Router();

const controller = require(`../controllers/shopController`);

// GET
router.get(`/`, controller.getProducts);
router.get(`/cart`, controller.getCart);

// POST
router.post("/cart", controller.postCart);
router.post(`/delete`, controller.postDeleteCartItem);

module.exports = router;
