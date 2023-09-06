const router = require("express").Router();
const Settings = require("../models/settings.model");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user;
    const existing = await Settings.findOne({ userId })

    if (existing == null){
      const newSettings = new Settings({
        userId,
        theme: "light",
        freeTimeMethod: "default",
        freeTimeProportions: [1, 1, 1],
        showPopUps: true,
      });
  
      const savedSettings = await newSettings.save();
      res.json(savedSettings);
    }

    res.json("already exists")
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user;
    const settings = await Settings.findOne({ userId });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const userId = req.user;
    const { theme, freeTimeMethod, freeTimeProportions, showPopUps } = req.body;
    const updatedSettings = await Settings.findOneAndUpdate(
      { userId },
      { theme, freeTimeMethod, freeTimeProportions, showPopUps },
      { new: true }
    );
    res.json(updatedSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
