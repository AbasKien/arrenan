const productModel = require('../../model/productModel');

// Controller function to get all products
exports.getAllProducts = (req, res) => {
    productModel.getAll()
        .then(products => {
            res.json({ products });  // Return products as a JSON response
        })
        .catch(err => {
            res.status(500).json({ message: 'Error fetching products', error: err });
        });
};

// Controller function to add a new product
exports.addProduct = (req, res) => {
    const { name, description, price, stock, limit } = req.body;

    // Ensure the image file is uploaded
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image_url) {
        return res.status(400).json({ success: false, message: 'Image file is required!' });
    }

    if (stock < 0 || limit < 0) {
        return res.status(400).json({ success: false, message: 'Stock and limit must be non-negative' });
    }

    // Create product data object
    const newProduct = { name, description, price, image_url, stock, limit };

    // Add product to the database
    productModel.create(newProduct)
        .then(() => {
            res.json({ success: true, message: 'Product added successfully!', product: newProduct });
        })
        .catch(err => {
            console.error('Failed to add product:', err);
            res.status(500).json({ success: false, message: 'Failed to add product', error: err });
        });
};

// Controller function to reduce stock after an order
exports.reduceStock = (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
    }

    // Get the product details to check if the quantity ordered is valid
    productModel.getById(productId)
        .then(product => {
            if (product.stock < quantity) {
                return res.status(400).json({ success: false, message: 'Insufficient stock available' });
            }

            // Update the stock
            return productModel.updateStock(productId, quantity);
        })
        .then(() => {
            res.json({ success: true, message: 'Order processed successfully, stock updated' });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Error processing order', error: err });
        });
};
