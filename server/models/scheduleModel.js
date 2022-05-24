const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    schedule: {type: Array, required: true},
    start: {type: Date, required: false},
    end: {type: Date, required: false},
    userId: {type: mongoose.ObjectId, required: true}
})

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
