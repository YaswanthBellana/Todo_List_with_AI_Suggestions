import React, { useState } from "react";
import API from "../api/api";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [suggestions, setSuggestions] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSuggest = async () => {
    const res = await API.post("ai/suggest/", { description: formData.description });
    setSuggestions(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const finalData = {
      ...formData,
      priority: suggestions?.priority || "",
      deadline: suggestions?.deadline || "",
    };
    await API.post("tasks/", finalData);
    setFormData({ title: "", description: "" });
    setSuggestions(null);
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Task title" value={formData.title} onChange={handleChange} required />
      <br />
      <textarea name="description" placeholder="Task description" value={formData.description} onChange={handleChange} required />
      <br />
      <button type="button" onClick={handleSuggest}>Suggest Priority & Deadline</button>
      {suggestions?.priority || suggestions?.deadline ? (
        <p>
        <strong>Suggested →</strong><br />
        {suggestions.priority && <span><strong>Priority:</strong> {suggestions.priority}<br /></span>}
        {suggestions.deadline && <span><strong>Deadline:</strong> {suggestions.deadline}</span>}
        </p>
        ) : null}

      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;