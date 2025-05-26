import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email',
		},
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', UserSchema);

export { User };
