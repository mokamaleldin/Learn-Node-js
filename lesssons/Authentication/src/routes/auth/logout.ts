import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed.' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully.' });
    });
});

export default router;
