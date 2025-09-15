import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const router = Router();

// Reset password route
router.post('/', async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successful.' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
