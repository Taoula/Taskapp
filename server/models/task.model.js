const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    duration: {type: Number, required: true},
    priority: {type: Number, required:true},
    isActive: {type: Boolean, required:true},
    completed: {type: Boolean, required:true},
    user: {type: mongoose.ObjectId, required:true},
    time: {type: mongoose.Date, required:false}
})

const Task = mongoose.model("task", taskSchema);

module.exports = Task;