const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HorseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastTimeBeschlagen: {
    type: Date,
    required: false
  },
  nextTimeBeschlagen: {
    type: Date,
    required: false
  },
  numberOfWeeksUntilNextBeschlagen: {
    type: Number,
    required: false
  }

});

const HorseModel = mongoose.model('horse', HorseSchema);

module.exports = HorseModel;
