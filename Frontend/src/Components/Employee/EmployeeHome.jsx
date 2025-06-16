import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../../Context/BookmarkContext";
import { useSearch } from "../../Context/SearchContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeHome = () => {
  const { bookmarkedJobs, toggleBookmark } = useBookmark();
  const { searchQuery } = useSearch();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
    toast.error('Could not apply to job: ' + message);
  }
};


  const isBookmarked = (job) =>
    bookmarkedJobs.some((item) => item._id === job._id);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Loading jobs...</p>;
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
      <Container>
        <h2 className="text-center mb-5 fw-bold text-dark">
          Available Job Listings
        </h2>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job._id}
              className="mb-4 shadow-sm border-0 rounded-4 p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center bg-white"
            >
              <div>
                <h5 className="fw-bold mb-1">
                  <Link
                    to={`/job-detail/${job._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {job.title}
                  </Link>
                </h5>
                <p className="mb-1">{job.companyName}</p>
                <p className="text-muted mb-0">{job.location}</p>
              </div>

              <div className="text-md-end mt-3 mt-md-0 d-flex align-items-center gap-3">
                <div
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onClick={() => toggleBookmark(job)}
                  aria-label={
                    isBookmarked(job) ? "Remove Bookmark" : "Add Bookmark"
                  }
                  title={isBookmarked(job) ? "Remove Bookmark" : "Add Bookmark"}
                >
                  {isBookmarked(job) ? (
                    <BookmarkIcon fontSize="large" className="text-primary" />
                  ) : (
                    <BookmarkBorderIcon fontSize="large" />
                  )}
                </div>
                <Button
                  variant="primary"
                  className="fw-bold px-4 py-2"
                  onClick={() => handleApply(job)}
                >
                  Apply
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted fs-4 mt-5">
            No jobs found matching your search.
          </p>
        )}
      </Container>
    </div>
  );
};

export default EmployeeHome;
