import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import EditTaskPopup from './EditTaskPopup';

import { fetAllTask, deleteTask } from '../utils/api'
import Navbar from './Navbar';
import AddTaskPopup from './AddTaskPopup';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [addTask, setAddTask] = useState(null);

  const fetchToken = () => {
    let data = localStorage.getItem('token');
    console.log(data)
    setToken(data)
  }

  const fetchTasks = async () => {
    try {
      console.log("token", token)
      const response = await fetAllTask(token);
      console.log("task--------------", response)
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchToken();
    if (token !== "") {
      fetchTasks();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("are you sure wants to delete this task")) {
        let data = await deleteTask({ _id: id, token });
        console.log(data);
        window.location.reload();
      }
    } catch (error) {
      console.log("error occured")
    }
  }
  const handleEditClick = (task) => {
    setEditTask(task);
  };

  const handleClose = () => {
    setEditTask(null);
    setAddTask(null)
  };

  const paperStyle = { padding: 20, margin: '20px auto', width: '80%' };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Navbar setAddTask={setAddTask} addTask={addTask} />
      </Grid>
      {tasks.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            No tasks to display
          </Typography>
        </Grid>
      ) : (
        tasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task._id}>
            <Paper style={paperStyle}>
              <Typography variant="h5">
                {task.title}
              </Typography>
              <Typography variant="body1">
                {task.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {task.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: 10, }} onClick={() => handleEditClick(task)}>
                Edit
              </Button>
              <Button variant="contained" color="primary" style={{ marginTop: 10, backgroundColor: "red", marginLeft: 10,  }} onClick={() => handleDelete(task._id)}>
                Delete
              </Button>
            </Paper>
          </Grid>
        ))
      )}
      {editTask && (
        <EditTaskPopup
          open={Boolean(editTask)}
          handleClose={handleClose}
          task={editTask}
          fetchTasks={fetchTasks}
          token={token}
        />
      )}
      {addTask &&
        <AddTaskPopup
          open={Boolean(addTask)}
          handleClose={handleClose}
          token={token}
          setAddTask={setAddTask}
          fetchTasks={fetchTasks}
        />


      }
    </Grid>
  );
};

export default Home;
