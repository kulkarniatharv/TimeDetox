/* eslint-disable react/prop-types */
import React from 'react';
import './TaskInput.css';
import { Formik, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import auth from '../../../../Auth';

const TaskInput = props => {
  const validationSchema = Yup.object({
    task: Yup.string().required('Required'),
    project: Yup.string().required('Required'),
    due: Yup.date()
      .required('Required')
      .min(new Date().toJSON().slice(0, 10), 'Invalid Checkin Date'),
  });

  return (
    <div>
      <Formik
        initialValues={{ task: '', project: '', due: '' }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          const tempData = {
            ...data,
            done: false,
          };

          const token = auth.getJWT();

          props.AddTask(tempData, token);
          setSubmitting(false);
          console.log(tempData);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div className="d-flex flex-row justify-content-center align-items-center task-Input">
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="taskInput" md="4">
                  <Field name="task" as={Form.Control} placeholder="Task" />
                  <ErrorMessage
                    component="div"
                    name="task"
                    className="input-feedback"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="projectInput" md="4">
                  <Field
                    name="project"
                    as={Form.Control}
                    placeholder="Project"
                  />
                  <ErrorMessage
                    component="div"
                    name="project"
                    className="input-feedback"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="dueDate" md="3">
                  <Field name="due" type="date" as={Form.Control} />
                  <ErrorMessage
                    component="div"
                    name="due"
                    className="input-feedback"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="submitBtn" md="1">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    +
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(TaskInput);
