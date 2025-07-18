const Form = require("../models/Form");
const Response = require("../models/Response");

// @desc    Get form by public URL
// @route   GET /public/:url
const getFormByUrl = async (req, res) => {
  const { url } = req.params;

  const form = await Form.findOne({ publicUrl: url });

  if (!form) return res.status(404).json({ message: "Form not found" });

  res.json({
    title: form.title,
    questions: form.questions,
  });
};

// @desc    Submit response to public form
// @route   POST /public/:url/submit
const submitResponse = async (req, res) => {
  const { url } = req.params;
  const { answers } = req.body;

  const form = await Form.findOne({ publicUrl: url });

  if (!form) return res.status(404).json({ message: "Form not found" });

  const response = await Response.create({
    formId: form._id,
    answers,
  });

  res.status(201).json({ message: "Response submitted successfully" });
};

module.exports = {
  getFormByUrl,
  submitResponse,
};
