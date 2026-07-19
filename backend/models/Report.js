const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    salary: String,
    description: String,
    applyUrl: String,
    source: String,

    category: {
      type: String,
      default: "Software"
    },

    employmentType: String,
    postedDate: String,

    trustScore: {
      type: Number,
      default: 70
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);