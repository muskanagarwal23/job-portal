const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Job = require('../models/jobmodel');
const User = require('../models/user');


const applyToJob = asyncHandler(async (req, res) => {
console.log("🔥 Incoming Apply Request");
console.log("🧾 User from req.user:", req.user);
console.log("📌 User ID:", req.user?._id);
  
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  


  const alreadyApplied = await Application.findOne({
    job: jobId,
    employee: req.user._id,
  });

  if (alreadyApplied) {
    res.status(400);
    throw new Error('Already applied to this job');
  }

  const employee = await User.findById(req.user._id).select('name email phone resumeFile');
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  console.log('Resume file path:', req.file?.path); // check multer upload
  const resumeFilePath = employee.resumeFile;
  // const filePath = req.file.path.replace(/\\/g, '/').replace('/^public/\\', '');
  if (!resumeFilePath) {
        res.status(400);
        throw new Error('Please upload your resume in your profile before applying for a job.');
    }

  const newApplication = await Application.create({
    job: jobId,
    employee: req.user._id,
    status: 'applied',
    employeeName: employee.name,
    employeeEmail: employee.email,
    employeePhone: employee.phone,
    resumeFile: resumeFilePath
  });
  console.log('New application:', newApplication);

-
  res.status(201).json({ message: 'Applied successfully', application: newApplication });
});

const getApplicationsForEmployer = asyncHandler(async (req, res) => {
  const employerId = req.user._id;
  console.log('Employer ID:', employerId);
  // Get all jobs posted by the employer
  const jobs = await Job.find({ employer: employerId }).select('_id');
  console.log('Jobs found:', jobs.length);
  
  if (jobs.length === 0) {
     return res.status(200).json({ data: [] });
  }

  const jobIds = jobs.map(job => job._id);
   
  // Get all applications to those jobs
  const applications = await Application.find({ job: { $in: jobIds } })
   .select('job employee status resumeFile employeeName employeeEmail employeePhone')
  .populate('job', 'title')            
    .populate('employee', 'name email phone');
    
  
     console.log('Applications found:', applications.length);
  res.status(200).json({data:applications});
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await Application.findById(id);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  application.status = status;
  await application.save();

  res.status(200).json(application);
});

const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ employee: req.user._id })
    .populate('job', 'title companyName location'); // optional: populate job info

  res.json(applications);
});

module.exports = {
  applyToJob,
  getApplicationsForEmployer,
  updateApplicationStatus, 
  getMyApplications
};