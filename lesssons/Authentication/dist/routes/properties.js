"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_1 = __importDefault(require("../models/Property"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    // property.find = SELECT * FROM properties;
    const properties = await Property_1.default.find({ isApprove: true });
    res.json(properties);
});
// Create new property 
router.post('/', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to create a property.' });
    }
    try {
        const propertyData = req.body;
        propertyData.user = req.session.userId;
        propertyData.isApprove = false;
        const property = await Property_1.default.create(propertyData);
        res.status(201).json(property);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create property.' });
    }
});
exports.default = router;
