const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    children: {type: Array, required:true},
    parent: {type: String, required: true},
    color: {type: String, required: true},
    user: {type: mongoose.ObjectId, required:true},
})

const Folder = mongoose.model("folder", folderSchema);

module.exports = Folder; 