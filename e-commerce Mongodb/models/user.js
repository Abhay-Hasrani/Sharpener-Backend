const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (productId) {
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
      productId: productId,
      quantity: 1,
    });
  }
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteCartItem = function (productId) {
  const updatedCart = { items: [...this.cart.items] };
  updatedCart.items = updatedCart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const ObjectId = require("mongodb").ObjectId;
// const getDb = require("../util/database").getDb;
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this._id = id ? new ObjectId(id) : null;
//     this.cart = cart; //{items[]}
//     if (!cart || !cart.items) this.cart = { items: [] };
//   }
//   save() {
//     const db = getDb();
//     const userCollection = db.collection("users");
//     return userCollection
//       .insertOne(this)
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
//   static findUserById(id) {
//     const db = getDb();
//     const userCollection = db.collection("users");
//     return userCollection
//       .findOne({ _id: new ObjectId(id) })
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   getCart() {
//     if (!this.cart.items) this.cart.items = [];
//     const productIds = this.cart.items.map((i) => i.productId);
//     const db = getDb();
//     const productCollection = db.collection("shop");
//     return productCollection
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find(
//               (item) => item.productId.toString() === product._id.toString()
//             ).quantity,
//           };
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   createOrder() {
//     const db = getDb();
//     const orderCollection = db.collection("orders");
//     const userCollection = db.collection("users");

//     return this.getCart().then((products) => {
//       return orderCollection
//         .insertOne({
//           userId: new ObjectId(this._id),
//           orderItems: products,
//         })
//         .then((result) => {
//           this.cart = { items: [] };
//           return userCollection.updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//         });
//     });
//   }

//   getOrders() {
//     const db = getDb();
//     const orderCollection = db.collection("orders");
//     return orderCollection.find({ userId: this._id }).toArray();
//     // .then((orders) => {
//     //   console.log("yooooooooooooo");
//     //   console.log(orders);
//     // });
//   }
// }

// module.exports = User;
