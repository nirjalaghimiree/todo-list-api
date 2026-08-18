const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err.message);

    // Mongoose invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(
            (item) => item.message
        );

        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    // Default server error
    res.status(500).json({
        message: "Internal Server Error"
    });
};

module.exports = errorHandler;