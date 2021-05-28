const fs = require(`fs`);
const path = require(`path`);

const filePath = path.join(
  path.dirname(require.main.filename),
  `data`,
  `products.json`
);

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        console.log(`ID Exists`);
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        products[existingProductIndex] = this;
      } else {
        console.log(`New ID Created`);
        this.id = Math.random().toString;
        products.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findByID(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }
};
