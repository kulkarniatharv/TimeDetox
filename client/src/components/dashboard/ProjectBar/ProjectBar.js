/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './ProjectBar.css';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProjectsList from './ProjectsList';
import auth from '../../../Auth';

const ProjectBar = props => {
  const { projects } = props;

  const [Projects, setProjects] = useState([]);

  const validationSchema = Yup.object({
    project: Yup.string().required('Required'),
  });

  return (
    <div className="projectbarLayout">
      {Projects.length !== 0 ? (
        <ProjectsList projects={Projects} />
      ) : (
        <ProjectsList projects={projects} />
      )}

      <Formik
        initialValues={{ project: '' }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          const token = auth.getJWT();

          Axios.post('/projects', data, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => {
              console.log('Success ', res);
              Axios.get('/projects', {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(result => {
                  setProjects([...result.data]);
                  console.log('Projects received in project bar ', result.data);
                })
                .catch(err => {
                  console.log(err);
                });
              setSubmitting(false);
            })
            .catch(err => {
              console.log(err);
              props.history.push('/signin');
              setSubmitting(false);
            });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group
                as={Col}
                style={{ paddingLeft: 0 }}
                controlId="taskInput"
                md="10"
              >
                <Field
                  name="project"
                  as={Form.Control}
                  placeholder="Add Project"
                />
                <ErrorMessage
                  component="div"
                  name="project"
                  className="input-feedback"
                />
              </Form.Group>

              <Form.Group
                as={Col}
                style={{ paddingRight: 0 }}
                controlId="submitBtn"
                md="2"
              >
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  +
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(ProjectBar);
