const notesCtrl = {};

const { request } = require('express');
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({
        title,
        description//es lo mismo con los dos puntos o solo
    });
    await newNote.save();
    res.redirect('/notes');
};
notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find().lean();
    res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
    console.log({note})
};

notesCtrl.updateNote = async function(req, res){
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')
}
module.exports = notesCtrl;