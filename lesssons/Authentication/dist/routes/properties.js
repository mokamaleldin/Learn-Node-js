"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_1 = __importDefault(require("../models/Property"));
const authorize_1 = require("../middleware/authorize");
const cloudinary_1 = require("../config/cloudinary");
const router = (0, express_1.Router)();
// Get all approved properties (only approved are public)
router.get('/', async (req, res) => {
    // property.find = SELECT * FROM properties;
    const properties = await Property_1.default.find({ isApprove: true });
    res.json(properties);
});
// Admin can see all properties
router.get('/all', authorize_1.adminOnly, async (req, res) => {
    const properties = await Property_1.default.find();
    res.json(properties);
});
// Create new property with images 
router.post('/', cloudinary_1.upload.array('images', 7), async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to create a property.' });
    }
    try {
        const propertyData = req.body;
        propertyData.user = req.session.userId;
        propertyData.isApprove = false;
        // Get uploaded image URLs from Cloudinary
        const files = req.files;
        if (files && files.length > 0) {
            propertyData.property_images = files.map(file => file.path);
        }
        else {
            propertyData.property_images = []; // Initialize empty array if no images
        }
        const property = await Property_1.default.create(propertyData);
        res.status(201).json({
            message: 'Property created successfully!',
            property: property,
            imageCount: property.property_images?.length || 0
        });
    }
    catch (err) {
        console.error('Property creation error:', err);
        res.status(500).json({ message: 'Failed to create property.' });
    }
});
// Edit a property by ID
router.put('/:id', cloudinary_1.upload.array('images', 7), async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to edit a property.' });
    }
    try {
        const property = await Property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        // Only the owner or admin can edit
        if (String(property.user) !== String(req.session.userId) && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to edit this property.' });
        }
        // Handle new images if uploaded
        const files = req.files;
        if (files && files.length > 0) {
            // Check total image limit (current + new images)
            const currentImageCount = property.property_images?.length || 0;
            if (currentImageCount + files.length > 7) {
                return res.status(400).json({
                    message: `Cannot add ${files.length} images. Maximum 7 images per property. Current: ${currentImageCount}`
                });
            }
            // Add new image URLs
            const newImageUrls = files.map(file => file.path);
            if (!property.property_images) {
                property.property_images = [];
            }
            property.property_images.push(...newImageUrls);
        }
        // Update property data (excluding images which are handled above)
        const { images, ...updateData } = req.body;
        Object.assign(property, updateData);
        property.updated_at = new Date();
        await property.save();
        res.json({
            message: 'Property updated successfully!',
            property: property,
            imageCount: property.property_images?.length || 0
        });
    }
    catch (err) {
        console.error('Property update error:', err);
        res.status(500).json({ message: 'Failed to edit property.' });
    }
});
// Delete a property by ID
router.delete('/:id', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to delete a property.' });
    }
    try {
        const property = await Property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        if (String(property.user) !== String(req.session.userId) && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this property.' });
        }
        // Delete images from Cloudinary before deleting the property
        if (property.property_images && property.property_images.length > 0) {
            for (const imageUrl of property.property_images) {
                try {
                    // Extract public_id from Cloudinary URL
                    const publicId = imageUrl.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary_1.cloudinary.uploader.destroy(`properties/${publicId}`);
                    }
                }
                catch (error) {
                    console.error('Error deleting image from Cloudinary:', error);
                }
            }
        }
        await property.deleteOne();
        res.json({ message: 'Property deleted.' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete property.' });
    }
});
exports.default = router;
