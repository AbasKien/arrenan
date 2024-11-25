const cartModel = require('../../model/cartModel');

// Controller function to add a product to the cart
const addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'User ID, product ID, and quantity are required' });
  }

  cartModel.addToCart(userId, productId, quantity, (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).json({ message: 'Error adding product to cart' });
    }
    res.json({ message: 'Product added to cart successfully!', success: true });
  });
};

// Controller function to get cart items
const getCartItems = (req, res) => {
  const userId = req.user.id; // Assuming user ID is available from session or token

  cartModel.getCartItems(userId, (err, cartItems) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ message: 'Error fetching cart items' });
    }
    res.json({ cartItems });
  });
};

// Export the controller functions as an object
module.exports = {
  addToCart,
  getCartItems
};
