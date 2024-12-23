require('dotenv').config();

//Configure express-session and MongoDB store
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

//Configure express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
    origin: 'https://academiahub-6l3t.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
};
app.use(cors(corsOptions));

// Add the security headers here
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'https://academiahub-6l3t.onrender.com');
    next();
});

const store = new MongoDBStore({
    mongoUrl: process.env.MONGODB_URI,
    collection: "mySessions"
});


// Middleware to parse JSON
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    }
}));

//Import routes
const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const userRoutes = require('./routes/userRoutes.js')


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/user', userRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
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