import chalk from 'chalk';
import { Note } from './models/Note.js';

async function addNote(title) {
	await Note.create({ title });
	console.log(chalk.green.inverse('Note was added!'));
}

async function removeNote(id) {
	await Note.deleteOne({ _id: id });
	console.log(chalk.yellow.inverse('Note was remove!', id));
}

async function getNotes() {
	const notes = await Note.find();

	return notes;
}

async function updateNote(noteData) {
	await Note.updateOne({ _id: noteData.id }, { title: noteData.title });
	console.log(chalk.blue.inverse('Note edited!', noteData.id));
}

export { addNote, removeNote, getNotes, updateNote };
