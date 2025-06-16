import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useSearch } from "../../Context/SearchContext";
import { toast } from "react-toastify";
import EmployeeSaved from "../Employee/EmployeeSaved";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { searchQuery, setSearchQuery } = useSearch();

  const isLanding = ["/"].includes(path);
  const isEmployerPage = [
    "/job-data",
    "/requirements",
    "/company-data",
    "/review",
    "/success",
  ].includes(path);
  const isReceived = ["/received"].includes(path);
  const isViewed = ["/my-posts"].includes(path);
  const isEmployerAuth = ["/login", "employer-register"].includes(path);
  const isEmployeeHome = ["/employee-home"].includes(path);
  const isEmployeeSaved = ["/employee-saved"].includes(path);
  const isEmployeeApplied = ["/employee-applied"].includes(path);
  const isEmployeeProfile = path === "/employee-profile";
  const isEmployeeAuth = ["/employee-login", "/register"].includes(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.dismiss();
    toast.success("Logged out successfully");

    if (isEmployerPage) {
      navigate("/login");
    } else if (
      isEmployeeHome ||
      EmployeeSaved ||
      isEmployeeProfile ||
      isEmployeeAuth ||
      isEmployeeApplied
    ) {
      navigate("/employee-login");
    } else {
      navigate("/");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-2 sticky-top"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        zIndex: 1030,
      }}
    >
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <p
            className="fw-bold mb-0"
            style={{
              fontSize: "2rem",
              background:
                "linear-gradient(270deg, #007bff, #00d2ff, #00ffb9, #007bff)",
              backgroundSize: "600% 600%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 8s ease infinite",
              letterSpacing: "0.5px",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              textShadow: "1px 1px 6px rgba(0,0,0,0.1)",
            }}
          >
            Career Connect
          </p>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          {isLanding && (
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Nav.Link
                as={Link}
                to="/register"
                className="fw-semibold text-primary"
              >
                Employee
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/employer-register"
                className="fw-semibold text-primary"
              >
                Employer
              </Nav.Link>
            </Nav>
          )}

          {(isEmployerPage || isReceived || isViewed) && (
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              {isEmployerPage && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/received"
                    className="text-primary fw-semibold"
                  >
                    View Resumes
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/my-posts"
                    className="text-primary fw-semibold"
                  >
                    View Jobs
                  </Nav.Link>
                </>
              )}
              {isReceived && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/job-data"
                    className="text-primary fw-semibold"
                  >
                    Post Jobs
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/my-posts"
                    className="text-primary fw-semibold"
                  >
                    View Jobs
                  </Nav.Link>
                </>
              )}
              {isViewed && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/job-data"
                    className="text-primary fw-semibold"
                  >
                    Post Jobs
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/received"
                    className="text-primary fw-semibold"
                  >
                    View Resumes
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                onClick={handleLogout}
                className="text-danger fw-semibold"
                style={{ cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}

          {isEmployerAuth && (
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Nav.Link
                as={Link}
                to="/employee-login"
                className="text-primary fw-semibold"
              >
                Employee Login?
              </Nav.Link>
            </Nav>
          )}

          {isEmployeeAuth && (
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Nav.Link
                as={Link}
                to="/login"
                className="text-primary fw-semibold"
              >
                Employer Login?
              </Nav.Link>
            </Nav>
          )}

          {(isEmployeeHome || isEmployeeSaved || isEmployeeApplied) && (
            <>
              <Form
                className="d-flex mx-auto w-50"
                onSubmit={(e) => e.preventDefault()}
              >
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill px-3 py-2 fs-5 border border-primary"
                  style={{ height: "48px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-primary"
                  className="rounded-pill px-3 d-flex align-items-center justify-content-center"
                  style={{ height: "48px" }}
                >
                  <SearchSharpIcon />
                </Button>
              </Form>

              <Nav className="ms-auto d-flex align-items-center gap-4">
                <Nav.Link
                  as={Link}
                  to="/employee-applied"
                  className="text-primary fw-semibold"
                >
                  My Jobs
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/employee-profile"
                  className="text-dark"
                >
                  <PersonIcon fontSize="large" style={{ cursor: "pointer" }} />
                </Nav.Link>
                <Nav.Link as={Link} to="/employee-saved" className="text-dark">
                  <BookmarkSharpIcon
                    fontSize="large"
                    style={{ cursor: "pointer" }}
                  />
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="text-danger fw-semibold"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </>
          )}

          {isEmployeeProfile && (
            <Nav className="ms-auto d-flex align-items-center gap-4">
              <Nav.Link
                as={Link}
                to="/employee-applied"
                className="text-primary fw-semibold"
              >
                My Jobs
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-saved" className="text-dark">
                <BookmarkSharpIcon
                  fontSize="large"
                  style={{ cursor: "pointer" }}
                />
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                className="text-danger fw-semibold"
                style={{ cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
