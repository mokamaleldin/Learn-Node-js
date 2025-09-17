"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//make a new user 
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = new User_1.default({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});
exports.default = router;
