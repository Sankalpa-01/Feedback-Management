const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["text", "mcq"],
    required: true,
  },
  options: {
    type: [String], // Only used if questionType === 'mcq'
    default: [],
  },
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    publicUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
