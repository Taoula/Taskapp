const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},       
    parent: {type: String, required: true},
    user: {type: mongoose.ObjectId, required:true},
    entries: {type: Array, required: true},
    defaults: {type: Object, required: true}
})

const Task = mongoose.model("task", taskSchema);

module.exports = Task; 