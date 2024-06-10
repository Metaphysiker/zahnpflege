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
        console.log("POST")
        console.log(req.body)
        let horseModel = await HorseModel.create({
            name: req.body.name,
            lastTimeTreated: req.body.lastTimeTreated,
            nextTreatment: req.body.nextTreatment,
            numberOfWeeksUntilNextTreatment: req.body.numberOfWeeksUntilNextTreatment
        });
        res.status(201).json({ message: "HorseModel created successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        let horseModel = await HorseModel.findById(req.params.id);
        if (!horseModel) return res.status(404).json({ message: "HorseModel not found" });

        horseModel.name = req.body.name;
        horseModel.lastTimeTreated = req.body.lastTimeTreated;
        horseModel.nextTreatment = req.body.nextTreatment;
        horseModel.numberOfWeeksUntilNextTreatment = req.body.numberOfWeeksUntilNextTreatment;
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
