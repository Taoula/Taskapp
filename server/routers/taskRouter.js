const router = require("express").Router();
const Task = require("../models/taskModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {

    try {
        const {name, priority, duration, isActive} = req.body
        const user = req.user
        const newTask = new Task({
            name, priority, duration, isActive, user
        });

        const savedTask = await newTask.save();
        
        res.json(savedTask);
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user
        const tasks = await Task.find({user: userId});
        res.json(tasks);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.delete("/:id/", auth, async (req, res) => {
    try{
        const _id = req.params.id
        const deleteTask = await Task.deleteOne({_id});
        res.json(deleteTask)
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

router.get("/:id/", auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({_id})
        res.json(task)
    } catch(err) { 
        console.error(err)
        res.status(500).send()
    }
})

router.patch("/:id/", auth, async (req, res) => {
    try {
        const _id = req.params.id
        const {name, priority, duration, isActive} = req.body
        const updatedTask = await Task.findOneAndUpdate({_id}, {name, priority, duration, isActive}, {new: true})
        res.json(updatedTask)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router;