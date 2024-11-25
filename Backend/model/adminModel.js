// admin.model.js
const db = require('../config/db');  // Assuming you have a database connection file

// Model function to add a product to the database
const createProduct = (productData, callback) => {
    const { name, description, price, image_url } = productData;

    const query = `INSERT INTO products (name, description, price, image_url) 
                   VALUES (?, ?, ?, ?)`;

    db.query(query, [name, description, price, image_url], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Model function to get all products
const getAllProducts = (callback) => {
    const query = 'SELECT * FROM products';

    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Other possible model functions
// e.g. deleteProduct, updateProduct, etc.

module.exports = {
    createProduct,
    getAllProducts
};
