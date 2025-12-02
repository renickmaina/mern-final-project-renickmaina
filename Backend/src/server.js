const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const router = express.Router();//profile

// Routes
const authRoutes = require("./Routes/auth");
const jobRoutes = require("./Routes/jobs");
const applicationRoutes = require("./Routes/applications");

const profileRoutes = require("./Routes/profile");//profile

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
}));
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => res.send("JobHub API is up and running..."));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/profile", profileRoutes);


const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected!");
    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
