import mongoose from 'mongoose';

const NoteSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
});

const Note = mongoose.model('Note', NoteSchema);

export { Note };
