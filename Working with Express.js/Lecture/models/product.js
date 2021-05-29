const fs = require(`fs`);
const path = require(`path`);

const filePath = path.join(
  path.dirname(require.main.filename),
  `data`,
  `products.json`
);

const readProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

const writeProdcutsToFile = (products) => {
  fs.writeFile(filePath, JSON.stringify(products), (err) => {
    console.log(err);
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
    readProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        console.log(`ID Exists ${existingProductIndex}`);
        products[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        console.log(`New ID Created ${this.id}`);
        products.push(this);
      }
      writeProdcutsToFile(products);
    });
  }

  static delete(id) {
    console.log(`Delete ${id}`);
    readProductsFromFile((products) => {
      const existingProductIndex = products.findIndex(
        (product) => product.id === id
      );
      products.splice(existingProductIndex, 1);
      writeProdcutsToFile(products);
    });
  }

  static fetchAll(callback) {
    readProductsFromFile(callback);
  }

  static findByID(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }
};
