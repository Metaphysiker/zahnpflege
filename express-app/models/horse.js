const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HorseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastTimeTreated: {
    type: Date,
    required: false
  },
  nextTreatment: {
    type: Date,
    required: false
  },
  numberOfWeeksUntilNextTreatment: {
    type: Number,
    required: false
  }

});

const HorseModel = mongoose.model('horse', HorseSchema);

module.exports = HorseModel;
