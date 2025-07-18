import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-cyan-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-2xl font-bold text-cyan-400 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Feedback Admin
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/create-form")}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition"
        >
          Create Form
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
