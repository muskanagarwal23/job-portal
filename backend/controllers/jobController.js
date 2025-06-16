const asyncHandler = require("express-async-handler");
const Job = require("../models/jobmodel");

// Create a new job (only for employers)
const createJob = asyncHandler(async (req, res) => {
  const employerId = req.user._id; // from auth middleware

  // Collect job data from request body
  const jobData = req.body;

  // Attach employer to job data
  const newJob = await Job.create({ ...jobData, employer: employerId });

  res.status(201).json(newJob);
});

// add a controller to get jobs posted by employer
const getEmployerJobs = asyncHandler(async (req, res) => {
  const employerId = req.user._id;

  const jobs = await Job.find({ employer: employerId });

  res.status(200).json(jobs);
});

// Delete a job
const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user._id;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  job.views = (job.views || 0) + 1;
  await job.save();

  res.status(200).json(job);

  // Check if this job was posted by the logged-in employer
  if (job.employer.toString() !== employerId.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this job" });
  }

  await job.deleteOne();

  res.status(200).json({ message: "Job deleted successfully" });
});

module.exports = {
  createJob,
  getEmployerJobs,
  deleteJob,
};
