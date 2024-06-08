const CheckWXService = require('./CheckWXService');
const MetarReportModel = require('../models/metarReport');
class MetarReportsService {
  getLatestMetarReport() {
    return new Promise((resolve, reject) => {
      const checkWXService = new CheckWXService()
      checkWXService.getMetarReport("metar", "LDZD")
        .then((result) => {
          resolve(result.data[0])
        }).catch((error) => {
          reject(error)
        })
    })
  }

  getMetarReportsSinceYesterday() {
    return new Promise((resolve, reject) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      MetarReportModel.find({
        observed: { $gte: yesterday, $lte: today }, wind_degrees: { $ne: null }
      })
        .then((docs) => {
          resolve(docs)
        }).catch((error) => {
          reject(error)
        })
    })
  }

  getMetarReportsLastNight() {
    return new Promise((resolve, reject) => {
      const today = new Date()
      today.setHours(6)
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(23)
      yesterday.setMinutes(59)
      MetarReportModel.find({
        observed: { $gte: yesterday, $lte: today },
        wind_degrees: { $ne: null }
      })
        .then((docs) => {
          resolve(docs)
        }).catch((error) => {
          reject(error)
        })
    })
  }

  getAndSaveLatestMetarReport() {
    return new Promise((resolve, reject) => {
      const checkWXService = new CheckWXService()
      checkWXService.getMetarReport("metar", "LDZD")
        .then((result) => {
          console.log("checkWXService.getMetarReport result", result)
          let metarReport = result.data[0]
          if (!metarReport) {
            reject("No metar report found")
          }
          let newMetarReport = new MetarReportModel();

          if (metarReport?.wind?.degrees) {
            newMetarReport.wind_degrees = metarReport.wind.degrees
          }

          if (metarReport?.wind?.speed_kph) {
            newMetarReport.wind_speed_kph = metarReport.wind.speed_kph
          }

          if (metarReport?.observed) {
            newMetarReport.observed = new Date(metarReport.observed)
          }

          if (metarReport?.icao) {
            newMetarReport.icao = metarReport.icao
          }

          newMetarReport.save()
            .then((doc) => {
              resolve(doc)
            })
        }).catch((error) => {
          console.log(error)
        })
    })
  }
}

module.exports = MetarReportsService;
