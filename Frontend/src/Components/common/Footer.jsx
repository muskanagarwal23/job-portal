import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" py-4 mt-auto" style={{ borderTop: '1px solid #dee2e6', backgroundColor:'#f5f5f5' }}>
      <Container>
        <Row>
          {/* Brand / Logo */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold text-dark">Career Connect</h5>
            <p className="text-muted">Connecting talent with opportunity.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h6 className="text-uppercase text-dark">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Home</Link></li>
              <li><Link to="/jobs" className="text-dark text-decoration-none">Browse Jobs</Link></li>
              <li><Link to="/employee-profile" className="text-dark text-decoration-none">My Profile</Link></li>
              <li><Link to="/employee-saved" className="text-dark text-decoration-none">Saved Jobs</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="text-uppercase text-dark">Contact</h6>
            <p className="mb-1 text-muted">Email: support@careerconnect.com</p>
            <p className="mb-0 text-muted">Phone: +91-9876543210</p>
          </Col>
        </Row>

        <Row className="pt-3 border-top">
          <Col className="text-center">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} Career Connect. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
