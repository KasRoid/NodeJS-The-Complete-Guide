const path = require(`path`);

const express = require(`express`);

const router = express.Router();

const Product = require(`../models/product`);

router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `admin.html`));
});

router.post(`/`, (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const product = new Product(title, description, imageURL);
  product.save();
  res.redirect(`/`);
});

module.exports = router;
