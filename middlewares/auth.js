import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../constants.js';

export const auth = (req, res, next) => {
	const token = req.cookies.token;

	try {
		const verifyResult = jwt.verify(token, CONSTANTS.JWT_SECRET);
		next();
	} catch (error) {
		res.redirect('/login');
	}
};
