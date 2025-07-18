const Form = require("../models/Form");
const Response = require("../models/Response");
const crypto = require("crypto");
const { Parser } = require("json2csv");

// @desc    Create new feedback form
// @route   POST /api/forms
const createForm = async (req, res) => {
  const { title, questions } = req.body;

  const publicUrl = crypto.randomBytes(6).toString("hex");

  const form = await Form.create({
    title,
    questions,
    createdBy: req.user._id,
    publicUrl,
  });

  res.status(201).json(form);
};

// @desc    Get all forms created by admin
// @route   GET /api/forms
const getFormsByAdmin = async (req, res) => {
  const forms = await Form.find({ createdBy: req.user._id });
  res.json(forms);
};

// @desc    Get all responses to a form
// @route   GET /api/forms/:formId/responses
const getFormResponses = async (req, res) => {
  const { formId } = req.params;

  const responses = await Response.find({ formId });
  res.json(responses);
};

// @desc    Export form responses as CSV
// @route   GET /api/forms/:formId/export
// @access  Private (Admin)
const exportResponsesAsCSV = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const responses = await Response.find({ formId });

    // Prepare flattened CSV data
    const csvData = responses.map((res, idx) => {
      const row = { Index: idx + 1 };
      res.answers.forEach((ans, i) => {
        const questionText = form.questions[i]?.questionText || `Q${i + 1}`;
        row[questionText] = ans.answer;
      });
      row["Submitted At"] = res.submittedAt.toISOString();
      return row;
    });

    // Convert to CSV
    const json2csv = new Parser();
    const csv = json2csv.parse(csvData);

    // Send file response
    res.header("Content-Type", "text/csv");
    res.attachment(`form_${formId}_responses.csv`);
    return res.send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "Error exporting CSV" });
  }
};

module.exports = {
  createForm,
  getFormsByAdmin,
  getFormResponses,
  exportResponsesAsCSV,
};
