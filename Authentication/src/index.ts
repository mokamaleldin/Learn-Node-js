import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';

import signupRoute from './routes/signup';
import loginRoute from './routes/login';
import resetPasswordRoute from './routes/resetPassword';
import passport from 'passport';
import { adminOnly } from './middleware/authorize';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies



app.use(session({
    secret: process.env.YOUR_SECRET_KEY || '', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/reset-password', resetPasswordRoute);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Example admin-only route
app.get('/admin-data', adminOnly, (req, res) => {
    res.json({ secret: 'This is admin-only data.' });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
