import React, { useEffect, useState } from "react";
import { Container, Card, Button, ButtonGroup, Spinner } from "react-bootstrap";

const statusOptions = ["viewed", "interviewed", "selected", "rejected"];

const Received = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/applications/employer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          // Handle error response, maybe show a message
          console.error("Failed to fetch applications:", res.statusText);
          setApplications([]); // set empty array to avoid map error
          setLoading(false);
          return;
        }
        const data = await res.json();
        console.log("application received:", data);

        setApplications(data.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [token]);

  const updateStatus = async (appId, status) => {
    setUpdatingId(appId);
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
      if (!res.ok) throw new Error("Failed to update status");
      const updatedApp = await res.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? updatedApp : app))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading applications...</p>;

  return (
    <Container className="py-5">
      <h3 className="text-primary fw-bold mb-4 text-center">
        Job Applications
      </h3>
      {Array.isArray(applications) && applications.length === 0 ? (
        <p className="text-center text-muted fs-4 mt-5">
          No applications found.
        </p>
      ) : (
        Array.isArray(applications) &&
        applications.map((app) => (
          <Card key={app._id} className="mb-3 p-4 shadow-sm">
            <h5>{app.job.title}</h5>
            <p>
              <strong>Applicant:</strong> {app.employee.name} <br />
              <strong>Email:</strong> {app.employee.email} <br />
              <strong>Phone:</strong> {app.employee.phone}
            </p>
            {app.resumeFile && (
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={`http://localhost:5000/${app.resumeFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </p>
            )}
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-capitalize">{app.status}</span>
            </p>

            <ButtonGroup>
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={
                    app.status === status ? "primary" : "outline-primary"
                  }
                  disabled={updatingId === app._id}
                  onClick={() => updateStatus(app._id, status)}
                >
                  {updatingId === app._id ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    status.charAt(0).toUpperCase() + status.slice(1)
                  )}
                </Button>
              ))}
            </ButtonGroup>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Received;
