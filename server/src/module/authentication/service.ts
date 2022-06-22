import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { privateKey } from '../../middleware/config';

export const sendRefreshToken = (user) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user._id
    }, privateKey.secret);
}

export const comparePassword = (LoginPassword: string, CheckPasswords: string): boolean => {
    return bcrypt.compareSync(LoginPassword, CheckPasswords, function (err, result) {
        if (err) {
            console.error(err);
            return false
        };
        return true;
    });
}
