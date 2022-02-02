// Requiring Express.
const express = require("express");
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from csvController.js.
const csv = require("../controllers/csvController.js");

router.post("/download", csv.downloadController);

// Exporting dataRoutes.js to server.js.
module.exports = router;
