const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createForm,
  getFormsByAdmin,
  getFormResponses,
  exportResponsesAsCSV,
} = require("../controllers/formController");

// @route   POST /api/forms
router.post("/", protect, createForm);

// @route   GET /api/forms
router.get("/", protect, getFormsByAdmin);

// @route   GET /api/forms/:formId/responses
router.get("/:formId/responses", protect, getFormResponses);

router.get("/:formId/export", protect, exportResponsesAsCSV);

module.exports = router;
