import chalk from 'chalk';
import { Note } from './models/Note.js';

async function addNote(title, owner) {
	await Note.create({ title, owner });
	console.log(chalk.green.inverse('Note was added!'));
}

async function removeNote(id, owner) {
	const result = await Note.deleteOne({ _id: id, owner });
	if (result.matchedCount === 0) {
		throw new Error('No note to remove');
	}
	console.log(chalk.yellow.inverse('Note was remove!', id));
}

async function getNotes() {
	const notes = await Note.find();

	return notes;
}

async function updateNote(noteData, owner) {
	const result = await Note.updateOne(
		{ _id: noteData.id, owner },
		{ title: noteData.title }
	);

	if (result.matchedCount === 0) {
		throw new Error('No note to edit');
	}

	console.log(chalk.blue.inverse('Note edited!', noteData.id));
}

export { addNote, removeNote, getNotes, updateNote };
