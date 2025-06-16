import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Trash } from "react-bootstrap-icons";
import "react-toastify/dist/ReactToastify.css";

const MyPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/employer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.dismiss();
        toast.error("Failed to load job posts.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete job");

      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.dismiss();
      toast.success("Job deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(err.message || "Error deleting job.");
    }
  };

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
      <Container>
        <h2 className="display-5 fw-bold text-center text-dark mb-3">
          My Job Posts
        </h2>
        <p className="lead text-center text-secondary mb-5">
          View job applications posted by you.
        </p>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : jobs.length === 0 ? (
          <Card className="text-center shadow-sm p-5 mt-5">
            <Card.Body>
              <Card.Title className="fs-3 text-secondary mb-3">
                No jobs posted yet.
              </Card.Title>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {jobs.map((job) => (
              <Col md={6} lg={4} key={job._id} className="d-flex">
                <Card className="mb-4 shadow-sm w-100 border-0 rounded-4">
                  <Card.Body>
                    <Card.Title className="fw-bold text-dark">
                      {job.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.companyName}
                    </Card.Subtitle>
                    <Card.Text className="text-secondary small">
                      {job.location}
                    </Card.Text>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="d-flex align-items-center gap-2"
                        onClick={() => handleDelete(job._id)}
                      >
                        <Trash size={16} /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
  );
};

export default MyPosts;
