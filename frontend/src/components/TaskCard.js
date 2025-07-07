import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><b>Priority:</b> {task.priority}</p>
      <p><b>Deadline:</b> {task.deadline}</p>
      <p>Status: {task.is_completed ? "✅ Done" : "❌ Pending"}</p>
    </div>
  );
};

export default TaskCard;