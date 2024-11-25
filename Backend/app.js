// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const router = require('./route/router.js'); // Import the router file
const path = require('path');
const app = express();

// Set up view engine
app.set("view engine", 'ejs');

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware configuration
app.use(cors({
    origin: 'http://localhost:8081', // Adjust origin to match your frontend URL
    credentials: true
})); 
app.use(bodyParser.json()); // Parses JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.static('public')); // Serves static files from the 'public' directory
// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true only if you're using HTTPS
}));

// Use the router for all defined routes
app.use('/', router);

// Start server
const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});
