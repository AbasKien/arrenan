const orderModel = require('../../model/orderModel');

const checkoutController = {
  createOrder: (req, res) => {
    const orderData = {
      userId: req.body.userId,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      total: req.body.total,
    };

    orderModel.createOrder(orderData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating order' });
      }
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    });
  },

  createOrderItem: (req, res) => {
    const orderItemData = {
      orderId: req.body.orderId,
      productId: req.body.productId,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    orderModel.createOrderItem(orderItemData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding order item' });
      }
      res.status(201).json({ message: 'Order item added successfully' });
    });
  },

  getOrderById: (req, res) => {
    const orderId = req.params.id;

    orderModel.getOrderById(orderId, (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(result[0]);
    });
  },

  getOrdersByUserId: (req, res) => {
    const userId = req.params.userId;

    orderModel.getOrdersByUserId(userId, (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
      res.status(200).json(results);
    });
  },

  getOrderItems: (req, res) => {
    const orderId = req.params.orderId;

    orderModel.getOrderItems(orderId, (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: 'No items found for this order' });
      }
      res.status(200).json(results);
    });
  },
};

module.exports = checkoutController;
