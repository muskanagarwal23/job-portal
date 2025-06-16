const asyncHandler = require("express-async-handler");
const Job = require("../models/jobmodel");
const Application = require("../models/Application");
const User = require("../models/user");

const getDashboard = asyncHandler(async (req, res) => {
  const employerId = req.user._id;
  console.log("Employer ID:", employerId);

  const jobs = await Job.find({ employer: employerId });
  console.log("Jobs found:", jobs);

  const totalJobs = jobs.length;

  const jobIds = jobs.map((job) => job._id);

  const applications = await Application.find({ job: { $in: jobIds } });

  const totalApplications = applications.length;
  const totalSelected = applications.filter(
    (app) => app.status === "selected"
  ).length;

  const totalViews = 0;
  const employer = await User.findById(employerId).select(
    "name email companyEmail"
  );

  res.json({
    totalJobs,
    totalApplications,
    totalSelected,
    totalViews,
    employer: {
      name: employer.name,
      email: employer.email,
    },
  });
});

module.exports = {
  getDashboard,
};
