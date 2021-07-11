const path = require(`path`);

const Cart = require(`../models/cart`);

exports.getProducts = (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `home.html`));
};

exports.getCart = (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `cart.html`));
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  const cart = new Cart(productID);
  cart.save();
  res.redirect(`/cart`);
};

exports.postDeleteCartItem = (req, res, next) => {
  console.log(req.body.productID);
  res.redirect(`/cart`);
};
