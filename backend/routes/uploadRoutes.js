const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const pdf = require("pdf-parse");
const axios = require("axios");
const extractSkills = require("../utils/extractSkills");


router.post(
  "/extract-skills",
  auth,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      if (!user.resumeUrl) {
        return res.status(400).json({
          error:
            "Resume not uploaded",
        });
      }

      const response =
        await axios.get(
          user.resumeUrl,
          {
            responseType:
              "arraybuffer",
          }
        );

      const data =
        await pdf(response.data);

      const skills =
        extractSkills(data.text);

      user.skills =
        skills.join(", ");

      await user.save();

      res.json({
        skills,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "jobshield-resumes",
        resource_type: "raw",
        allowed_formats: ["pdf"],
    },
});

const upload = multer({
    storage,
});

// Upload Resume
router.post(
    "/resume",
    auth,
    upload.single("resume"),
    async (req, res) => {
        try {
            const user = await User.findById(
                req.user.id
            );

            user.resumeUrl = req.file.path;

            await user.save();

            res.json({
                success: true,
                resumeUrl: user.resumeUrl,
            });
        } catch (err) {
            console.error("UPLOAD ERROR:", err);

            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
        }
    }
);

module.exports = router;