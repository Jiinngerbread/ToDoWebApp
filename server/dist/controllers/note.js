"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleNote = exports.getAllNotes = exports.removeSingleNote = exports.updateSingleNote = exports.create = void 0;
const note_1 = __importDefault(require("../models/note"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = yield note_1.default.create({
        title: req.body.title,
        description: req.body.description,
    });
    res.json({
        note: {
            id: newNote._id,
            title: newNote.title,
            description: newNote.description
        }
    });
});
exports.create = create;
const updateSingleNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const { title, description } = req.body;
    const note = yield note_1.default.findByIdAndUpdate(noteId, { title, description }, { new: true });
    if (!note)
        return res.json({ error: "Note not found!" });
    yield note.save();
    res.json({ note });
});
exports.updateSingleNote = updateSingleNote;
const removeSingleNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const removedNote = yield note_1.default.findByIdAndDelete(noteId);
    if (!removedNote)
        return res.json({ error: "Could not remove note!" });
    res.json({ message: "Note removed successfully." });
});
exports.removeSingleNote = removeSingleNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find();
    res.json({ notes });
});
exports.getAllNotes = getAllNotes;
const getSingleNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield note_1.default.findById(id);
    if (!note)
        return res.json({ error: "Note not found!" });
    res.json({ note });
});
exports.getSingleNote = getSingleNote;
