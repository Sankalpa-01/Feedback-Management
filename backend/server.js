const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/authRoutes"));
app.use("/api/forms", require("./routes/formRoutes"));
app.use("/public", require("./routes/publicRoutes"));

app.get("/", (req, res) => res.send("API is Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
