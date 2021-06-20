const path = require(`path`);
const fs = require(`fs`);

let products = [];

const filePath = path.join(
  path.dirname(require.main.filename),
  `public`,
  `data`,
  `products.json`
);

module.exports = class Product {
  constructor(title, description, imageURL) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      if (!error) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  save() {
    fs.readFile(filePath, (error, data) => {
      if (!error) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }
};
