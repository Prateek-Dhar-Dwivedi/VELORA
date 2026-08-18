const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const { PDFParse } = require("pdf-parse");
const axios = require("axios");
const extractSkills = require("../utils/extractSkills");

router.post(
  "/extract-skills",
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user || !user.resumeUrl) {
        return res.status(400).json({
          error: "Resume not uploaded",
        });
      }

      const response = await axios.get(
        user.resumeUrl,
        {
          responseType: "arraybuffer",
        }
      );

      const parser = new PDFParse(new Uint8Array(response.data));
      const parsed = await parser.getText();
      const rawText = typeof parsed === "string" ? parsed : (parsed.text || "");
      const skills = extractSkills(rawText);

      user.skills = skills.join(", ");
      await user.save();

      res.json({
        skills,
      });
    } catch (err) {
      console.error("Extract skills error:", err);
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "avatar") {
            if (
                file.mimetype.startsWith("image/") ||
                file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/i)
            ) {
                cb(null, true);
            } else {
                cb(new Error("Only image files (JPG, PNG, WEBP) are allowed for DP"));
            }
        } else {
            if (
                file.mimetype === "application/pdf" ||
                file.originalname.toLowerCase().endsWith(".pdf")
            ) {
                cb(null, true);
            } else {
                cb(new Error("Only PDF files are allowed for resume"));
            }
        }
    },
});

// Helper for uploading buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, originalName, folder = "jobshield-resumes", resourceType = "raw") => {
    return new Promise((resolve, reject) => {
        const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const options = {
            folder,
            resource_type: resourceType,
            public_id: `${Date.now()}-${cleanName}`,
        };
        if (resourceType === "image") {
            options.transformation = [
                { width: 400, height: 400, crop: "fill", gravity: "face" }
            ];
        }
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

// Upload Resume
router.post(
    "/resume",
    auth,
    (req, res, next) => {
        upload.single("resume")(req, res, (err) => {
            if (err) {
                console.error("Multer error:", err);
                return res.status(400).json({ error: err.message || "File upload error" });
            }
            next();
        });
    },
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file was uploaded" });
            }

            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            console.log("Uploading file to Cloudinary:", req.file.originalname);
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.originalname, "jobshield-resumes", "raw");
            console.log("Cloudinary upload successful:", cloudinaryResult.secure_url);

            user.resumeUrl = cloudinaryResult.secure_url || cloudinaryResult.url;

            // Extract skills directly from the uploaded buffer in memory
            try {
                const parser = new PDFParse(new Uint8Array(req.file.buffer));
                const parsed = await parser.getText();
                const rawText = typeof parsed === "string" ? parsed : (parsed.text || "");
                const skills = extractSkills(rawText);
                if (skills && skills.length > 0) {
                    user.skills = skills.join(", ");
                    console.log("Extracted skills from resume:", user.skills);
                }
            } catch (parseErr) {
                console.error("Direct PDF parsing error during upload:", parseErr);
            }

            await user.save();

            res.json({
                success: true,
                resumeUrl: user.resumeUrl,
                skills: user.skills,
            });
        } catch (err) {
            console.error("UPLOAD ERROR:", err);
            res.status(500).json({
                error: err.message || "Failed to upload resume to Cloudinary",
            });
        }
    }
);

// Upload Avatar / DP (Display Picture)
router.post(
    "/avatar",
    auth,
    (req, res, next) => {
        upload.single("avatar")(req, res, (err) => {
            if (err) {
                console.error("Avatar upload multer error:", err);
                return res.status(400).json({ error: err.message || "Avatar upload error" });
            }
            next();
        });
    },
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No image was uploaded" });
            }

            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            console.log("Uploading avatar to Cloudinary:", req.file.originalname);
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.originalname, "jobshield-avatars", "image");
            console.log("Avatar upload successful:", cloudinaryResult.secure_url);

            user.avatar = cloudinaryResult.secure_url || cloudinaryResult.url;
            await user.save();

            res.json({
                success: true,
                avatar: user.avatar,
            });
        } catch (err) {
            console.error("AVATAR UPLOAD ERROR:", err);
            res.status(500).json({
                error: err.message || "Failed to upload profile picture",
            });
        }
    }
);

// View Resume (Generates signed Cloudinary download URL)
router.get("/resume/view", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.resumeUrl) {
            return res.status(404).send("Resume not found or not uploaded yet.");
        }

        const match = user.resumeUrl.match(/jobshield-resumes\/(.+)$/);
        if (match) {
            const publicId = `jobshield-resumes/${match[1]}`;
            const signedUrl = cloudinary.utils.private_download_url(
                publicId,
                "pdf",
                {
                    resource_type: "raw",
                    type: "upload",
                    expires_at: Math.floor(Date.now() / 1000) + 3600,
                }
            );
            return res.redirect(signedUrl);
        }

        return res.redirect(user.resumeUrl);
    } catch (err) {
        console.error("Resume view error:", err);
        res.status(500).send("Error loading resume");
    }
});

router.get("/resume/view/:userId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || !user.resumeUrl) {
            return res.status(404).send("Resume not found");
        }

        const match = user.resumeUrl.match(/jobshield-resumes\/(.+)$/);
        if (match) {
            const publicId = `jobshield-resumes/${match[1]}`;
            const signedUrl = cloudinary.utils.private_download_url(
                publicId,
                "pdf",
                {
                    resource_type: "raw",
                    type: "upload",
                    expires_at: Math.floor(Date.now() / 1000) + 3600,
                }
            );
            return res.redirect(signedUrl);
        }

        return res.redirect(user.resumeUrl);
    } catch (err) {
        console.error("Resume view error:", err);
        res.status(500).send("Error loading resume");
    }
});

module.exports = router;