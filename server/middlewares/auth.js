     import jwt from 'jsonwebtoken';

    const authMiddleware = (req, res, next) => {
        console.log("req.header('Authorization')",req.header('Authorization'))
        
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, 'abcc');
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };

     export default authMiddleware