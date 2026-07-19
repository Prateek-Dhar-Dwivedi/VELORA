const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const Job = require("../models/Job");

router.get("/recommended-jobs", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const skills = user.skills
      .toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const jobs = await Job.find();

    const recommendations = jobs.map((job) => {

      let matches = 0;

      const text = `
${job.title}
${job.description || ""}
`.toLowerCase();

      skills.forEach((skill) => {
        if (text.includes(skill)) {
          matches++;
        }
      });

      const matchScore = skills.length
        ? Math.round((matches / skills.length) * 100)
        : 0;

      return {
        ...job.toObject(),
        matchScore
      };

    });

    recommendations.sort((a, b) => b.matchScore - a.matchScore);


    res.json(recommendations.slice(0, 10));

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

const sendEmail =
  require("../utils/sendEmail");

// SEND JOB ALERT
router.post(
  "/job-alert",
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.id
      );

      const jobs = await Job.find()
        .sort({ trustScore: -1 })
        .limit(10);

      let html = `
      <div style="font-family:Arial,sans-serif">
        <h2>🚀 JobShield Weekly Job Alert</h2>

        <p>Hello ${user.name},</p>

        <p>Here are the latest trusted opportunities selected for you:</p>

        <hr/>
      `;

      jobs.forEach((job) => {
        html += `
        <div style="margin-bottom:20px;">
          <h3>${job.title}</h3>

          <p>
            <strong>Company:</strong>
            ${job.company}
          </p>

          <p>
            <strong>Location:</strong>
            ${job.location}
          </p>

          <p>
            <strong>Salary:</strong>
            ${job.salary}
          </p>

          <p>
            <strong>Trust Score:</strong>
            ${job.trustScore}/100
          </p>

          <a href="${job.applyUrl}">
            Apply Now
          </a>

          <hr/>
        </div>
        `;
      });

      html += `
        <p>
          Good luck with your applications.
        </p>

        <p>
          Team JobShield ❤️
        </p>
      </div>
      `;

      await sendEmail(
        user.email,
        "🚀 Latest Job Opportunities from JobShield",
        html
      );

      res.json({
        success: true,
        message:
          "Job Alert Sent Successfully",
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// UPDATE STATUS
router.put(
  "/application/:applicationId",
  auth,
  async (req, res) => {
    try {
      const { status } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const application =
        user.applications.id(
          req.params.applicationId
        );

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }

      application.status =
        status;

      await user.save();

      res.json({
        message:
          "Status Updated",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// GET USER APPLICATIONS
router.get(
  "/applications",
  auth,
  async (req, res) => {
    const user =
      await User.findById(
        req.user.id
      ).populate(
        "applications.job"
      );

    res.json(
      user.applications
    );
  }
);


// JOB TRACKING
router.post(
  "/apply/:jobId",
  auth,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      user.applications.push({
        job: req.params.jobId,
        status: "Applied",
      });

      await user.save();

      res.json({
        message:
          "Application Saved",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// UPDATE USER SKILLS
router.put("/skills", auth, async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET USER PROFILE
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("savedJobs");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// SAVE JOB
router.post("/save/:jobId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.savedJobs.includes(req.params.jobId)) {
      user.savedJobs.push(req.params.jobId);
      await user.save();
    }

    res.json({
      message: "Job Saved",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// REMOVE SAVED JOB
router.delete(
  "/save/:jobId",
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.id
      );

      user.savedJobs =
        user.savedJobs.filter(
          (job) =>
            job.toString() !==
            req.params.jobId
        );

      await user.save();

      res.json({
        message: "Job Removed",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);


// GET SAVED JOBS
router.get("/saved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("savedJobs");

    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;