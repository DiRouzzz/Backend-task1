import chalk from 'chalk';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { addNote, getNotes, removeNote, editNote } from './notes.controller.js';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.delete('/:id', async (req, res) => {
	await removeNote(req.params.id);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.put('/:id', async (req, res) => {
	
	
	await editNote(req.params.id, req.body);

	res.render('index', {
		title: 'Express edit',
		notes: await getNotes(),
		created: false,
	});
});

app.post('/', async (req, res) => {
	await addNote(req.body.title);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true,
	});
});

app.listen(port, () => {
	console.log(chalk.green(`Server has been started ${port}...`));
});
