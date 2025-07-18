import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import FormQuestion from "../components/FormQuestion";

const PublicForm = () => {
  const { url } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/public/${url}`);
        setForm(res.data);
        setAnswers(new Array(res.data.questions.length).fill(""));
      } catch {
        toast.error("Form not found");
      }
    };
    fetchForm();
  }, [url]);

  const handleSubmit = async () => {
    if (answers.some((a) => !a)) {
      return toast.error("Please answer all questions");
    }

    const payload = {
      answers: form.questions.map((q, i) => ({
        questionId: q._id,
        answer: answers[i],
      })),
    };

    try {
      await API.post(`/public/${url}/submit`, payload);
      toast.success("Feedback submitted!");
      navigate("/submitted");
    } catch {
      toast.error("Submission failed");
    }
  };

  if (!form) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          {form.title}
        </h2>

        {form.questions.map((q, i) => (
          <div key={i} className="mb-6">
            <FormQuestion
              index={i}
              question={q}
              answer={answers}
              setAnswer={setAnswers}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg w-full mt-4 transition duration-200"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default PublicForm;
