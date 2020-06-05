import React from 'react';
import './Home.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import TaskInput from './TaskInput/TaskInput';
import Footer from './footer/footer';

const home = props => {
  const brand = 'Time Detox';
  return (
    <div className="layout">
      <div className="header">
        <Navbar bg="dark" sticky="top">
          <Navbar.Brand style={{ color: 'white' }}>Time Detox</Navbar.Brand>
        </Navbar>
      </div>

      <div className="project-bar">Project Bar</div>

      <div className="taskbar">
        <div className="taskInput">
          <TaskInput />
        </div>
        <div className="recommend">AUTOMATIC RECOMMENDATION</div>
        <div className="recent">RECENTS</div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default home;
