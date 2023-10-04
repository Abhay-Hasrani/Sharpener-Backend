const ObjectId = require("mongodb").ObjectId;
const getDb = require("../util/database").getDb;
class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id ? new ObjectId(id) : null;
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
}

module.exports = User;
