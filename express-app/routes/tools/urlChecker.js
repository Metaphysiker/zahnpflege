var express = require('express');
var router = express.Router();

router.post('/check-status-of-url', async function (req, res) {
    const url = req.body.url;
    const response = await fetch(url)
        .catch((error) => { console.log(error); })
    if (response) {
        const responseStatus = response.status;
        res.json({ 'responseStatus': responseStatus });
    } else {
        res.json({ 'responseStatus': '404' });
    }

});

module.exports = router;
