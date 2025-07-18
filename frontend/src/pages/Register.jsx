import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { setToken } from "../utils/auth";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/admin/register", form);
      setToken(res.data.token);
      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 space-y-6 border border-cyan-700"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-400">
          Admin Register
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-400 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
