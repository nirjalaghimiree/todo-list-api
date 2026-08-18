const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res, next) => {
    try {
        const { title, description, isCompleted, dueDate } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            description,
            isCompleted,
            dueDate
        });

        res.status(201).json(task);

    } catch (error) {
        next(error);
    }
};


// GET ALL TASKS
const getTasks = async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.completed !== undefined) {
            if (
                req.query.completed !== "true" &&
                req.query.completed !== "false"
            ) {
                return res.status(400).json({
                    message: "Completed must be true or false"
                });
            }

            filter.isCompleted = req.query.completed === "true";
        }

        const tasks = await Task.find(filter);

        res.status(200).json(tasks);

    } catch (error) {
        next(error);
    }
};


// GET ONE TASK
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


// UPDATE TASK
const updateTask = async (req, res, next) => {
    try {
        if (req.body.title !== undefined && req.body.title.trim() === "") {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


// DELETE TASK
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};