"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const signup_1 = __importDefault(require("./routes/auth/signup"));
const login_1 = __importDefault(require("./routes/auth/login"));
const resetPassword_1 = __importDefault(require("./routes/auth/resetPassword"));
const logout_1 = __importDefault(require("./routes/auth/logout"));
const properties_1 = __importDefault(require("./routes/properties"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.use((0, express_session_1.default)({
    secret: process.env.YOUR_SECRET_KEY || '',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/signup', signup_1.default);
app.use('/login', login_1.default);
app.use('/reset-password', resetPassword_1.default);
app.use('/logout', logout_1.default);
app.use('/properties', properties_1.default);
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || '';
mongoose_1.default.connect(MONGO_URI)
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
