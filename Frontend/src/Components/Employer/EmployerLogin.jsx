import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

const EmployerLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const validate = () => {
    if (!email) {
      toast.dismiss();
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email");
      return false;
    }
    if (!password) {
      toast.dismiss();
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post("/users/login", { email, password });
      const { user, token } = res.data;

      if (user.role !== "employer") {
        toast.dismiss();
        return toast.error("Access denied. Not an employer.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.dismiss();
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card
            className="shadow-lg border-0 rounded-4"
            data-aos="fade-up"
            style={{ background: "#ffffff", backdropFilter: "blur(5px)" }}
          >
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Employer Login
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label> Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                      className="d-flex align-items-center border-left-0"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>

              <p className="mt-3 text-center">
                <Link to="/forget-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </p>

              <p className="mt-2 text-center">
                New User?{" "}
                <Link to="/employer-register" className="text-decoration-none">
                  Create an Account
                </Link>
              </p>

              <p className="mt-2 text-center">
                Not an employer?{" "}
                <Link to="/employee-login" className="text-decoration-none">
                  Employee Login
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerLogin;
