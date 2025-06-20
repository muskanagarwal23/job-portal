const express = require("express");
const router = express.Router();
const Job = require("../models/jobmodel");
const { protect, authorize } = require("../middleware/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const { getJobById } = require("../controllers/jobController");

router.post(
  "/",
  protect,
  authorize("employer"),
  catchAsync(async (req, res) => {
    const {
      category,
      title,
      description,
      salary,
      jobType,
      location,
      benefits,
      skills,
      education,
      ...rest
    } = req.body;

    
    const formattedSkills =
      typeof skills === "string"
        ? skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : Array.isArray(skills)
        ? skills
        : [];

    const formattedEducation =
      typeof education === "string"
        ? education
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean)
        : Array.isArray(education)
        ? education
        : [];

    
    const job = new Job({
      category,
      title,
      description,
      salary,
      jobType,
      location,
      benefits,
      skills: formattedSkills,
      education: formattedEducation,
      employer: req.user._id, 
      ...rest,
    });

    await job.save();

    res.status(201).json({ message: "Job posted successfully", job });
  })
);

router.get(
  "/employer",
  protect,
  authorize("employer"),
  catchAsync(async (req, res) => {
    const employerId = req.user._id;
    const jobs = await Job.find({ employer: employerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  })
);


router.get(
  "/",
  catchAsync(async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  })
);


router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  })
);

router.delete(
  "/:id",
  protect,
  authorize("employer"),
  catchAsync(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  })
);
module.exports = router;
