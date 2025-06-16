import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../../Context/BookmarkContext";
import { useSearch } from "../../Context/SearchContext";
import { toast } from "react-toastify";

const EmployeeSaved = () => {
  const { bookmarkedJobs, toggleBookmark } = useBookmark();
  const { searchQuery } = useSearch();

  // Filter saved jobs based on search query (case-insensitive)
  const filteredJobs = bookmarkedJobs.filter(
    (job) =>
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = async (job) => {
    const jobId = job._id;
    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 Make sure this exists
          },
          // body: JSON.stringify({}),
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

  return (
    <div
      className="bg-light d-flex flex-column min-vh-100 position-relative overflow-hidden py-5"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
    >
      <Container className="py-4">
        {bookmarkedJobs.length > 0 && (
          <h2 className="mb-4 fw-bold text-dark text-center">Saved Jobs</h2>
        )}

        {filteredJobs.length === 0 ? (
          <div className="text-center text-muted fs-3 fw-bold">
            {searchQuery.trim() !== ""
              ? "No saved jobs match your search."
              : "No bookmarked jobs yet."}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="mb-4 shadow-sm p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center bg-light"
            >
              <div>
                <h5 className="mb-2">{job?.title}</h5>
                <p className="mb-1">{job?.companyName}</p>
                <p className="text-muted">{job?.location}</p>
              </div>

              <div className="d-flex flex-column align-items-end mt-3 mt-md-0 gap-2">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleBookmark(job)}
                  aria-label="Remove Bookmark"
                  title="Remove Bookmark"
                >
                  <BookmarkIcon fontSize="large" className="text-primary" />
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
        )}
      </Container>
    </div>
  );
};

export default EmployeeSaved;
