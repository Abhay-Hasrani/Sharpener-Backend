const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    const productCollection = db.collection("shop");
    let dbOp;
    if (this._id) {
      dbOp = productCollection.updateOne(
        {
          _id: this._id,
        },
        { $set: this }
      );
    } else {
      dbOp = productCollection.insertOne(this);
    }
    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static delete(id) {
    const db = getDb();
    const productCollection = db.collection("shop");
    return productCollection
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    const productCollection = db.collection("shop");
    return productCollection
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    const productCollection = db.collection("shop");
    return productCollection
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
