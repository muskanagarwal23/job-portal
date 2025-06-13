import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyPosts = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/employer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => {
        console.error("Fetch error:", err);
        toast.error("Failed to load job posts.");
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
         const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data ;

       try {
      data = await res.json();
    } catch (parseError) {
      throw new Error("Server error: Response not JSON");
    }

      if (!res.ok) throw new Error(data.message|| "Failed to delete job");
      
      toast.success('Job deleted successfully');
      // Update local state
      setJobs(prev => prev.filter(job => job._id !== id));

      toast.success("Job deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error deleting job.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-primary">My Job Posts</h2>
      <Row>
        {jobs.map((job) => (
          <Col md={6} lg={4} key={job._id}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.category}</Card.Subtitle>
                <Card.Text>{job.description?.substring(0, 100)}...</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(job._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toasts */}
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default MyPosts;
