const upload = require('../../config/upload'); // Import the upload middleware

module.exports = {
    upload: upload.single('image') // Middleware to handle single image upload
};
