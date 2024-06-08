var express = require("express");
var router = express.Router();
router.get("/health-check", async function (req, res) {
    res.json({ responseStatus: "200" });
});
module.exports = router;
