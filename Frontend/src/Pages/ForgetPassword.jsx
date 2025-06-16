import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", {
        email,
      });
      toast.dismiss();
      toast.success("Reset link sent to your email");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={6}>
          <Card className="shadow border-0 rounded-4">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Forgot Password
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Send Reset Link
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

export default ForgetPassword;
