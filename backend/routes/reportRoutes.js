const express = require("express");
const router = express.Router();

const Report = require("../models/Report");
const Job = require("../models/Job");

router.post("/", async (req, res) => {
  try {
    const { jobId, reason, description } =
      req.body;

    await Report.create({
      jobId,
      reason,
      description,
    });

    const job = await Job.findById(jobId);

    if (job) {
      job.trustScore = Math.max(
        0,
        job.trustScore - 10
      );

      await job.save();
    }

    res.json({
      message: "Report Submitted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;