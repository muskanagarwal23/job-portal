import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useSearch } from '../../Context/SearchContext';
import { toast } from 'react-toastify';
import EmployeeSaved from '../Employee/EmployeeSaved';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { searchQuery, setSearchQuery } = useSearch();

  const isLanding = ['/'].includes(path);
  const isEmployerPage = ['/job-data', '/requirements', '/company-data', '/review','/success'].includes(path);
  const isReceived = ['/received'].includes(path);
  const isEmployerAuth = ['/login', 'employer-register'].includes(path);
  const isEmployeeHome = ['/employee-home'].includes(path);
  const isEmployeeSaved = [ '/employee-saved'].includes(path);
  const isEmployeeApplied = [ '/employee-applied'].includes(path);
  const isEmployeeProfile = path === '/employee-profile';
  const isEmployeeAuth = ['/employee-login', '/register'].includes(path);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');

    
    if (isEmployerPage) {
      navigate('/login');
    } else if (isEmployeeHome ||EmployeeSaved || isEmployeeProfile || isEmployeeAuth || isEmployeeApplied ) {
      navigate('/employee-login');
    } else {
      navigate('/');
    }
  };

  return (
    <Navbar expand="lg" className="shadow-sm py-3" style={{ backgroundColor: '#f5f5f5' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={Logo} alt="logo" width="120" className="me-2" height="100" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">

          {/* Landing */}
          {isLanding && (
            <Nav className="ms-auto d-flex gap-3">
              <Nav.Link as={Link} to="/register" className=" fw-bold text-primary">Employee</Nav.Link>
              <Nav.Link as={Link} to="/login" className=" fw-bold text-primary">Employer</Nav.Link>
            </Nav>
          )}

          
          {isEmployerPage && (
            <Nav className="ms-auto d-flex gap-3">
              <Nav.Link as={Link} to="/received" className="text-primary fw-bold">
                view Resumes
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
            </Nav>
          )}

          {isReceived && (
            <Nav className="ms-auto d-flex gap-3">
              <Nav.Link as={Link} to="/job-data" className="text-primary fw-bold">
                Post Jobs
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
            </Nav>
          )}

          {isEmployerAuth && (
            <Nav className="ms-auto d-flex gap-3">
              <Nav.Link as={Link} to="/register" className="text-primary fw-bold">
                Employee Login?
              </Nav.Link>
              
            </Nav>
          )}

         
          {isEmployeeAuth && (
            <Nav className="ms-auto d-flex gap-3">
              <Nav.Link as={Link} to="/login" className="text-primary fw-bold">
                Employer Login?
              </Nav.Link>
            </Nav>
          )}

          
          {isEmployeeHome && (
            <>
              <Form className="d-flex mx-auto w-50" onSubmit={e => e.preventDefault()}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill px-3 py-2 fs-5"
                  style={{ height: '50px' }}
                  aria-label="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="rounded-pill px-2"
                  style={{ height: '40px' }}
                  onClick={e => e.preventDefault()}
                >
                  <SearchSharpIcon />
                </Button>
              </Form>

            <Nav className="ms-auto d-flex align-items-center gap-4">

                 <Nav.Link as={Link} to="/employee-applied" className="text-primary fw-bold">
                  MyJobs
                </Nav.Link>
                
                <Nav.Link as={Link} to="/employee-profile" className="text-dark">
                  <PersonIcon fontSize="large" />
                </Nav.Link>
                
                <Nav.Link as={Link} to="/employee-saved" className="text-dark">
                  <BookmarkSharpIcon fontSize="large" />
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
                  Logout
                </Nav.Link>
              
              </Nav>
            </>
          )} 

          {isEmployeeSaved && (
            <>
              <Form className="d-flex mx-auto w-50" onSubmit={e => e.preventDefault()}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill px-3 py-2 fs-5"
                  style={{ height: '50px' }}
                  aria-label="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="rounded-pill px-2"
                  style={{ height: '40px' }}
                  onClick={e => e.preventDefault()}
                >
                  <SearchSharpIcon />
                </Button>
              </Form>

            <Nav className="ms-auto d-flex align-items-center gap-4">

                 <Nav.Link as={Link} to="/employee-applied" className="text-dark">
                  MyJobs
                </Nav.Link>
                
                <Nav.Link as={Link} to="/employee-profile" className="text-dark">
                  <PersonIcon fontSize="large" />
                </Nav.Link>
              
                <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
                  Logout
                </Nav.Link>
              
              </Nav>
            </>
          )}

          {isEmployeeApplied && (
            <>
              <Form className="d-flex mx-auto w-50" onSubmit={e => e.preventDefault()}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill px-3 py-2 fs-5"
                  style={{ height: '50px' }}
                  aria-label="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="rounded-pill px-2"
                  style={{ height: '40px' }}
                  onClick={e => e.preventDefault()}
                >
                  <SearchSharpIcon />
                </Button>
              </Form>

            <Nav className="ms-auto d-flex align-items-center gap-4">
                
                <Nav.Link as={Link} to="/employee-profile" className="text-dark">
                  <PersonIcon fontSize="large" />
                </Nav.Link>
                
                <Nav.Link as={Link} to="/employee-saved" className="text-dark">
                  <BookmarkSharpIcon fontSize="large" />
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
                  Logout
                </Nav.Link>
              
              </Nav>
            </>
          )} 

          
          {isEmployeeProfile && (
            <Nav className="ms-auto d-flex align-items-center gap-4">
              <Nav.Link as={Link} to="/employee-applied" className="text-dark">
                  MyJobs
                </Nav.Link>
              <Nav.Link as={Link} to="/employee-saved" className="text-dark">
                <BookmarkSharpIcon fontSize="large" />
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-danger fw-bold" style={{ cursor: 'pointer' }}>
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
