const fs = require(`fs`);

let products = [];

const filePath = path.join(
  path.dirname(require.main.filename),
  `data`,
  `products.json`
);

module.exports = class Product {
  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      if (!error) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static post(product) {
    fs.readFile(filePath, (error, data) => {
      if (!error) {
        products = JSON.parse(data);
      }
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }
};
