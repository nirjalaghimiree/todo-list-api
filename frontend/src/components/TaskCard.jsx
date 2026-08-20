import { useState } from "react";

const TaskCard = ({
    task,
    onDelete,
    onToggle,
    onUpdate
}) => {
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] =
        useState(task.description || "");

    const [dueDate, setDueDate] = useState(
        task.dueDate
            ? task.dueDate.split("T")[0]
            : ""
    );

    const handleUpdate = () => {
        if (!title.trim()) {
            return;
        }

        onUpdate(task._id, {
            title,
            description,
            dueDate: dueDate || null
        });

        setEditing(false);
    };

    return (
        <div
            className={`task-card ${
                task.isCompleted ? "completed" : ""
            }`}
        >
            {editing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />

                    <button onClick={handleUpdate}>
                        Save
                    </button>

                    <button
                        onClick={() =>
                            setEditing(false)
                        }
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    {task.dueDate && (
                        <p>
                            Due:{" "}
                            {new Date(
                                task.dueDate
                            ).toLocaleDateString()}
                        </p>
                    )}

                    <p>
                        Status:{" "}
                        {task.isCompleted
                            ? "Completed"
                            : "Pending"}
                    </p>

                    <button
                        onClick={() =>
                            onToggle(task)
                        }
                    >
                        {task.isCompleted
                            ? "Mark Pending"
                            : "Mark Complete"}
                    </button>

                    <button
                        onClick={() =>
                            setEditing(true)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            onDelete(task._id)
                        }
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};

export default TaskCard;