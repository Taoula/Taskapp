const router = require("express").Router();
const UserStat = require("../models/userStat.model");
const auth = require("../middleware/auth");

router.post("/", auth, async(req, res) => {
    try{
        const userId = req.user;
        const existing = await UserStat.findOne({userId})
        if (existing == null){
            const newUserStat = new UserStat({
                userId, entries: [], daysCompleted: 0, streak: 0
            })
    
            const savedUserStat = await newUserStat.save()
    
            res.json(savedUserStat)
        }
        res.json("already exists!")
    } catch (err){
        console.log(err)
        res.status(500).send()
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user;
        const userStat = await UserStat.findOne({userId});
        res.json(userStat);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.patch("/", auth, async (req, res) => {
    try {
        const userId = req.user;
        const {entries, daysCompleted, streak} = req.body;
        const updatedUserStat = await UserStat.findOneAndUpdate({userId}, {entries, daysCompleted, streak}, {new: true})
        res.json(updatedUserStat)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router;