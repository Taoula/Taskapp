const router = require("express").Router();
const Schedule = require("../models/scheduleModel");
const auth = require("../middleware/auth");

router.post("/", auth, async(req, res) => {
    try {
        const {schedule} = req.body;
        const userId = req.user;

        const newSchedule = new Schedule({
            schedule, userId
        })

        const savedSchedule = await newSchedule.save()

        res.json(savedSchedule);
    } catch (err){
        console.error(err)
        res.status(500).send()
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user;
        const schedule = await Schedule.findOne({userId});
        res.json(schedule);
    } catch (err){
        console.error(err)
        res.status(500).send()
    }
});

router.patch("/", auth, async(req, res) => {
    try {
        const userId = req.user;
        const {schedule} = req.body;
        const updatedSchedule = await Schedule.findOneAndUpdate({userId}, {schedule}, {new: true})
        res.json(updatedSchedule)
    } catch (err){
        console.error(err)
        res.status(500).send()
    }
})
module.exports = router;