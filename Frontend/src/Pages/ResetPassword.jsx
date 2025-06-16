import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending token:', token);
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, 
        { password });
        console.log('Reset token being sent:', token);
      toast.dismiss();
      toast.success('Password reset successful');
      navigate('/employee-login');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={6}>
          <Card className="shadow border-0 rounded-4">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">Reset Password</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Reset Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
