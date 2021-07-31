const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    schedule: {type: Array, required: true},
    userId: {type: mongoose.ObjectId, required: true}
})

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
