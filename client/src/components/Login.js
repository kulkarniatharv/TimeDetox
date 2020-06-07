/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import auth from '../Auth';

const login = props => {
  const { mode } = props;

  const [authErr, setAuthErr] = useState(0);

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  let brand = null;
  if (mode) {
    brand = 'Sign in';
  } else if (!mode) {
    brand = 'Sign up';
  }

  return (
    <div>
      <Navbar bg="dark" sticky="top">
        <Navbar.Brand style={{ color: 'white' }}>{brand}</Navbar.Brand>
      </Navbar>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);

            if (mode) {
              auth.login(data).then(JWToken => {
                if (JWToken) {
                  props.history.push({
                    pathname: '/',

                    state: { signup: false, projectExist: true },
                  });
                } else if (!JWToken) {
                  setAuthErr(1);
                }
              });
            } else if (!mode) {
              auth.signup(data).then(JWToken => {
                if (JWToken) {
                  props.history.push({
                    pathname: '/',

                    state: { signup: true, projectExist: false },
                  });
                } else if (!JWToken) {
                  setAuthErr(2);
                }
              });
            }

            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <div className="form-container">
              <Container>
                {authErr === 1 ? (
                  <h3 style={{ color: 'red' }}>
                    Authentication Failed. Try again
                  </h3>
                ) : null}

                {authErr === 2 ? (
                  <h3 style={{ color: 'red' }}>
                    Signup Failed. User already exists.
                  </h3>
                ) : null}

                <Form noValidate onSubmit={handleSubmit}>
                  <Container>
                    <Form.Row>
                      <Form.Group as={Col} controlId="user_name" md="auto">
                        <Form.Label style={{ color: 'white' }}>
                          Username
                        </Form.Label>
                        <Field name="username" as={Form.Control} />
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="input-feedback"
                          style={{ color: 'white' }}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="pwd" md="auto">
                        <Form.Label style={{ color: 'white' }}>
                          Password
                        </Form.Label>
                        <Field
                          name="password"
                          as={Form.Control}
                          type="password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="input-feedback"
                          style={{ color: 'white' }}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="submitBtn" md="auto">
                        <Button
                          variant="outline-success"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Form.Row>
                  </Container>
                </Form>
              </Container>
            </div>
          )}
        </Formik>
        {mode === 1 ? (
          <div style={{ color: 'white' }}>
            Don't have an account?{' '}
            <Link to="/signup">Click here to create one.</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

login.propTypes = {
  mode: PropTypes.number,
};

export default withRouter(login);
