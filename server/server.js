const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);


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

//Set up session for stripe
app.use(session({
	saveUninitialized: false,
	cookie: {
		maxAge: 86400000
	},
	store: new MemoryStore({
		checkPeriod: 86400000
	}),
	resave: false,
	secret: 'keyboard cat'
}));

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
app.use("/settings", require("./routers/settings-router"));