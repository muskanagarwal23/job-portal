import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import EmployerLogin from './Components/Employer/EmployerLogin';
import EmployeeRegister from './Components/Employee/EmployeeRegister';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import EmployeeLogin from './Components/Employee/EmployeeLogin';
import EmployerRegister from './Components/Employer/EmployerRegister';
import ProtectedRoute from './utils/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

// Employee Pages
import EmployeeHome from './Components/Employee/EmployeeHome';
import EmployeeProfile from './Components/Employee/EmployeeProfile';
import EmployeeSaved from './Components/Employee/EmployeeSaved';
import AppliedJobs from './Components/Employee/AppliedJobs';

// Employer Pages
import Requirements from './Components/Employer/Requirements';
import CompanyDetails from './Components/Employer/CompanyDetails';
import JobDetails from './Components/Employer/JobDetails';
import ReviewJob from './Components/Employer/ReviewJob';
import SuccessPost from './Components/Employer/SuccessPost';
import JobDetail from './Components/Employee/EmployeeJobDetail';
import Received from './Components/Employer/Received';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<EmployerLogin />} />
        <Route path="/register" element={<EmployeeRegister />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employer-register" element={<EmployerRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>


        {/* Employee Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/employee-home" element={<EmployeeHome />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/employee-saved" element={<EmployeeSaved />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/employee-applied" element={<AppliedJobs />} />


        </Route>

        {/* Employer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/company-data" element={<CompanyDetails />} />
          <Route path="/job-data" element={<JobDetails />} />
          <Route path="/review" element={<ReviewJob />} />
          <Route path="/success" element={<SuccessPost />} />
          <Route path="/received" element={<Received />} />
          

        </Route>
      </Routes>
       <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
};

export default App;

