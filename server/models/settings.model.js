const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    theme: {type: String, required: true},
    freeTimeMethod: {type: String, required: true},
    freeTimeProportions: {type: Array, required: true},
    showPopUps: {type: Boolean, required: true},
    userId: {type: mongoose.ObjectId, required: true}
})

const Settings = mongoose.model("settings", settingsSchema);

module.exports = Settings;