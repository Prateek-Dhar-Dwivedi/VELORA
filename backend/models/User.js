const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skills: {
    type: String,
    default: "",
  },

  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  resumeUrl: {
    type: String,
    default: "",
  },
  
  applications: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },

      status: {
        type: String,
        default: "Applied",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);