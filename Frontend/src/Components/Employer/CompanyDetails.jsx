import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state || {};

  const [companyName, setCompanyName] = useState("");
  const [subheading, setSubheading] = useState("");
  const [company_description, setCompany_Description] = useState("");
  const [Url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!companyName || !company_description) {
      toast.dismiss();
      toast.error("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const companyData = {
      companyName,
      subheading,
      company_description,
      Url,
    };

    const allData = { ...prevData, ...companyData };
    console.log("submitted 3rd data:", companyData);
    navigate("/review", { state: allData });
  };

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 position-relative overflow-hidden py-5"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Company Details
                </h2>
                <p className="text-center text-muted mb-4">
                  Tell us about your company
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Company Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Microsoft"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Subheading</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Empowering every person on the planet"
                      value={subheading}
                      onChange={(e) => setSubheading(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Company Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Brief about the company and its vision"
                      value={company_description}
                      onChange={(e) => setCompany_Description(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Website URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://yourcompany.com"
                      value={Url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="rounded-pill"
                    >
                      Next Step
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default CompanyDetails;
