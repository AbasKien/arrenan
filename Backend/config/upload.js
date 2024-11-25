const multer = require('multer');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`); // Use a unique name for each file
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File must be an image'), false);
    }
};

// Initialize multer with configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
