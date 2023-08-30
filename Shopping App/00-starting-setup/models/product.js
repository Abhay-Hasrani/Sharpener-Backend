// let products = [];

const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "productsJSON.json");

function getProductsFromDatabase(cb) {
  fs.readFile(p, (err, productsData) => {
    if (err) cb([]);
    else {
      cb(JSON.parse(productsData));
    }
  });
}
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this);
    getProductsFromDatabase((products) => {
      console.log("products is", products);
      products.push(this);
      fs.writeFileSync(p, JSON.stringify(products));
    });
  }

  static fetchAll(cb) {
    getProductsFromDatabase(cb);
  }
};
