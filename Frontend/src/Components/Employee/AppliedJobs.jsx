// Components/Employee/AppliedJobs.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/applications/my', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (!res.ok) {
  const text = await res.text(); // avoid parsing invalid JSON
  console.error(`API error ${res.status}: ${text}`);
  throw new Error(`Failed to fetch: ${res.status}`);
}

      const data = await res.json();
      setApplications(data);
    };

    fetchApplications();
  }, []);

  return (
    <Container className="py-5">
      <h3 className="mb-4 text-primary fw-bold text-center">My Applied Jobs</h3>
      {applications.map((app) => (
        <Card key={app._id} className="mb-3 shadow-sm p-3">
          <h5>{app.job.title}</h5>
          <p>{app.job.companyName} – {app.job.location}</p>
          <Badge bg="info" className="text-uppercase">{app.status}</Badge>
        </Card>
      ))}
    </Container>
  );
};

export default AppliedJobs;
