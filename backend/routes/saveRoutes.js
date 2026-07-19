const express = require("express");
const router = express.Router();

router.post("/:jobId", (req, res) => {
  res.json({
    success: true,
    message: "Job Saved"
  });
});

module.exports = router;