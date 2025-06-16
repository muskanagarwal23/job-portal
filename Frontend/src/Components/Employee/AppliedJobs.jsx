import React, { useEffect, useState } from 'react';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';

const statusVariant = {
  applied: 'secondary',
  viewed: 'info',
  interviewed: 'warning',
  selected: 'success',
  rejected: 'danger',
};

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:5000/api/applications/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error(`API error ${res.status}: ${text}`);
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        //const filtered = data.filter(app => app.status !== 'rejected');
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p className="text-muted">Loading your applications...</p>
      </Container>
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
    <Container className="py-5">
      <h2 className="mb-4 text-center text-dark fw-bold">My Applied Jobs</h2>
      <p className="lead text-center text-secondary mb-5">
          View job applications
        </p>

      {applications.length === 0 ? (
         <Card className="text-center shadow-sm p-5 mt-5">
                    <Card.Body>
                      <Card.Title className="fs-3 text-secondary mb-3">
                        You haven't applied to any jobs yet
                      </Card.Title>
                    </Card.Body>
                  </Card>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {applications.map((app) => {
            if (!app.job) {
              return null; // Skip if job is null or missing
            }

            return (
              <Col key={app._id}>
                <Card className="h-100 shadow-sm border">
                  <Card.Body>
                    <Card.Title className="mb-2 fw-bold text-dark">
                      {app.job.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {app.job.companyName} • {app.job.location || "Location Unknown"}
                    </Card.Subtitle>

                    <div className="mt-3">
                      <Badge
                        bg={statusVariant[app.status?.toLowerCase()] || 'secondary'}
                        className="px-3 py-2 text-uppercase"
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent text-end">
                    <small className="text-muted">
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </small>
                  </Card.Footer>
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

export default AppliedJobs;
