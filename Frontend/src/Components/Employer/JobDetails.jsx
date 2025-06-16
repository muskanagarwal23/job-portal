import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [benefits, setBenefits] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    
    event.preventDefault();
    
    if (!title || !description || !salary || !jobType || !location || !skills || !education) {
      toast.dismiss();
      ("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    const jobData = {
      category,
      title,
      description,
      salary,
      jobType,
      location,
      benefits,
      skills: skills.split(",").map((s) => s.trim()),
      education: education.split(",").map((e) => e.trim()),
    };
    console.log("submitted data:", jobData);
    navigate("/requirements", { state: jobData });
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
                  Job Details
                </h2>
                <p className="text-center text-muted mb-4">
                  Fill in the following fields to post a job
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label className="fw-semibold">
                      Job Category
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Software, Marketing"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="fw-semibold">Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Frontend Developer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Brief job description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSalary">
                    <Form.Label className="fw-semibold">Salary</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. ₹50,000/month"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formJobType">
                    <Form.Label className="fw-semibold">Job Type</Form.Label>
                    <Form.Select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      
                    >
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label className="fw-semibold">Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Mumbai, Remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBenefits">
                    <Form.Label className="fw-semibold">
                      Perks & Benefits
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Health insurance, Flexible hours"
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSkills">
                    <Form.Label className="fw-semibold">
                      Skills 
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. JavaScript, React, Node.js"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEducation">
                    <Form.Label className="fw-semibold">
                      Education 
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. B.Tech, M.Sc Computer Science"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      
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

export default JobDetails;
