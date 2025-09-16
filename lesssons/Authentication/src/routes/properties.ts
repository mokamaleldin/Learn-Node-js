import { Router } from 'express';
import Property from '../models/Property';
import { adminOnly } from '../middleware/authorize';

const router = Router();

router.get('/', async (req, res) => {
    // property.find = SELECT * FROM properties;
    const properties = await Property.find({ isApprove: true });
    res.json(properties);
});


// Admin can see all properties
router.get('/all', adminOnly, async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
});

// Create new property 
router.post('/ ', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to create a property.' });
    }
    try {
        const propertyData = req.body;
        propertyData.user = req.session.userId;
        propertyData.isApprove = false;
        const property = await Property.create(propertyData);
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create property.' });
    }
});


// Edit a property by ID
router.put('/:id', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to edit a property.' });
    }
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        // Only the owner or admin can edit
        if (String(property.user) !== String(req.session.userId) && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to edit this property.' });
        }
        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: 'Failed to edit property.' });
    }
});

// Delete a property by ID
router.delete('/:id', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Please log in to delete a property.' });
    }
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        if (String(property.user) !== String(req.session.userId) && req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this property.' });
        }
        await property.deleteOne();
        res.json({ message: 'Property deleted.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete property.' });
    }
});

export default router;
