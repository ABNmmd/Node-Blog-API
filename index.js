require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts.js');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);




mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("conected to database.");
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(() => {
    console.log("connection failed");
});