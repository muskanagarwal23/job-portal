// controllers/jobController.js
const asyncHandler = require('express-async-handler');
const Job = require('../models/jobmodel');

// Create a new job (only for employers)
const createJob = asyncHandler(async (req, res) => {
  const employerId = req.user._id; // from auth middleware

  // Collect job data from request body
  const jobData = req.body;

  // Attach employer to job data
  const newJob = await Job.create({ ...jobData, employer: employerId });

  res.status(201).json(newJob);
});

// Optionally, add a controller to get jobs posted by employer
const getEmployerJobs = asyncHandler(async (req, res) => {
  const employerId = req.user._id;

  const jobs = await Job.find({ employer: employerId });

  res.status(200).json(jobs);
});

module.exports = {
  createJob,
  getEmployerJobs,
};
