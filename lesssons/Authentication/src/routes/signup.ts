//make a new user 
import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        //await يخلي البرنامج "ينتظر" النتيجة قبل يكمل باقي الأسطر. 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
