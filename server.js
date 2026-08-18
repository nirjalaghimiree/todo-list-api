require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for JSON request bodies
app.use(express.json());

// API Routes
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "To-Do List API is running"
    });
});

// Global Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});