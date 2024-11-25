const nodemailer = require('nodemailer');
const { createOrder } = require('../../model/orderModel');

// Set up Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'med696200@gmail.com', // Your Gmail address
    pass: 'nlxe macn xwbi xddn'   // Your Gmail password or App password if 2FA enabled
  }
});

const placeOrder = (req, res) => {
  const { name, address, payment, total_price, email } = req.body;  // Include email for customer
  
  // Create the order in the database
  createOrder({ name, address, payment, total_price }, (err, orderId) => {
    if (err) {
      console.error('Error inserting order into database:', err);
      return res.status(500).json({ message: 'Failed to place order' });
    }

    // Send email confirmation to the customer
    const mailOptions = {
      from: 'your_email@gmail.com',         // Your email address
      to: email,                            // Customer's email, passed from frontend
      subject: 'Order Confirmation',
      text: `
        Thank you for your order!

        Order ID: ${orderId}
        Name: ${name}
        Address: ${address}
        Payment Method: ${payment === 'cod' ? 'Cash on Delivery' : 'Check Payment'}
        Total Price: $${total_price}

        Your order is currently being processed and will be shipped soon.
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send confirmation email' });
      }

      console.log('Email sent:', info.response);
      return res.status(200).json({
        message: 'Order placed successfully, and confirmation email sent!'
      });
    });
  });
};

module.exports = { placeOrder };
