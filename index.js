require('dotenv').config();

//Configure express-session and MongoDB store
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

//Configure express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

const app = express();

const store = new MongoDBStore({
    mongoUrl: process.env.MONGODB_URI,
    collection: "mySessions"
});

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Middleware to parse JSON
app.use(express.json());


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