import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Badge, Button } from "react-bootstrap";
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
      const res = await fetch(`http://localhost:5000/api/applications/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // 👈 Make sure this exists
        },
        // body: JSON.stringify({}),
      });
  
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error( errorText || 'Failed to apply');
      }
  
      alert('Application submitted!');
    } catch (err) {
      const message = err?.message?.includes('<!DOCTYPE') 
        ? 'Already applied to this job'
      : err.message;
      console.error('Apply error:', message);
      toast.dismiss();
      toast.error('Already applied to this job ' + message);
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading job details...</p>;
  if (!job)
    return <p className="text-center text-danger mt-5">Job not found</p>;

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
      <Container>
        <Card className="p-4 shadow-sm border-0 rounded-4">
          <h3 className="fw-bold">{job.title}</h3>
          <p className="mb-1">{job.companyName}</p>
          <p>{job.Url}</p>
          <p className="mb-1">{job.location}</p>

          <hr />

          <h5 className="fw-semibold mt-3">Profile Insights</h5>
          <div className="mb-2 d-flex flex-wrap align-items-center">
            <strong className="me-2">Skills:</strong>
            {(Array.isArray(job.skills)
              ? job.skills
              : typeof job.skills === "string"
              ? job.skills.split(",").map((s) => s.trim())
              : []
            ).map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-1">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mb-3 d-flex flex-wrap align-items-center">
            <strong className="me-2">Education:</strong>
            {(Array.isArray(job.education)
              ? job.education
              : typeof job.education === "string"
              ? job.education.split(",").map((e) => e.trim())
              : []
            ).map((edu, index) => (
              <Badge key={index} bg="info" className="me-2 mb-1">
                {edu}
              </Badge>
            ))}
          </div>

          <p className="fw-semibold">Experience: {job.experience}</p>

          <hr />

          <h5 className="fw-semibold">Job Details</h5>
          <div className="mb-2">
            <strong>Salary:</strong> <Badge bg="secondary">{job.salary}</Badge>
          </div>
          <div className="mb-3">
            <strong>Job Type:</strong>{" "}
            <Badge bg="secondary">{job.jobType}</Badge>
          </div>
          <hr />
          <h5 className="fw-semibold">Location</h5>
          <p>{job.location}</p>
          <hr />
          <h5 className="fw-semibold">Benefits</h5>
          <p>{job.benefits || "Not specified"}</p>
          <hr />
          <h5 className="fw-semibold">Job Description:</h5>
          <p>{job.description}</p>
          <h5 className="fw-semibold">Eligiblity:</h5>
          <p>{job.eligiblity}</p>
          <hr />

          <h5 className="fw-semibold">Company Description</h5>
          <p>{job.company_description}</p>
          <hr />
          <div className="d-flex gap-3 mt-4">
            <Button 
            variant="primary" 
            className="px-4 fw-bold py-2 "
            onClick={() => handleApply(job)}
            >
              Apply
            </Button>
            <Button
              variant={isBookmarked ? "outline-success" : "outline-secondary"}
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
