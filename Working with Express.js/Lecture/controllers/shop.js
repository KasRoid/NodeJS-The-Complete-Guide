const Product = require(`../models/product`);
const Cart = require(`../models/cart`);

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render(`shop/index`, {
        path: `/`,
        prods: rows,
        pageTitle: `Shop`,
      });
    })
    .catch((error) => console.log(erro));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render(`shop/product-list`, {
        path: `/products`,
        prods: rows,
        pageTitle: `All Products`,
      });
    })
    .catch((error) => console.log(error));
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
  Cart.fetchAll((items) => {
    let products = [];
    if (items.products && items.products.length > 0) {
      for (const [index, item] of items.products.entries()) {
        Product.findByID(item.id, (product) => {
          products.push(product);
          if (index === items.products.length - 1) {
            res.render(`shop/cart`, {
              path: `/cart`,
              pageTitle: `Your Cart`,
              products: products,
            });
          }
        });
      }
    } else {
      res.render(`shop/cart`, {
        path: `/cart`,
        pageTitle: `Your Cart`,
        products: products,
      });
    }
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

exports.deleteCart = (req, res, next) => {
  const id = req.params.productID;
  Cart.removeProduct(id, () => {
    res.redirect(`/cart`);
  });
};
