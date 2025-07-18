import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", questionType: "text", options: [] },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", questionType: "text", options: [] },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === "questionType" && value === "text")
      updated[index].options = [];
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!title || questions.length < 1)
      return toast.error("Title and at least one question required");

    try {
      await API.post("/api/forms", { title, questions });
      toast.success("Form created!");
      setTitle("");
      setQuestions([{ questionText: "", questionType: "text", options: [] }]);
    } catch {
      toast.error("Failed to create form");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Create New Feedback Form
          </h2>

          <input
            className="w-full bg-gray-800 text-white border border-cyan-600 rounded px-4 py-2 mb-6 placeholder-gray-400"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-gray-800 border border-cyan-700 p-4 rounded mb-6"
            >
              <input
                className="w-full bg-gray-700 text-white border border-cyan-600 rounded px-3 py-2 mb-3 placeholder-gray-400"
                placeholder={`Question ${i + 1}`}
                value={q.questionText}
                onChange={(e) =>
                  handleChange(i, "questionText", e.target.value)
                }
              />

              <select
                value={q.questionType}
                onChange={(e) =>
                  handleChange(i, "questionType", e.target.value)
                }
                className="w-full bg-gray-700 text-white border border-cyan-600 rounded px-3 py-2 mb-3"
              >
                <option value="text">Text</option>
                <option value="mcq">Multiple Choice</option>
              </select>

              {q.questionType === "mcq" &&
                q.options.map((opt, j) => (
                  <input
                    key={j}
                    className="w-full bg-gray-700 text-white border border-cyan-600 rounded px-3 py-2 mb-2 placeholder-gray-400"
                    placeholder={`Option ${j + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  />
                ))}

              {q.questionType === "mcq" && (
                <button
                  type="button"
                  onClick={() => addOption(i)}
                  className="text-cyan-400 text-sm hover:underline"
                >
                  + Add Option
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded"
            >
              + Add Question
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Create Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
