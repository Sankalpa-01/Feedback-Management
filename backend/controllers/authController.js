const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// @desc    Register new admin
// @route   POST /api/admin/register
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({ name, email, password });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: "Invalid admin data" });
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
