const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");
const calculateTrustScore = require("../utils/scamDetector");


// ===============================
// TOP COMPANIES
// ===============================
router.get("/top-companies", async (req, res) => {
  try {
    const companies = await Job.aggregate([
      {
        $group: {
          _id: "$company",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(companies);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// GET JOB STATS
// ===============================
router.get("/stats", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const verifiedJobs = await Job.countDocuments({
      isVerified: true,
    });

    const scamJobs = await Job.countDocuments({
      trustScore: { $lt: 50 },
    });

    res.json({
      totalJobs,
      verifiedJobs,
      scamJobs,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// REPORT JOB
// ===============================
router.post("/report/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.trustScore = Math.max(
      0,
      job.trustScore - 10
    );

    await job.save();

    res.json({
      message: "Job reported successfully",
      trustScore: job.trustScore,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// ===============================
// GET ALL JOBS
// ===============================
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// ===============================
// SYNC JOBS FROM JOOBLE
// ===============================
router.get("/sync", async (req, res) => {
  try {
    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: "software developer",
        location: "India",
      }
    );

    const jobs = response.data.jobs || [];
    let imported = 0;

    for (const job of jobs) {
      await Job.findOneAndUpdate(
        {
          title: job.title,
          company: job.company,
        },
        {
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary || "Not Specified",
          description: job.snippet,
          applyUrl: job.link,
          source: job.source,
          employmentType: job.type,
          postedDate: job.updated,

          trustScore: calculateTrustScore({
            title: job.title,
            description: job.snippet,
            company: job.company,
            salary: job.salary,
          }),

          isVerified: [
            "Google",
            "Microsoft",
            "Amazon",
            "Meta",
            "Apple",
            "Mastercard",
            "Wikimedia Foundation",
          ].includes(job.company),
        },
        {
          upsert: true,
          new: true,
        }
      );

      imported++;
    }

    res.json({
      success: true,
      imported,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// ===============================
// COMPANY JOBS
// ===============================
router.get("/company/:name", async (req, res) => {
  try {
    const jobs = await Job.find({
      company: req.params.name,
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// GET SINGLE JOB
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


module.exports = router;