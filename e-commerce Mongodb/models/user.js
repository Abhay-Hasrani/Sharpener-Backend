const { use } = require("../routes/admin");

const ObjectId = require("mongodb").ObjectId;
const getDb = require("../util/database").getDb;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this._id = id ? new ObjectId(id) : null;
    this.cart = cart; //{items[]}
  }
  save() {
    const db = getDb();
    const userCollection = db.collection("users");
    return userCollection
      .insertOne(this)
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
  static findUserById(id) {
    const db = getDb();
    const userCollection = db.collection("users");
    return userCollection
      .findOne({ _id: new ObjectId(id) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  addToCart(productId) {
    if (!this.cart.items) this.cart.items = [];

    const index = this.cart.items.findIndex((item) => {
      return item.productId.toString() === productId.toString();
    });

    let updatedCart = {
      items: [...this.cart.items],
    };

    if (index >= 0) {
      updatedCart.items[index].quantity++;
    } else {
      updatedCart.items.push({
        productId: new ObjectId(productId),
        quantity: 1,
      });
    }

    const db = getDb();
    const userCollection = db.collection("users");
    return userCollection.updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
}

module.exports = User;
