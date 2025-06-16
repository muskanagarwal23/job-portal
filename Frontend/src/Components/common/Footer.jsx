import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 mt-auto" style={{ borderTop: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
      <Container>
        <Row className="gy-4 text-center text-md-start">
          {/* Brand / Logo */}
          <Col md={4}>
            <h4 className="fw-bold text-primary mb-2">Career Connect</h4>
            <p className="text-muted mb-0">Connecting talent with opportunity.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h6 className="text-uppercase text-dark mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted hover-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/jobs" className="text-decoration-none text-muted hover-link">Browse Jobs</Link>
              </li>
              <li className="mb-2">
                <Link to="/employee-profile" className="text-decoration-none text-muted hover-link">My Profile</Link>
              </li>
              <li className="mb-2">
                <Link to="/employee-saved" className="text-decoration-none text-muted hover-link">Saved Jobs</Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="text-uppercase text-dark mb-3">Contact</h6>
            <p className="text-muted mb-1">📧 support@careerconnect.com</p>
            <p className="text-muted mb-0">📞 +91-9876543210</p>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row>
          <Col className="text-center">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} Career Connect. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>

      {/* Custom Footer Hover Styling */}
      <style>
        {`
          .hover-link:hover {
            color: #0d6efd;
            transition: color 0.2s ease-in-out;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
