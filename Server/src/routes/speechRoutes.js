const express = require("express");
const speechToText = require("../services/speechService");
const router = express.Router();
const { transcribeSpeech } = require("../controllers/speechController");
const upload = require("../middleware/uploadMiddleware");


router.post(
    "/transcribe",
    upload.single("audio"),
    transcribeSpeech
);

module.exports = router;