import { User } from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from './constants.js';

async function addUser(email, password) {
	const passwordHash = await bcrypt.hash(password, 10);
	await User.create({ email, password: passwordHash });
}

async function loginUser(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User is not found');
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) {
		throw new Error('Wrong password');
	}

	return jwt.sign({ email }, CONSTANTS.JWT_SECRET, { expiresIn: '30d' });
}

export { addUser, loginUser };
