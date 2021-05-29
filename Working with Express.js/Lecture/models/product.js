const fs = require(`fs`);
const path = require(`path`);

const Cart = require(`./cart`);

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
      try {
        const data = JSON.parse(fileContent);
        callback(data);
      } catch {
        callback([]);
      }
    }
  });
};

const writeProdcutsToFile = (products, callback) => {
  fs.writeFile(filePath, JSON.stringify(products), (err) => {
    console.log(err);
    if (callback) callback();
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

  static delete(id, callback) {
    readProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      Cart.deleteProduct(id, product.price, () => {
        writeProdcutsToFile(updatedProducts, callback);
      });
    });
  }

  static fetchAll(callback) {
    readProductsFromFile(callback);
  }

  /**
   * Find a product by its ID.
   *
   * @param {String} id The ID of the product
   * @param {(product: Product) => void} callback Product Available
   */
  static findByID(id, callback) {
    readProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }
};
