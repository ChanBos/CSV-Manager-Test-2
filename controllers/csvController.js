// Requiring Multer.
const multer = require("multer");

/**
 * Created a function that will save the CSV file to the server.
 * Initialized the multer storage engine. Set for the file to be saved to the output folder.
 * Checking whether there are any errors. If not, the file will be saved to the output folder.
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "output/");
  },
  filename: function (req, file, cb) {
    filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
}).any("file");

exports.downloadController = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
  console.log(req.file);
};
