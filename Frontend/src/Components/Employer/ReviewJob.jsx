
import {React,useState} from "react";
import { Container, ListGroup, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewJob = () => {
  const location = useLocation();
  const data = location.state || {};
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  
   const handleClick = async () => {
   if (loading) return;
   setLoading(true);
    try {
    const token = localStorage.getItem('token');
    console.log('📦 Token:', token);

    if (!token) {
      alert('Please login again. Token not found.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    
    navigate('/success');
  } catch (error) {
    
    console.error('Error posting job:',error);
    alert('There was an error posting the job. Please try again.');
    setLoading(false);
  }
};

  const renderItem = (label, value) => (
    <ListGroup.Item className="py-2">
      <strong>{label}:</strong> {value || <span className="text-muted">Not provided</span>}
    </ListGroup.Item>
  );

  return (
    <div
      className="bg-light min-vh-100 py-5"
      style={{
        backgroundImage: `radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <h2 className="text-center mb-4 fw-bold text-primary">Review Entered Data</h2>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                
                <h4 className="text-secondary mb-3 border-bottom pb-2">Company Details</h4>
                <ListGroup variant="flush" className="mb-4">
                  {renderItem("Company Name", data.companyName)}
                  {renderItem("Subheading", data.subheading)}
                  {renderItem("Description", data.company_description)}
                  {renderItem("Website URL", data.Url)}
                </ListGroup>

                <h4 className="text-secondary mb-3 border-bottom pb-2">Job Details</h4>
                <ListGroup variant="flush" className="mb-4">
                  {renderItem("Title", data.title)}
                  {renderItem("Category", data.category)}
                  {renderItem("Description", data.description)}
                  {renderItem("Type", data.jobType)}
                  {renderItem("Location", data.location)}
                  {renderItem("Salary", data.salary)}
                  {renderItem("Perks and Benefits", data.benefits)}
                </ListGroup>

                <h4 className="text-secondary mb-3 border-bottom pb-2">Candidate Requirements</h4>
                <ListGroup variant="flush">
                  {renderItem("Required Skills", data.skills)}
                  {renderItem("Education", data.education)}
                  {renderItem("Experience", data.experience)}
                  {renderItem("Eligibility", data.eligiblity)}
                  {renderItem("Languages", data.language)}
                </ListGroup>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="primary"
                size="lg"
                className="rounded-pill px-5"
                onClick={handleClick}
                disabled={loading} 
                >
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReviewJob;
