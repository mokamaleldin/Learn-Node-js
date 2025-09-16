import { Router } from 'express';
import Property from '../models/Property';

const router = Router();

router.get('/', async (req, res) => {
    // property.find = SELECT * FROM properties;
    const properties = await Property.find({ isApprove: true });
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
        const property = await Property.create(propertyData);
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create property.' });
    }
});

export default router;
