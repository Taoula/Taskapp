const router = require("express").Router();
const Schedule = require("../models/schedule.model");
const auth = require("../middleware/auth");

router.post("/", auth, async(req, res) => {
    try {
        const userId = req.user;
        const existing = await Schedule.findOne({userId})
        if (existing == null){
            const newSchedule = new Schedule({
                userId, entries: [], defaults: {wake: null, sleep: null}
            })
    
            const savedSchedule = await newSchedule.save()
    
            res.json(savedSchedule);
        }

        res.json("already exists")

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
        const {entries, defaults} = req.body;
        const updatedSchedule = await Schedule.findOneAndUpdate({userId}, {entries, defaults}, {new: true})
        res.json(updatedSchedule)
    } catch (err){
        console.error(err)
        res.status(500).send()
    }
})
module.exports = router; 