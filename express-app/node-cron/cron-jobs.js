var cron = require('node-cron');
const MetarReportsService = require('../services/MetarReportsService');

var getAndSaveLatestMetarReport = cron.schedule('*/30 * * * *', () => {
    const metarReportsService = new MetarReportsService();
    metarReportsService.getAndSaveLatestMetarReport()
        .catch((error) => {
            console.log("cron getAndSaveLatestMetarReport")
            console.log(error);
        });
});

function startCronJobs() {
    getAndSaveLatestMetarReport.start();
}

module.exports = startCronJobs;
