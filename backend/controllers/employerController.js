const asyncHandler = require('express-async-handler');
const Job = require('../models/jobmodel');
const Application = require('../models/Application');

const getDashboard = asyncHandler(async (req, res) => {
  const employerId = req.user._id;
   console.log("Employer ID:", employerId);
  
  const jobs = await Job.find({ postedBy: employerId });
   console.log("Jobs found:", jobs);
  
  const totalJobs = jobs.length;

  
  const jobIds = jobs.map((job) => job._id);

  
  const applications = await Application.find({ job: { $in: jobIds } });

  const totalApplications = applications.length;
  const totalSelected = applications.filter(app => app.status === "selected").length;


  const totalViews = 0;

  res.json({
    totalJobs,
    totalApplications,
    totalSelected,
    totalViews,
  });
});

module.exports = {
  getDashboard,
};
