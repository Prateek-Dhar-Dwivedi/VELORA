require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const cron = require("node-cron");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const saveRoutes = require("./routes/saveRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");

cron.schedule("0 */6 * * *", async () => {
  console.log("Refreshing jobs...");
  // call sync function here
});

const app = express();

app.use(cors({
  origin:"https://your-vercel-url.vercel.app",
  credentials:true
}));
//Change the origin to your frontend URL in production
app.use(express.json());
app.use("/api/reports", reportRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/save", saveRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

connectDB();



app.get("/", (req, res) => {
  res.json({ message: "JobShield API Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});