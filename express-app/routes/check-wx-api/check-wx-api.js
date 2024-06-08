var express = require("express");
var router = express.Router();
const CheckWXService = require('../../services/CheckWXService');

router.post("/check-wx-api", async function (req, res) {
    const station = req.body.station;
    const functionality = req.body.functionality;
    const checkWXService = new CheckWXService();
    checkWXService.getMetarReport(functionality, station)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

module.exports = router;
