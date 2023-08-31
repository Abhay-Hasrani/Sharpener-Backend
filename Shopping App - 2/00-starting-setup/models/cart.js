const path = require("path");
const fs = require("fs");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProductToCart(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;

        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += price;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
