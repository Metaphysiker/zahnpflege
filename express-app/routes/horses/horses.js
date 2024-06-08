const express = require("express");
const HorseModel = require("../../models/horse");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let horseModels = await HorseModel.find();
        res.json(horseModels);
    } catch (e) {
        console.log(e.message);
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        let horseModel = await HorseModel.create({
            name: req.body.name,
            lastTimeBeschlagen: req.body.lastTimeBeschlagen,
            nextTimeBeschlagen: req.body.nextTimeBeschlagen,
            numberOfWeeksUntilNextBeschlagen: req.body.numberOfWeeksUntilNextBeschlagen
        });
        res.status(201).json({ message: "HorseModel created successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        let horseModel = await HorseModel.findById(req.params.id);
        horseModel.name = req.body.name;
        horseModel.lastTimeBeschlagen = req.body.lastTimeBeschlagen;
        horseModel.nextTimeBeschlagen = req.body.nextTimeBeschlagen;
        horseModel.numberOfWeeksUntilNextBeschlagen = req.body.numberOfWeeksUntilNextBeschlagen;
        await horseModel.save();
        res.json({ message: "HorseModel updated successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        await HorseModel.findByIdAndDelete(req.params.id);
        res.json({ message: "HorseModel deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
