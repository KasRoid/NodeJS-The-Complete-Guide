const Product = require(`../models/product`);

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render(`admin/products`, {
        path: `/admin/products`,
        pageTitle: `Admin Products`,
        products: products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAddProduct = (req, res, next) => {
  res.render(`admin/edit-product`, {
    path: `/admin/add-product`,
    pageTitle: `Add Product`,
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(`Created a product`);
      res.redirect(`/admin/products`);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect(`/`);
  }
  const productID = req.params.productID;
  Product.findByPk(productID)
    .then((product) => {
      if (!product) return res.redirect(`/`);
      res.render(`admin/edit-product`, {
        path: `/admin/edit-product`,
        pageTitle: `Edit Product`,
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findByPk(productID)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log(`Updated Product`);
      res.redirect(`/admin/products`);
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.productID;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log(`Destroyed Product`);
      res.redirect(`/admin/products`);
    })
    .catch();
};
