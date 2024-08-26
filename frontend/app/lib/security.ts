import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super secret';
const JWT_OPTIONS = {
	expiresIn: '7d'
};

export const generateToken = (payload: object): string => {
	return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
};
