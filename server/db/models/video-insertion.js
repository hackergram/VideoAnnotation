const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  incidentData: {
    type: [],
    required: true,
  },
})

module.exports = mongoose.model("Video", VideoSchema);