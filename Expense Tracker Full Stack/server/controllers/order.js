const Razorpay = require("razorpay");

const Order = require("../models/order");

exports.purchasePremium = (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const amount = 2500;
    // below orders is not our orders table it is razorpays orders property
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      // if (err) throw new Error("Order cannot be created in razor pay");
      if (err) {
        throw new Error(err);
      }
      const orderTableRow = await req.user.createOrder({
        orderID: order.id,
        status: "PENDING",
      });
      res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  const { orderID, paymentID } = req.body;
  try {
    const order = await Order.findOne({ where: { orderID } });
    const updatedOrder = await order.update({
      paymentID,
      status: "SUCCESSFUL",
    });
    const updatedUser = await req.user.update({ isPremium: true });
    res.status(202).json({ sucess: true, message: "Transaction Successful" });
  } catch (error) {
    console.log(error);
    res.status(402).json(error);
  }
};