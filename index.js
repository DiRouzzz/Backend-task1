import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addNote, printNotes, removeNote } from './notes.controller.js';

const version = '1.0.1';

yargs(hideBin(process.argv))
	.version(version)
	.command({
		command: 'add',
		describe: 'Add new note to list',
		builder: {
			title: {
				type: 'string',
				describe: 'Note title',
				demandOption: true,
			},
		},
		handler({ title }) {
			addNote(title);
		},
	})
	.command({
		command: 'list',
		describe: 'Print all notes',
		async handler() {
			printNotes();
		},
	})
	.command({
		command: 'remove',
		describe: 'Remove note by id',
		builder: {
			id: {
				type: 'string',
				describe: 'Note id',
				demandOption: true,
			},
		},
		async handler({ id }) {
			removeNote(id);
		},
	})
	.parse();
