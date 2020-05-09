const VideoData = require("../db/models/video-insertion");

const insertData = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Select a square",
    });
  }

  const video = new VideoData();
  video.incidentData.push(body.incidentData);

  if (!video) {
    return res.status(400).json({ success: false });
  }

  video
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: video._id,
        message: "Inserted",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error,
        message: "Not Inserted",
      });
    });
};

const getData = async (req, res) => {
  await VideoData.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!data.length) {
      return res.status(404).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: data });
  }).catch((err) => console.log(err));
};

module.exports = {
  insertData,
  getData
}