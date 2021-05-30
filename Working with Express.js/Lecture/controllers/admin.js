const Product = require(`../models/product`);

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(`admin/products`, {
      path: `/admin/products`,
      pageTitle: `Admin Products`,
      products: products,
    });
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
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect(`/`);
    })
    .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect(`/`);
  }
  const productID = req.params.productID;
  Product.findByID(productID, (product) => {
    if (!product) return res.redirect(`/`);
    res.render(`admin/edit-product`, {
      path: `/admin/edit-product`,
      pageTitle: `Edit Product`,
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    productID,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect(`/admin/products`);
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.productID;
  Product.delete(id, () => {
    res.redirect(`/admin/products`);
  });
};
