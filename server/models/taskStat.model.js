const mongoose = require("mongoose")

const taskStatSchema = new mongoose.Schema({
    task: {type: mongoose.ObjectId, required: true},
    entries: {type: Array, required: true},
    timesCompleted: {type: Number, required: true},
    averageDuration: {type: Number, required:true},
    netTime: {type: Number, required: true}
})

const TaskStat = mongoose.model("TaskStat", taskStatSchema);

module.exports = TaskStat;