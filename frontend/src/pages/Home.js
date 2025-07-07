import React, { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskForm onTaskCreated={fetchTasks} />
      <hr />
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};

export default Home;