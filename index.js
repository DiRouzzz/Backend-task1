import 'dotenv/config';
import chalk from 'chalk';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/auth.js';
import {
	addNote,
	getNotes,
	removeNote,
	updateNote,
} from './notes.controller.js';

import { addUser, loginUser } from './user.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/register', async (req, res) => {
	res.render('register', {
		title: 'Express App',
		error: undefined,
	});
});

app.post('/register', async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password);
		res.redirect('/login');
	} catch (e) {
		if (e.code === 11000) {
			res.render('register', {
				title: 'Express App',
				error: 'Email is already registered',
			});

			return;
		}
		res.render('register', {
			title: 'Express App',
			error: e.message,
		});
	}
});

app.get('/login', async (req, res) => {
	res.render('login', {
		title: 'Express App',
		error: undefined,
	});
});

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');
	} catch (e) {
		res.render('login', {
			title: 'Express App',
			error: e.message,
		});
	}
});

app.get('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true });
	res.redirect('/login');
});

app.use(auth);

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		userEmail: req.user.email,
		created: false,
		error: false,
	});
});

app.delete('/:id', async (req, res) => {
	try {
		await removeNote(req.params.id, req.user.email);

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false,
		});
	} catch (error) {
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: error.message,
		});
	}
});

app.put('/:id', async (req, res) => {
	try {
		await updateNote(
			{ id: req.params.id, title: req.body.title },
			req.user.email
		);

		res.render('index', {
			title: 'Express edit',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false,
		});
	} catch (error) {
		res.render('index', {
			title: 'Express edit',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: e.message,
		});
	}
});

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title, req.user.email);

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: true,
			error: false,
		});
	} catch (error) {
		console.log('error app.post', e);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: true,
		});
	}
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server has been started ${port}...`));
	});
});
