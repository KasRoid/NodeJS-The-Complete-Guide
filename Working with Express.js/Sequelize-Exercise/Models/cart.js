const fs = require(`fs`);
const path = require(`path`);

const filePath = path.join(
  path.dirname(require.main.filename),
  `public`,
  `data`,
  `cart.json`
);

let cart = [];

module.exports = class Cart {
  constructor(id) {
    this.id = id;
    this.quantity = 1;
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        callback([]);
      } else {
        const list = JSON.parse(data);
        callback(list);
      }
    });
  }

  save() {
    fs.readFile(filePath, (error, data) => {
      let itemAlreadyExists = false;
      if (!error) {
        cart = JSON.parse(data);
        if (cart.length > 0) {
          for (const item of cart) {
            if (item.id === this.id) {
              item.quantity += 1;
              itemAlreadyExists = true;
            }
          }
        }
      }
      if (!itemAlreadyExists) cart.push(this);
      fs.writeFile(filePath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }
};
