import React from 'react';
import './footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import twitter from '../../../logos/Twitter_Logo_Blue.png';
import github from '../../../logos/GitHub_Logo.png';

const footer = props => (
  <Container fluid>
    <Row className="footer-row">
      <Col className="footer-credits">Created with ❤ by Atharv Kulkarni</Col>
      <Col>
        <Row className="justify-content-md-end">
          <a
            href="/"
            onClick={() =>
              window.open('https://twitter.com/realj4ke', '_blank')
            }
          >
            <img className="socialLogo" src={twitter} alt="twitter" />
          </a>

          <a
            href="/"
            onClick={() =>
              window.open('https://github.com/kulkarniatharv', '_blank')
            }
          >
            <img className="socialLogo" src={github} alt="github" />
          </a>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default footer;
