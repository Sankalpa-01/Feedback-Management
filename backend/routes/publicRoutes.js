const express = require("express");
const router = express.Router();
const {
  getFormByUrl,
  submitResponse,
} = require("../controllers/responseController");

// @route   GET /public/:url
router.get("/:url", getFormByUrl);

// @route   POST /public/:url/submit
router.post("/:url/submit", submitResponse);

module.exports = router;
