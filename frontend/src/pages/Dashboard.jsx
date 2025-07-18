import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import ResponseTable from "../components/ResponseTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await API.get("/api/forms");
        setForms(res.data);
      } catch (err) {
        toast.error("Failed to load forms");
      }
    };

    fetchForms();
  }, []);

  const fetchResponses = async (formId) => {
    try {
      const res = await API.get(`/api/forms/${formId}/responses`);
      setResponses(res.data);
    } catch {
      toast.error("Failed to load responses");
    }
  };

  const handleSelect = (form) => {
    setSelectedForm(form);
    fetchResponses(form._id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Your Forms</h2>

        <div className="flex gap-6 flex-wrap">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-gray-800 border border-cyan-700 p-5 rounded-lg w-72 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-1 text-cyan-300">
                {form.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3 truncate">
                Link:{" "}
                <span className="text-cyan-500">/form/{form.publicUrl}</span>
              </p>
              <button
                onClick={() => handleSelect(form)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded transition duration-200"
              >
                View Responses
              </button>
            </div>
          ))}
        </div>

        {selectedForm && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
              Responses for: {selectedForm.title}
            </h3>
            <ResponseTable form={selectedForm} responses={responses} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
