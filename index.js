require('dotenv').config();

//Configure express-session and MongoDB store
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//Configure express and mongoose
const express = require('express');
const mongoose = require('mongoose');


const app = express();

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collection: "mySessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Middleware to parse JSON
app.use(express.json());


//Import routes
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');


// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);



// Connect to MongoDB
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