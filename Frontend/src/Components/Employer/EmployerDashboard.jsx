import { React, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [employerInfo, setEmployerInfo] = useState(null);

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
        const { data } = await axios.get(
          "http://localhost:5000/api/employer/dashboard",
          config
        );
        setStats({
          totalJobs: data.totalJobs,
          totalApplications: data.totalApplications,
          totalSelected: data.totalSelected,
          totalViews: data.totalViews,
        });
        setEmployerInfo(data.employer);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 py-5"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)",
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
    >
      <Container className="my-4">
        <Card
          className="mb-4 shadow-sm p-4 rounded border-0"
          style={{
            background: "linear-gradient(130deg, #e0f7fa, #e3f2fd)",
            height: "180px",
          }}
        >
          <div className="d-flex flex-column justify-content-center h-100">
            <h2 className="text-primary  mb-2">
              <span className="text-dark">Welcome,</span>{" "}
              {employerInfo?.name || "Employer"}
            </h2>
            <h5 className="text-primary  mb-2">
              <span className="text-dark">Email: </span>{" "}
              <span className="fw-semibold"> {employerInfo?.email}</span>
            </h5>
          </div>
        </Card>

        {/* Middle Stat Cards */}
        <Row className="my-5 d-flex justify-content-center">
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
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card
              className="shadow-sm border-0 bg-primary text-white text-center"
              onClick={() => navigate("/job-data")}
              style={{ cursor: "pointer", height: "200px" }}
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
              style={{ cursor: "pointer", height: "200px" }}
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
              style={{ cursor: "pointer", height: "200px" }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
                <Card.Title className="fs-3">My Jobs</Card.Title>
                <p className="mt-2">View and manage your posted jobs</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployerDashboard;
