import { Router } from 'express';
import Property from '../models/Property';

const router = Router();

router.get('/', async (req, res) => {
    // property.find = SELECT * FROM properties;
    const properties = await Property.find({ isApprove: true });
    res.json(properties);
});

export default router;
