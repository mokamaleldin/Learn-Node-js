import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';

import signupRoute from './routes/auth/signup';
import loginRoute from './routes/auth/login';
import resetPasswordRoute from './routes/auth/resetPassword';
import logoutRoute from './routes/auth/logout';
import propertiesRoute from './routes/properties';
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
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/reset-password', resetPasswordRoute);
app.use('/logout', logoutRoute);
app.use('/properties', propertiesRoute);

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


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
