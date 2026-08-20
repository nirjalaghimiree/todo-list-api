require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// Task Routes
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "To-Do List API is running"
    });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});