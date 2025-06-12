import React, { useState, useEffect } from 'react';
import { Container, Col, Button, Row } from 'react-bootstrap';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import dummy from '../../assets/dummy.avif';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const EmployeeProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Make fetchProfile reusable
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { name, email, phone, profileImage, resumeFile } = response.data;

      setFormData({ name: name || '', email: email || '', phone: phone || '' });
      
      if (profileImage && typeof profileImage === 'string' && !profileImage.startsWith('http')) {
      setProfileImage(`${BASE_URL}${profileImage}`);
    } else if (profileImage) {
      setProfileImage(profileImage);
    }
      if (resumeFile && typeof resumeFile === 'string' && !resumeFile.startsWith('http')) {
      setResumeFile(`${BASE_URL}${resumeFile}`);
    } else if (resumeFile) {
      setResumeFile(resumeFile);
    }
     if (name || email || phone) {
      setIsSaved(true);
    }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile. Please login again.');
    }
  };

  useEffect(() => {
    fetchProfile();

    return () => {
      if (profileImage instanceof File) URL.revokeObjectURL(profileImage);
      if (resumeFile instanceof File) URL.revokeObjectURL(resumeFile);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all fields before saving.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      if (profileImage instanceof File) {
        formDataToSend.append('profileImage', profileImage);
      }

      if (resumeFile instanceof File) {
        formDataToSend.append('resumeFile', resumeFile);
      }

      await axios.put('/api/users/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // ✅ Refetch updated profile
      fetchProfile();

      // ✅ Reset file input display (optional)
      const resumeInput = document.getElementById('resume-upload');
      if (resumeInput) resumeInput.value = '';

      setIsSaved(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleEdit = () => setIsSaved(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'radial-gradient(circle at center, #e9f0ff 10px, #f8fbff 20px)',
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ maxWidth: '600px' }}>
        <Col md={12} className="bg-white p-5 rounded shadow text-center position-relative">
          <div className="position-relative mx-auto mb-4" style={{ width: '150px', height: '150px' }}>
            <img
              src={
                typeof profileImage === 'string'
                  ? profileImage
                  : profileImage
                  ? URL.createObjectURL(profileImage)
                  : dummy
              }
              alt="Profile"
              className="rounded-circle"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                border: '4px solid #0d6efd',
              }}
            />
            {!isSaved && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>

          <Row className="gx-3">
            <Col xs={12} className="mb-3">
              {isSaved ? (
                <h3>{formData.name}</h3>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="form-control text-center"
                />
              )}
            </Col>

            <Col xs={12} className="mb-3">
              {isSaved ? (
                <p className="text-muted mb-0">{formData.email}</p>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="form-control text-center"
                />
              )}
            </Col>

            <Col xs={12} className="mb-3">
              {isSaved ? (
                <p className="text-muted mb-0">{formData.phone}</p>
              ) : (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="form-control text-center"
                />
              )}
            </Col>
          </Row>

          <div className="mt-4">
            {!isSaved ? (
              <>
                <label htmlFor="resume-upload" className="btn btn-outline-primary">
                  <UploadFileIcon className="me-2" />
                  Upload Resume
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={isSaved}
                  style={{ display: 'none' }}
                />
                {resumeFile instanceof File && (
                  <p className="mt-2 text-muted small">Selected: {resumeFile.name}</p>
                )}
                {resumeFile && typeof resumeFile === 'string' && (
                  <p className="mt-2 text-muted small">Uploaded: {resumeFile.split('/').pop()}</p>
                )}
              </>
            ) : (
              resumeFile &&
              typeof resumeFile === 'string' && (
                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success"
                >
                  View Resume
                </a>
              )
            )}
          </div>

          <div className="mt-4">
            {!isSaved ? (
              <Button variant="primary" size="lg" className="px-5" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="outline-secondary" size="lg" onClick={handleEdit}>
                <EditIcon className="me-1" />
                Edit
              </Button>
            )}
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default EmployeeProfile;
