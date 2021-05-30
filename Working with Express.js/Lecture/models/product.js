const db = require(`../util/database`);

const Cart = require(`./cart`);

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static delete(id) {}

  static fetchAll() {
    return db.execute(`SELECT * FROM products`);
  }

  /**
   * Find a product by its ID.
   *
   * @param {String} id The ID of the product
   * @param {(product: Product) => void} callback Product Available
   */
  static findByID(id) {}
};
