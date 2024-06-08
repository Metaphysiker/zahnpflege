const express = require("express");
const MetarReportModel = require("../../models/metarReport");
const MetarReportsService = require("../../services/MetarReportsService");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let metarReportModels = await MetarReportModel.find();
        res.json(metarReportModels);
    } catch (e) {
        console.log(e.message);
    }
});

router.get("/get-latest", async (req, res) => {
    const metarReportsService = new MetarReportsService();
    metarReportsService.getLatestMetarReport()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ responseStatus: "500" });
        });
})

router.get("/get-metar-reports-since-yesterday", async (req, res) => {
    const metarReportsService = new MetarReportsService();
    metarReportsService.getMetarReportsSinceYesterday()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ responseStatus: "500" });
        });
})

router.get("/get-metar-reports-last-night", async (req, res) => {
    const metarReportsService = new MetarReportsService();
    metarReportsService.getMetarReportsLastNight()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ responseStatus: "500" });
        });
})


router.get("/get-and-save-latest-metar-report", async (req, res) => {
    console.log("get-and-save-latest-metar-report");
    const metarReportsService = new MetarReportsService();
    metarReportsService.getAndSaveLatestMetarReport()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
})


router.post("/", async (req, res) => {
    try {
        let metarReportModel = await MetarReportModel.create({
            wind_degrees: req.body.wind_degrees,
            wind_speed_kph: req.body.wind_speed_kph
        });
        res.status(201).json({ message: "MetarReport created successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
