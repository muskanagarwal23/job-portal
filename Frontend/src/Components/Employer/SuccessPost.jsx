import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFill } from 'react-bootstrap-icons';

const SuccessPost = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      className="bg-light d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center shadow-lg border-0 rounded-4 p-4">
              <Card.Body>
                <CheckCircleFill size={64} className="text-success mb-4" />
                <h3 className="fw-bold text-success mb-3">Form Submitted Successfully!</h3>
                <p className="text-muted mb-4 fs-5">
                  Thank you! The job post has been submitted and saved successfully.
                </p>
                <Button
                  variant="primary"
                  className="px-4 py-2 rounded-pill"
                  size="lg"
                  onClick={handleClick}
                >
                  Go Back to Home
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SuccessPost;
