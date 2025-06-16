import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";

const statusOptions = ["viewed", "interviewed", "selected", "rejected"];

const Received = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const getRejectedIds = () => {
    try {
      const stored = localStorage.getItem("rejectedApplicationIds");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const addRejectedId = (id) => {
    const rejectedIds = getRejectedIds();
    if (!rejectedIds.includes(id)) {
      rejectedIds.push(id);
      localStorage.setItem(
        "rejectedApplicationIds",
        JSON.stringify(rejectedIds)
      );
    }
  };

  useEffect(() => {
    if (!token) {
      setErrorMessage("Please log in to view job applications.");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(
          "http://localhost:5000/api/applications/employer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          setErrorMessage(
            errorData.message ||
              "Failed to load applications. Please try again."
          );
          setApplications([]);
          return;
        }

        const data = await res.json();

        const rejectedIds = getRejectedIds();
        const filteredApps = Array.isArray(data.data)
          ? data.data.filter((app) => !rejectedIds.includes(app._id))
          : [];
        console.log("Filtered applications:", filteredApps);

        setApplications(filteredApps);
      } catch (err) {
        setErrorMessage(
          "An unexpected error occurred. Please check your network connection."
        );
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const updateStatus = async (appId, status) => {
    if (!token) {
      setErrorMessage("Cannot update status: No authentication token found.");
      return;
    }

    setUpdatingId(appId);
    setErrorMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/status/${appId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      const updatedApp = await res.json();

      if (status === "rejected") {
        // Add to localStorage rejected list
        addRejectedId(appId);
        setApplications((prev) => prev.filter((app) => app._id !== appId));
      } else {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === appId ? { ...app, status: updatedApp.status } : app
          )
        );
      }
    } catch (err) {
      setErrorMessage(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "viewed":
        return "text-primary"; // blue
      case "interviewed":
        return "text-purple"; // bootstrap doesn't have purple, use text-secondary or custom color if you want
      case "selected":
        return "text-success";
      case "rejected":
        return "text-danger";
      default:
        return "text-muted";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 fs-5 text-secondary">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 position-relative overflow-hidden py-5"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)",
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
    >
      <Container className="py-4" style={{ maxWidth: "900px" }}>
        <h3 className="display-5 fw-bold text-center text-dark mb-3">
          Manage Job Applications
        </h3>
        <p className="lead text-center text-secondary mb-5">
          View and update the status of incoming job applications.
        </p>

        {errorMessage && (
          <Alert variant="danger" className="shadow-sm rounded-3">
            <strong>Error:</strong> {errorMessage}
          </Alert>
        )}

        {applications.length === 0 ? (
          <Card className="text-center shadow-sm p-5 mt-5">
            <Card.Body>
              <Card.Title className="fs-3 text-secondary mb-3">
                No applications received yet.
              </Card.Title>
              <Card.Text className="text-muted">
                Applicants will appear here once they apply to your jobs.
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {applications.map((app) => {
              let resumeUrl = "";
              if (app.resumeFile) {
                const formattedPath = app.resumeFile
                  .replace(/\\/g, "/")
                  .replace(/^public\//, "");
                resumeUrl = `http://localhost:5000/${formattedPath}`;
              }

              return (
                <Col xs={12} key={app._id}>
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <Card.Title className="fs-4 fw-semibold mb-3 text-dark">
                        {app.job.title}
                      </Card.Title>

                      <Row className="mb-3 text-secondary">
                        <Col sm={6}>
                          <p>
                            <strong>Applicant:</strong> {app.employee.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {app.employee.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {app.employee.phone}
                          </p>
                        </Col>
                        <Col sm={6}>
                          {resumeUrl && (
                            <p>
                              <strong>Resume:</strong>{" "}
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-primary"
                              >
                                View Resume
                              </a>
                            </p>
                          )}
                        </Col>
                      </Row>

                      <p className="mb-4 fs-5">
                        <strong>Current Status:</strong>{" "}
                        <span
                          className={`fw-semibold text-capitalize ${getStatusColorClass(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        {statusOptions.map((status) => (
                          <Button
                            key={status}
                            variant={
                              app.status === status
                                ? "primary"
                                : "outline-primary"
                            }
                            size="sm"
                            disabled={
                              updatingId === app._id || app.status === status
                            }
                            onClick={() => updateStatus(app._id, status)}
                          >
                            {updatingId === app._id ? (
                              <>
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  className="me-1"
                                />
                                Updating...
                              </>
                            ) : (
                              status.charAt(0).toUpperCase() + status.slice(1)
                            )}
                          </Button>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Received;
