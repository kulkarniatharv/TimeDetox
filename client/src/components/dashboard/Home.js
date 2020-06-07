/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Footer from './footer/footer';
import ProjectBar from './ProjectBar/ProjectBar';
import TaskBar from './TaskBar/TaskBar';
import auth from '../../Auth';

const home = props => {
  const { location } = props;
  const [Projects, setProjects] = useState([]);

  // location.state;

  // let sorted = false;
  // function dynamicSort(property) {
  //   let sortOrder = 1;

  //   if (property[0] === '-') {
  //     sortOrder = -1;
  //     property = property.substr(1);
  //   }

  //   return function(a, b) {
  //     if (sortOrder === -1) {
  //       return b[property].localeCompare(a[property]);
  //     }
  //     return a[property].localeCompare(b[property]);
  //   };
  // }

  // const sortProjects = array => {
  //   array.map(project => project.tasks.sort(dynamicSort('due')));
  //   sorted = true;
  // };

  console.log(location, location.state === null);

  // sending the AJAX request after each render
  useEffect(() => {
    auth.authenticated = true;
    const token = auth.getJWT();

    Axios.get('/projects', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log('Projects received ', res.data);
        setProjects(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {Projects.length !== 0 ||
      location.state.signup ||
      location.state.projectExist ? (
        <div className="layout">
          <div className="header">
            <Navbar bg="dark" sticky="top">
              <Navbar.Brand style={{ color: 'white' }}>Time Detox</Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav.Item>
                  <Nav.Link style={{ color: 'white' }} href="/signin">
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>
          </div>

          <div className="project-bar">
            <ProjectBar projects={Projects} />
          </div>

          <div className="taskbar">
            <TaskBar projects={Projects} />
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default withRouter(home);
