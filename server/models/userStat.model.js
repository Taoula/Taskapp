const mongoose = require("mongoose")

const userStatSchema = new mongoose.Schema({
    userId: {type: mongoose.ObjectId, required:true},
    entries: {type: Array, required: true},
    daysCompleted: {type: Number, required: true},
    streak: {type: Number, required:true}
})

const UserStat = mongoose.model("userStat", userStatSchema);

module.exports = UserStat;