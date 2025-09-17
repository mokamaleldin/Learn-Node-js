"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successful.' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});
exports.default = router;
