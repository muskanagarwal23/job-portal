import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import employee from '../assets/employee.png';
import employer from '../assets/employer.png';
import { useNavigate } from 'react-router-dom';
import home_img from '../assets/home_img.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEmployerClick = () => {
    navigate('/login');
  };

  const handleEmployeeClick = () => {
    navigate('/employee-login');
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
      <Container className="flex-grow-1 py-5 position-relative z-1">
        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            {loading ? (
              <>
                <Skeleton height={50} width="80%" />
                <Skeleton height={25} width="60%" className="mt-3" />
                <Skeleton height={25} width="50%" className="mt-2" />
                <Skeleton height={40} width={150} className="mt-4" />
              </>
            ) : (
              <>
                <h1
                  className="fw-bold display-5"
                  style={{
                    background: "linear-gradient(to right, #007bff, #6610f2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Where Talent Meets Opportunity
                </h1>
                <p className="lead mt-3">
                  Seamless job search. Smarter hiring. Stronger careers.
                </p>
                <p className="text-muted">
                  Helping students and professionals find the right fit, faster.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-3 px-5 py-2 rounded-pill shadow-sm"
                  onClick={handleEmployeeClick}
                >
                  Get Started
                </Button>
              </>
            )}
          </Col>

          <Col md={6} className="text-center position-relative d-flex justify-content-center">
            {loading ? (
              <Skeleton height={280} width={200} />
            ) : (
              <div
                className="image-gradient-border-wrapper"
                style={{ width: '200px', height: '290px', position: 'relative', zIndex: 1 }}
              >
                <div className="image-gradient-border-inner">
                  <img src={home_img} alt="Landing" className="img-fluid shadow " />
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center gx-5">
          {[1, 2].map((item, index) => (
            <Col md={4} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
              {loading ? (
                <Card className="mt-5 p-4 shadow border-0" style={{ minHeight: '320px' }}>
                  <Skeleton height={120} width="60%" className="mx-auto mb-3" />
                  <Skeleton height={25} width="70%" className="mx-auto mb-2" />
                  <Skeleton height={20} width="60%" className="mx-auto mb-3" />
                  <Skeleton height={35} width="50%" className="mx-auto" />
                </Card>
              ) : (
                <Card className="mt-5 text-center shadow border-0 hover-shadow" style={{ minHeight: '320px' }}>
                  <Card.Body className="p-4">
                    <Card.Img
                      variant="top"
                      src={index === 0 ? employer : employee}
                      className="mb-3 w-50 mx-auto d-block"
                    />
                    <Card.Title className="h5 fw-semibold">
                      {index === 0 ? 'Employer' : 'Employee'}
                    </Card.Title>
                    <Card.Text className="text-muted fst-italic mb-3">
                      {index === 0 ? 'I want to hire' : 'Find Your Dream Job'}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="w-75 rounded-pill"
                      onClick={index === 0 ? handleEmployerClick : handleEmployeeClick}
                    >
                      {index === 0 ? 'Post Job' : 'Search Jobs'}
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </Container>

      
      <svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 0,
          opacity: 0.1,
        }}
      >
        <path
          fill="#007bff"
          fillOpacity="1"
          d="M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,202.7C672,213,768,203,864,170.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LandingPage;
