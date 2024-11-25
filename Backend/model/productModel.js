const db = require('../config/db'); // Your MySQL database connection

const productModel = {
    // Method to get all products
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM products"; // Fetching all products
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching products:', err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    // Method to create a new product (add product)
    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO products (name, description, price, image_url, stock, stock_limit) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(query, [data.name, data.description, data.price, data.image_url, data.stock, data.limit], (err, result) => {
                if (err) {
                    console.error('Error inserting product:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    // Method to update stock after an order is placed
    updateStock: (productId, quantity) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?";
            db.query(query, [quantity, productId, quantity], (err, result) => {
                if (err) {
                    console.error('Error updating stock:', err);
                    return reject(err);
                }
                // If no rows are affected, it means stock was insufficient
                if (result.affectedRows === 0) {
                    return reject('Insufficient stock');
                }
                resolve(result);
            });
        });
    },

    // Method to get product details by ID
    getById: (productId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM products WHERE id = ?";
            db.query(query, [productId], (err, results) => {
                if (err) {
                    console.error('Error fetching product:', err);
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
};

module.exports = productModel;
