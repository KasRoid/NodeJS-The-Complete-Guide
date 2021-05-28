const Product = require(`../models/product`);
const Cart = require(`../models/cart`);

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(`shop/index`, {
      path: `/`,
      prods: products,
      pageTitle: `Shop`,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(`shop/product-list`, {
      path: `/products`,
      prods: products,
      pageTitle: `All Products`,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.findByID(productID, (product) => {
    res.render(`shop/product-detail`, {
      path: `/products`,
      pageTitle: product.title,
      product: product,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render(`shop/cart`, {
    path: `/cart`,
    pageTitle: `Your Cart`,
  });
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.findByID(productID, (product) => {
    Cart.addProduct(productID, product.price);
  });
  res.redirect(`/cart`);
};

exports.getOrders = (req, res, next) => {
  res.render(`shop/orders`, {
    path: `/orders`,
    pageTitle: `Your Orders`,
  });
};

exports.getCheckout = (req, res, next) => {
  res.render(`shop/checkout`, {
    path: `/checkout`,
    pageTitle: `Checkout`,
  });
};
