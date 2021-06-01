const Product = require(`../models/product`);
const Cart = require(`../models/cart`);

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render(`shop/index`, {
        path: `/`,
        prods: products,
        pageTitle: `Shop`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render(`shop/product-list`, {
        path: `/products`,
        prods: products,
        pageTitle: `All Products`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.findAll({ where: { id: productID } })
    .then((products) => {
      res.render(`shop/product-detail`, {
        path: `/products`,
        pageTitle: products[0].title,
        product: products[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // Product.findByPk(productID)
  //   .then((product) => {
  //     res.render(`shop/product-detail`, {
  //       path: `/products`,
  //       pageTitle: product.title,
  //       product: product,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
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
