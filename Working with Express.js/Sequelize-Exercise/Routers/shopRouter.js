const path = require(`path`);

const express = require(`express`);

const Cart = require(`../Models/cart`);

const router = express.Router();

router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `home.html`));
});

router.get(`/cart`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `cart.html`));
});

router.post("/cart", (req, res, next) => {
  const productID = req.body.productID;
  const cart = new Cart(productID);
  cart.save();
  res.redirect(`/cart`);
});

module.exports = router;
