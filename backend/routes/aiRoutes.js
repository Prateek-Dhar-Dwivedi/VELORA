const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Job = require("../models/Job");
const auth = require("../middleware/authMiddleware");

router.get("/match/:jobId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    const userSkills =
      user.skills.toLowerCase().split(",");

    const jobText = `
      ${job.title}
      ${job.description}
    `.toLowerCase();

    let matches = 0;

    userSkills.forEach((skill) => {
      if (jobText.includes(skill.trim())) {
        matches++;
      }
    });

    const score = Math.round(
      (matches / userSkills.length) * 100
    );

    res.json({ score });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// RECOMMENDED JOBS
// ===============================
router.get(
  "/recommendations",
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const skills =
        user.skills
          ?.toLowerCase()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];


      const jobs = await Job.find();


      const recommendations = jobs
        .map((job) => {

          const jobText = `
            ${job.title}
            ${job.description}
          `.toLowerCase();


          let matches = 0;


          skills.forEach((skill) => {
            if (jobText.includes(skill)) {
              matches++;
            }
          });


          const matchScore =
            skills.length > 0
              ? Math.round(
                  (matches / skills.length) * 100
                )
              : 0;


          return {
            ...job.toObject(),
            matchScore,
          };

        })
        .filter((job) => job.matchScore > 0)
        .sort(
          (a,b) => b.matchScore - a.matchScore
        );


      res.json(recommendations);


    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

module.exports = router;