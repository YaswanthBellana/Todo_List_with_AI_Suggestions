import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/tasks/");
      setTasks(res.data);
    } catch (error) {
      console.error("❌ Error fetching tasks", error);
    }
  };

  const addTask = async () => {
    if (!description || !deadline) return alert("Please enter both task and deadline.");

    try {
      // AI Suggestion request
      const suggestRes = await axios.post("http://localhost:8000/api/suggest/", {
        description
      });

      const suggestedDeadline = suggestRes.data.deadline;
      const suggestedPriority = suggestRes.data.priority;

      const res = await axios.post("http://localhost:8000/api/tasks/", {
        title: description, // ✅ required for backend
        description,
        deadline: suggestedDeadline || deadline,
        is_finished: false
      });

      setDescription("");
      setDeadline("");
      fetchTasks();
    } catch (error) {
      console.error("❌ Error adding task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("❌ Error deleting task", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${task.id}/`, {
        ...task,
        is_finished: !task.is_finished,
      });
      fetchTasks();
    } catch (error) {
      console.error("❌ Error toggling task status", error);
    }
  };

  return (
    <div className="app">
      <h1>📝 Smart Todo List</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-section">
        <h2>📌 Pending</h2>
        {tasks.filter((task) => !task.is_finished).map((task) => (
          <div key={task.id} className="task-card">
            <p><strong>{task.description}</strong></p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => toggleTaskStatus(task)}>Mark Done</button>
            <button className="delete" onClick={() => deleteTask(task.id)}>🗑️</button>
          </div>
        ))}
      </div>

      <div className="task-section">
        <h2>✅ Finished</h2>
        {tasks.filter((task) => task.is_finished).map((task) => (
          <div key={task.id} className="task-card done">
            <p><strong>{task.description}</strong></p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => toggleTaskStatus(task)}>Mark Pending</button>
            <button className="delete" onClick={() => deleteTask(task.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
