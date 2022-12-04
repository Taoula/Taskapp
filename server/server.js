const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

//set up server

app = express();
const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true,
 })
)

//connect to mongodb

mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true, useUnifiedTopology: true
    },
    (err => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
}))

//set up routes

app.use("/auth", require("./routers/user-router"));
app.use("/task", require("./routers/task-router"));
app.use("/schedule", require("./routers/schedule-router"));
app.use("/taskStat", require("./routers/taskStat-router"));
app.use("/userStat", require("./routers/userStat-router"));