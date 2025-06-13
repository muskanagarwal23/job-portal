import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requirements = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevData = location.state || {};

  
  const [experience, setExperience] = useState('');
  const [Reqskills, setReqSkills] = useState('');
  const [language, setLanguage] = useState('');
  const [eligiblity, setEligiblity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

     if (!language || !experience) {
          toast.error("Please fill in all required fields!", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }

    const requireData = {
      
      experience,
      Reqskills,
      language,
      eligiblity,
    };

    const combineData = { ...prevData, ...requireData };
    console.log("submitted 2nd data:", requireData);
    navigate('/company-data', { state: combineData });
  };

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 position-relative overflow-hidden py-5"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">Candidate Requirements</h2>
                <p className="text-center text-muted mb-4">Who would be the ideal fit?</p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="e.g. 2+ years in frontend development"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Required Skills</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="e.g. React, Node.js, MongoDB, REST APIs"
                      value={Reqskills}
                      onChange={(e) => setReqSkills(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Languages</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. English, Hindi, Tamil"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Eligibility Criteria</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="e.g. Must be an Indian citizen, willing to relocate"
                      value={eligiblity}
                      onChange={(e) => setEligiblity(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit" className="rounded-pill">
                      Next Step
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </div>
  );
};

export default Requirements;
