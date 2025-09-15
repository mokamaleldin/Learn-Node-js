import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signupRoute from './routes/signup';
import loginRoute from './routes/login';
import resetPasswordRoute from './routes/resetPassword';
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));



app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/reset-password', resetPasswordRoute);



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
