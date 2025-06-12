import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import employee from '../assets/employee.png';
import employer from '../assets/employer.png';
import { useNavigate } from 'react-router-dom';
import home_img from '../assets/home_img.png'; // Your image import

// --- IMPORTANT: Import the custom CSS file ---


const LandingPage = () => {
  const navigate = useNavigate();

  const handleEmployerClick = () => {
    navigate('/login');
  };

  const handleEmployeeClick = () => {
    navigate('/register');
  };

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 position-relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
      }}
    >
      <Container className="flex-grow-1 py-5">
        {/* Top Section: Heading and Illustration */}
        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <h1 className="fw-bold display-5 text-primary">Where Talent Meets Opportunity</h1>
            <p className="lead mt-3">
              Seamless job search. Smarter hiring. Stronger careers.
            </p>
            <p className="text-muted">
              Helping students and professionals find the right fit, faster.
            </p>
            <Button
              variant="outline-primary"
              size="lg"
              className="mt-3"
              onClick={handleEmployeeClick}
            >
              Get Started
            </Button>
          </Col>
          <Col md={6} className="text-center position-relative d-flex justify-content-center">
            {/* Blurred circle behind (keep this if you like the effect) */}
            <div
              className="rounded-circle bg-primary shadow position-absolute"
              style={{
                width: '180px',
                height: '180px',
                filter: 'blur(30px)',
                opacity: 0.25,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
              }}
            ></div>

            {/* --- Custom CSS Gradient Border around home_img --- */}
            <div
              className="image-gradient-border-wrapper"
              style={{
                // Note: If you want a perfect circle, width and height should be the same.
                // If you want an oval, keep them different as you had with height: '280px'.
                width: '200px',
                height: '280px', // Set height as desired for oval or '200px' for circle
                position: 'relative',
                zIndex: 1,
                // Adjust position if you want the "head popping out" effect from before
                // Example: transform: 'translateY(-40px)',
              }}
            >
              <div className="image-gradient-border-inner">
                <img
                  src={home_img}
                  alt="Landing Illustration"
                  className="img-fluid"
                />
              </div>
            </div>
            {/* --- END: Custom CSS Gradient Border --- */}

          </Col>
        </Row>

        {/* Cards Section: Employer / Employee */}
        {/*
          Changes for cards:
          - Added 'gx-5' to the Row to increase horizontal gutter (space) between columns.
          - Changed Col sizes from md={5} lg={4} to md={4} lg={3} to make cards smaller.
            - md={4} means 4 out of 12 columns (1/3 of the row width) on medium screens.
            - lg={3} means 3 out of 12 columns (1/4 of the row width) on large screens.
            This combination will make the cards smaller and automatically increase the spacing
            between them when combined with justify-content-center.
        */}
        <Row className="mt-5 justify-content-center gx-5"> {/* <--- Increased horizontal gutter */}
          <Col md={4} lg={3} className="mb-4"> {/* <--- Reduced Col size */}
            <Card className="mt-5 text-center shadow border-0" style={{ minHeight: '320px' }}>
              <Card.Body className="p-4">
                <Card.Img
                  variant="top"
                  src={employer}
                  className="mb-3 w-50 mx-auto d-block"
                />
                <Card.Title className="h5 fw-semibold">Employer</Card.Title>
                <Card.Text className="text-muted fst-italic mb-3">
                  I want to hire
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-75"
                  onClick={handleEmployerClick}
                >
                  Post Job
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} lg={3} className="mb-4"> {/* <--- Reduced Col size */}
            <Card className="mt-5 text-center shadow border-0" style={{ minHeight: '320px' }}>
              <Card.Body className="p-4">
                <Card.Img
                  variant="top"
                  src={employee}
                  className="mb-3 w-50 mx-auto d-block"
                />
                <Card.Title className="h5 fw-semibold">Employee</Card.Title>
                <Card.Text className="text-muted fst-italic mb-3">
                  Find Your Dream Job
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-75"
                  onClick={handleEmployeeClick}
                >
                  Search Jobs
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;