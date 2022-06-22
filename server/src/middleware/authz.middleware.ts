import jwt from 'jsonwebtoken';
import { privateKey } from './config';
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, privateKey.secret);
        if (decoded) next();
    } catch (error) {
        console.error(error);
        res.status(401).send("Invalid token")
    }
};

export default verifyToken;