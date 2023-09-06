const router = require("express").Router();
const Folder = require("../models/folder.model")
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    try {
        const {name, children, parent, color} = req.body
        const user = req.user
        const newFolder = new Folder({
            children, color, name, parent, user
        });

        const savedFolder = await newFolder.save();
        
        res.json(savedFolder);
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user
        const folders = await Folder.find({user: userId})
        res.json(folders);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.get("/:id/", auth, async (req, res) => {
    try {
        const _id = req.params.id
        const folder = await Folder.findOne({_id})
        res.json(folder)
    } catch(err) { 
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router; 