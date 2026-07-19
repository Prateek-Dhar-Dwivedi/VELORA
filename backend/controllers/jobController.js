const axios = require("axios");
const Job = require("../models/Job");

const syncJobs = async (req, res) => {
  try {
    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: "software developer",
        location: "India",
      }
    );

    const jobs = response.data.jobs || [];

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
          source: "Jooble",
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      jobsImported: jobs.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { syncJobs };