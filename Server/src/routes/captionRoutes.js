const express = require("express");
const router = express.Router();
const { createCaptions } = require("../controllers/captionController");
const authMiddleware = require("../middleware/authMiddleware"); 
router.post("/",authMiddleware,createCaptions);


module.exports = router;