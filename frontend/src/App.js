import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8000/api/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async () => {
  if (!description) return alert("Enter a task");

  try {
    // Get AI suggestion
    const suggestionRes = await axios.post("http://localhost:8000/api/suggest/", { description });
    const { suggested_priority, suggested_deadline } = suggestionRes.data;

    const taskData = {
      title: description,
      deadline: suggested_deadline,
      is_finished: false
    };

    const res = await axios.post("http://localhost:8000/api/tasks/", taskData);
    console.log("✅ Task added:", res.data);
    fetchTasks();
    setDescription("");
  } catch (err) {
    console.error("❌ Error adding task", err);
  }
};



  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await axios.put(`${API_URL}${task.id}/`, {
        ...task,
        is_finished: !task.is_finished,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
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

      <div className="task-lists">
        <div>
          <h2>📌 Pending</h2>
          {tasks.filter(t => !t.is_finished).map(task => (
            <TaskCard key={task.id} task={task} onToggle={toggleStatus} onDelete={deleteTask} />
          ))}
        </div>
        <div>
          <h2>✅ Finished</h2>
          {tasks.filter(t => t.is_finished).map(task => (
            <TaskCard key={task.id} task={task} onToggle={toggleStatus} onDelete={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.is_finished ? "finished" : ""}`}>
      <div className="task-info">
        <p>{task.description}</p>
        <span>Deadline: {task.deadline}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task)}>
          {task.is_finished ? "Mark Pending" : "Mark Done"}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete">🗑️</button>
      </div>
    </div>
  );
}

export default App;
