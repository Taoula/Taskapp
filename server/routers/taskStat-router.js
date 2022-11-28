const router = require("express").Router();
const TaskStat = require("../models/taskStat.model");
const auth = require("../middleware/auth");

router.post("/", auth, async(req, res) => {
    try{
        const {task, entries} = req.body
        const newTaskStat = new TaskStat({
            task, entries, timesCompleted: 0, averageDuration: 0, netTime: 0
        })

        const savedTaskStat = await newTaskStat.save()

        res.json(savedTaskStat)
    } catch (err){
        console.log(err)
        res.status(500).send()
    }
})

router.get("/:id/", auth, async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskStat = await TaskStat.findOne({task: taskId});
        res.json(taskStat);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.patch("/:id/", auth, async (req, res) => {
    try {
        const task = req.params.id
        const {entries, timesCompleted, averageDuration, netTime} = req.body
        const updatedTaskStat = await TaskStat.findOneAndUpdate({task}, {entries, timesCompleted, averageDuration, netTime}, {new: true})
        res.json(updatedTaskStat)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router;