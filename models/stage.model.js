const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  "isPublished": { type: Boolean, required: true },
  "onlineData": {
    "courseCreator": { type: String},
    "courseID": { type: Number },
    "platform": { type: String },
    "playAttempts": { type: Number },
    "playCompletions": { type: Number },
    "likes": { type: Number }
  },
  "courseData": {}
}, {
  timestamps: true,
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;