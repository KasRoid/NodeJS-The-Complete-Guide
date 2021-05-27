const Product = require(`../models/product`);

exports.getAddProduct = (req, res, next) => {
  res.render(`admin/add-product`, {
    path: `/admin/add-product`,
    pageTitle: `Add Product`,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect(`/`);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(`admin/products`, {
      path: `/admin/products`,
      prods: products,
      pageTitle: `Admin Products`,
    });
  });
};
