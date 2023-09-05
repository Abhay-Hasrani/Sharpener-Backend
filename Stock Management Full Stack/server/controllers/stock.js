const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  console.log("here");
  const products = await Product.findAll();
  res.json(products);
};
exports.addProducts = async (req, res, next) => {
  const receivedProduct = req.body;
  const name = receivedProduct.name;
  const description = receivedProduct.description;
  const price = receivedProduct.price;
  const quantity = receivedProduct.quantity;
  const createdProduct = await Product.create({
    name,
    description,
    price,
    quantity,
  });
  console.log("createdProduct :");
  console.log(createdProduct);
  res.json(createdProduct);
};
exports.editProductQuantity = async (req, res, next) => {
  const productID = req.params.productID;
  const itemsBought = req.query.itemsBought;
  //below function decrement will decrement the quantity property of product
  let product = await Product.findByPk(productID);
  if (product.quantity >= itemsBought) {
    const update = await Product.decrement(
      { quantity: itemsBought },
      { where: { id: productID } }
    );
  }
  updatedProduct = await product.reload();
  console.log("updatedProductQuantity : " + updatedProduct.quantity);
  console.log(updatedProduct);
  res.json(updatedProduct);
};
exports.deleteProducts = async (req, res, next) => {
  const productID = req.params.productID;
  const deletedProduct = Product.destroy({
    where: {
      id: productID,
    },
  });
  console.log("deletedProduct :");
  console.log(deletedProduct);
  res.json({ message: "deleted" });
};
