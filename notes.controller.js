import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	};

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.green.inverse('Note was added!'));
}

async function removeNote(id) {
	const notes = await getNotes();
	const filters = notes.filter(note => note.id !== id);

	await fs.writeFile(notesPath, JSON.stringify(filters));
	console.log(chalk.yellow.inverse('Note was remove!'));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.bgBlue('Here is the list of notes:'));
	notes.forEach(({ id, title }) => {
		console.log(chalk.blue(id, title));
	});
}

async function editNote(id, title) {
	const notes = await getNotes();
	const noteEdit = notes.map(note =>
		note.id === id ? { ...note, title } : note
	);
	await fs.writeFile(notesPath, JSON.stringify(noteEdit));
	console.log(chalk.yellow.inverse('Note edited!'));
}

export { addNote, printNotes, removeNote, editNote };
