import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Notification from "../components/Notification";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // GET TASKS
    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response =
                await api.get("/tasks");

            setTasks(response.data);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to load tasks"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // CREATE TASK
    const addTask = async (taskData) => {
        try {
            const response =
                await api.post("/tasks", taskData);

            setTasks((previousTasks) => [
                response.data,
                ...previousTasks
            ]);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create task"
            );
        }
    };

    // UPDATE TASK
    const updateTask = async (id, taskData) => {
        try {
            const response =
                await api.patch(
                    `/tasks/${id}`,
                    taskData
                );

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task._id === id
                        ? response.data
                        : task
                )
            );

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };

    // COMPLETE TASK
    const toggleTask = async (task) => {
        try {
            const response =
                await api.patch(
                    `/tasks/${task._id}`,
                    {
                        isCompleted:
                            !task.isCompleted
                    }
                );

            setTasks((previousTasks) =>
                previousTasks.map((item) =>
                    item._id === task._id
                        ? response.data
                        : item
                )
            );

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to update task status"
            );
        }
    };

    // DELETE TASK
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);

            // Update UI only after successful response
            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) =>
                        task._id !== id
                )
            );

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>My To-Do Dashboard</h1>

                    <p>
                        Welcome,{" "}
                        {user?.name || "User"}
                    </p>
                </div>

                <button onClick={logout}>
                    Logout
                </button>
            </header>

            <Notification message={message} />

            <TaskForm
                onAddTask={addTask}
            />

            {loading ? (
                <LoadingSkeleton />
            ) : tasks.length === 0 ? (
                <p className="empty-message">
                    No tasks available. Create your first task!
                </p>
            ) : (
                <div className="task-grid">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={deleteTask}
                            onToggle={toggleTask}
                            onUpdate={updateTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;