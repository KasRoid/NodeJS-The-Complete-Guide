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
  constructor(id, title, description, imageURL) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static delete(id, callback) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log(`Error Occured`);
      } else {
        products = JSON.parse(data);
        for (const [index, product] of products.entries()) {
          if (Number(id) === product.id) {
            products.splice(index, 1);
            fs.writeFile(filePath, JSON.stringify(products), (error) => {
              console.log(error);
            });
          }
        }
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
