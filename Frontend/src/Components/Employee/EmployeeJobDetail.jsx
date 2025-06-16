import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Badge,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../../Context/BookmarkContext";
import { toast } from "react-toastify";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookmarkedJobs, toggleBookmark } = useBookmark();

  const isBookmarked = bookmarkedJobs.some((item) => item._id === id);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (job) => {
    const jobId = job._id;
    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to apply");
      }

      alert("Application submitted!");
    } catch (err) {
      const message = err?.message?.includes("<!DOCTYPE")
        ? "Already applied to this job"
        : err.message;
      console.error("Apply error:", message);
      toast.dismiss();
      if (message.includes("Update profile")) {
        toast.error("Update your profile first before applying");
      } else if (message.includes("Already applied")) {
        toast.error("You have already applied to this job");
      } else {
        toast.error("Could not apply to job: " + message);
      }
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading job details...</p>
      </div>
    );

  if (!job)
    return <p className="text-center text-danger mt-5">Job not found</p>;

  const renderBadges = (items, color = "secondary") =>
    items.map((item, idx) => (
      <Badge key={idx} bg={color} className="me-2 mb-2">
        {item}
      </Badge>
    ));

  const skills =
    typeof job.skills === "string"
      ? job.skills.split(",").map((s) => s.trim())
      : Array.isArray(job.skills)
      ? job.skills
      : [];

  const education =
    typeof job.education === "string"
      ? job.education.split(",").map((e) => e.trim())
      : Array.isArray(job.education)
      ? job.education
      : [];

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
        <Card className="p-5 shadow-lg border-0 rounded-4">
          <div className="mb-4">
            <h2 className="fw-bold text-primary">{job.title}</h2>
            <h3 className="mb-1 text-muted fs-5">{job.companyName}</h3>
            <a href={job.Url} target="_blank" rel="noopener noreferrer">
              {job.Url}
            </a>
            <h5 className="text-muted">{job.location}</h5>
          </div>

          <hr />

          <section className="mb-4">
            <h5 className="fw-semibold mb-2">Skills</h5>
            {renderBadges(skills)}
          </section>

          <section className="mb-4">
            <h5 className="fw-semibold mb-2">Education</h5>
            {renderBadges(education, "info")}
          </section>

          <section className="mb-4">
            <h5 className="fw-semibold">Experience</h5>
            <p>{job.experience}</p>
          </section>

          <hr />

          <Row className="mb-4">
            <Col md={6}>
              <h6 className="fw-semibold">Salary</h6>
              <Badge bg="success">{job.salary}</Badge>
            </Col>
            <Col md={6}>
              <h6 className="fw-semibold">Job Type</h6>
              <Badge bg="dark">{job.jobType}</Badge>
            </Col>
          </Row>

          <section className="mb-4">
            <h5 className="fw-semibold">Benefits</h5>
            <p>{job.benefits || "Not specified"}</p>
          </section>

          <section className="mb-4">
            <h5 className="fw-semibold">Job Description</h5>
            <p>{job.description}</p>
          </section>

          <section className="mb-4">
            <h5 className="fw-semibold">Eligibility</h5>
            <p>{job.eligiblity}</p>
          </section>

          <section className="mb-4">
            <h5 className="fw-semibold">Company Description</h5>
            <p>{job.company_description}</p>
          </section>

          <div className="d-flex gap-3 mt-4">
            <Button
              variant="primary"
              className="px-4 fw-bold py-2 rounded-pill"
              onClick={() => handleApply(job)}
            >
              Apply
            </Button>
            <Button
              variant={isBookmarked ? "outline-success" : "outline-secondary"}
              className="fw-bold px-4 py-2 rounded-pill"
              onClick={() => toggleBookmark(job)}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />} Save
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default JobDetail;
