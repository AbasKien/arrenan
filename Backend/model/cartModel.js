// cartModel.js (Create cartModel to handle database interactions for cart)
const db = require('../config/db'); // Assuming you have db configuration

const cartModel = {
  // Add item to cart
  addToCart: (userId, productId, quantity, callback) => {
    const query = "INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)";
    db.query(query, [userId, productId, quantity], (err, result) => {
      if (err) {
        console.error('Error adding to cart:', err);
        return callback(err);
      }
      callback(null, result);  // Successfully added to cart
    });
  },
  // Get cart items for the user
  getCartItems: (userId, callback) => {
    const query = "SELECT * FROM carts WHERE userId = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return callback(err);
      }
      callback(null, result);  // Return cart items
    });
  }
};

module.exports = cartModel;
