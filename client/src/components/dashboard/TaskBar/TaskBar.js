/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './TaskBar.css';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import TaskInput from './TaskInput/TaskInput';
import TaskDisplayer from './TaskDisplayer/TaskDisplayer';
import auth from '../../../Auth';

const TaskBar = props => {
  const { projects } = props;

  const [Projects, setProjects] = useState(projects);

  const DeleteTaskHandler = (id, token) => {
    console.log('id: ', id, 'token: ', token);
    Axios.delete(`/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => {
        console.log('Task is deleted!', result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AddTaskHandler = (data, token) => {
    Axios.post('/tasks', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log('Added Task ', res.data);

        Axios.get('/projects', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(result => {
            setProjects([...result.data]);
            console.log('Projects received ', result.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        props.history.push('/signin');
      });
  };

  console.log('All tasks: ', Projects);

  return (
    <div className="taskbar-comp">
      <div className="taskInput">
        <TaskInput AddTask={AddTaskHandler} />
      </div>
      <div className="recommend" id="style-7">
        {Projects.map(project => (
          <TaskDisplayer
            key={project._id}
            tasks={project.tasks}
            project={project.project}
            remove={DeleteTaskHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default withRouter(TaskBar);
