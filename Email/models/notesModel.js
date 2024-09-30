const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  body: String,
  tittle: String,
  userId: String,
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnat%25C3%25BCre%2F&psig=AOvVaw2GC9VvOCnO0R-jDZIlULEd&ust=1727062447766000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiH3JjP1YgDFQAAAAAdAAAAABAE",
  },
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = NotesModel;
