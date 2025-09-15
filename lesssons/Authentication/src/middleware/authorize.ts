import { Request, Response, NextFunction } from 'express';

export function adminOnly(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
}

