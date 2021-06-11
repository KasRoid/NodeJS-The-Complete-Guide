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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render(`shop/cart`, {
            path: `/cart`,
            pageTitle: `Your Cart`,
            products: products,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productID } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productID);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect(`/cart`);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect(`/cart`);
    })
    .catch((error) => {
      console.log(error);
    });
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
