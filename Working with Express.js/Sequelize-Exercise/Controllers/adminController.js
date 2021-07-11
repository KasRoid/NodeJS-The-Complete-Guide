const path = require(`path`);

const Product = require(`../models/product`);

exports.getAddProduct = (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `admin.html`));
};

exports.getEditProduct = (req, res, netx) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `admin-edit.html`));
};

exports.postAddProduct = (req, res, next) => {
  const id = Math.random();
  const title = req.body.title;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const product = new Product(id, title, description, imageURL);
  product.save();
  res.redirect(`/`);
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productID;
  Product.delete(id);
  res.redirect(`/admin/edit`);
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productID;
  res.sendFile(path.join(__dirname, `..`, `views`, `admin-edit-item.html`));
};
