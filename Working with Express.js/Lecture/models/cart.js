const fs = require(`fs`);
const path = require(`path`);

const filePath = path.join(
  path.dirname(require.main.filename),
  `data`,
  `cart.json`
);

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }

  static addProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  /**
   * Remove a product in cart
   *
   * @param {String} id - Product ID
   * @param {()} callback - Completion Handler
   */
  static removeProduct(id, callback) {
    fs.readFile(filePath, (error, fileContent) => {
      if (error) return;
      let cart = JSON.parse(fileContent);
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      Product.findByID(id, (product) => {
        const price = product.price;
        const qty = cart.products[existingProductIndex].qty;
        const totalPrice = cart.totalPrice - price * qty;
        cart.products.splice(existingProductIndex, 1);
        cart.totalPrice = totalPrice;
        fs.writeFile(filePath, JSON.stringify(cart), () => {
          callback();
        });
      });
    });
  }

  /**
   * Remove a product in cart
   *
   * @param {String} id - Product ID
   * @param {()} callback - Completion Handler
   */
  static deleteProduct(id, price, callback) {
    fs.readFile(filePath, (error, fileContent) => {
      if (error) {
        callback();
        return;
      }
      let cart = JSON.parse(fileContent);
      const product = cart.products.find((product) => product.id === id);
      if (product) {
        const quantity = product.qty;
        cart.totalPrice -= price * quantity;
        cart.products = cart.products.filter((product) => product.id !== id);
        fs.writeFile(filePath, JSON.stringify(cart), callback);
      } else {
        callback();
      }
    });
  }
};
