/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './ProjectsList.css';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import auth from '../../../Auth';

const ProjectsList = props => {
  const { projects } = props;
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>All Projects</h2>
      <ul className="project-list">
        {projects.map(project => (
          <li key={project._id}>{project.project}</li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(ProjectsList);
