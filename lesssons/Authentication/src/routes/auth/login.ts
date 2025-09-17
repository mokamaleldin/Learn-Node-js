import 'express-session';
import { Router } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        req.session.userId = String(user._id);
        req.session.role = user.role;
        return res.status(200).json({ message: 'Login successful.', role: user.role });
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
