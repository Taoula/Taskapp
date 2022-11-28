const mongoose = require("mongoose")

const userStatSchema = new mongoose.Schema({
    user: {type: Mongoose.ObjectId, required:true},
    entries: {type: Array, required:true}
})

const UserStat = mongoose.model("userStat", userStatSchema);

module.exports = UserStat;