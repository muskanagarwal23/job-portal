import {React,useState,useEffect} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  

  // Dummy data (replace with real values or props)
  const employerName = "John Doe";
  const companyName = "Tech Innovators Inc.";
  const [stats, setStats] = useState({
  totalJobs: 0,
  totalApplications: 0,
  totalSelected: 0,
  totalViews: 0,
});

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust if using cookies
        },
      };
      const { data } = await axios.get("http://localhost:5000/api/employer/dashboard", config);
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <Container className="my-4">
      {/* Top Section */}
<Card
  className="mb-4 shadow-sm p-4 rounded border-0"
  style={{
    background: "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
    height: "180px",
  }}
>
  <div className="d-flex flex-column justify-content-center h-100">
    <h2 className="text-primary fw-bold mb-2">Welcome, {employerName}</h2>
    <h5 className="text-secondary">Company: <span className="fw-semibold">{companyName}</span></h5>
  </div>
</Card>

      {/* Middle Stat Cards */}
      <Row className="my-5">
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm  bg-white">
            <Card.Body>
              <Card.Title className="text-info">Jobs Posted</Card.Title>
              <h4>{stats.totalJobs}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm  bg-white">
            <Card.Body>
              <Card.Title className="text-success">Applications</Card.Title>
              <h4>{stats.totalApplications}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm bg-white">
            <Card.Body>
              <Card.Title className="text-warning">Selected</Card.Title>
              <h4>{stats.totalSelected}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm  bg-white">
            <Card.Body>
              <Card.Title className="text-danger">Profile Views</Card.Title>
              <h4>{stats.totalViews}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Big Cards */}
      {/* Bottom Big Cards - 3x Height */}
<Row>
  <Col md={4} className="mb-4">
    <Card
      className="shadow-sm border-0 bg-primary text-white text-center"
      onClick={() => navigate("/job-data")}
      style={{ cursor: "pointer", height: "300px" }}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
        <Card.Title className="fs-3">Post a Job</Card.Title>
        <p className="mt-2">Create and publish new job openings</p>
      </Card.Body>
    </Card>
  </Col>
  <Col md={4} className="mb-4">
    <Card
      className="shadow-sm border-0 bg-success text-white text-center"
      onClick={() => navigate("/received")}
      style={{ cursor: "pointer", height: "300px" }}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
        <Card.Title className="fs-3">View Resumes</Card.Title>
        <p className="mt-2">Explore applicants’ profiles and resumes</p>
      </Card.Body>
    </Card>
  </Col>
  <Col md={4} className="mb-4">
    <Card
      className="shadow-sm border-0 bg-info text-white text-center"
      onClick={() => navigate("/my-posts")}
      style={{ cursor: "pointer", height: "300px" }}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
        <Card.Title className="fs-3">My Jobs</Card.Title>
        <p className="mt-2">View and manage your posted jobs</p>
      </Card.Body>
    </Card>
  </Col>
</Row>


    </Container>
  );
};

export default EmployerDashboard;
