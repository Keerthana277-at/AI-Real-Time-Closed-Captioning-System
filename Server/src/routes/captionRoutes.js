const express = require("express");
const router = express.Router();
const { createCaptions,getCaptions,deleteCaptions,updateCaptions } = require("../controllers/captionController");
const authMiddleware = require("../middleware/authMiddleware"); 
router.post("/",authMiddleware,createCaptions);
router.delete("/:id",authMiddleware,deleteCaptions);
router.put("/:id",authMiddleware,updateCaptions);

router.get("/",authMiddleware,getCaptions);


module.exports = router;