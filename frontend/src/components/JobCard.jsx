import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./JobCard.css";

function JobCard({ job }) {
  const [matchScore, setMatchScore] =
    useState(null);

  useEffect(() => {
    const fetchMatchScore =
      async () => {
        try {
          const token =
            localStorage.getItem("token");

          if (!token) return;

          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/ai/match/${job._id}`,
            {
              headers: {
                authorization: token,
              },
            }
          );

          setMatchScore(res.data.score);
        } catch (err) {
          console.log(err);
        }
      };

    fetchMatchScore();
  }, [job._id]);

  const getTrustColor = (score) => {
    if (score >= 80) return "#16a34a";
    if (score >= 50) return "#f59e0b";
    return "#dc2626";
  };

  const applyJob = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/apply/${job._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      toast.success(
        "Added To Applications"
      );
    } catch (err) {
      toast.error(
        "Please Login First"
      );
    }
  };

  const saveJob = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/save/${job._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      toast.success("Job Saved");
    } catch (err) {
      toast.error(
        "Please Login First"
      );
    }
  };

  const reportJob = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/jobs/report/${job._id}`
      );

      toast.success(
        "Job Reported"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="job-card">

      <div className="job-header">
        <h2 style={{color:"black"}}>{job.title}</h2>

        <span
          className={
            job.isVerified
              ? "verified-badge"
              : "unverified-badge"
          }
        >
          {job.isVerified
            ? "Verified"
            : "Unverified"}
        </span>
      </div>

      <p>
        <strong>🏢 Company:</strong>{" "}
        <Link
          to={`/company/${job.company}`}
        >
          {job.company}
        </Link>
      </p>

      <p>
        <strong>📍 Location:</strong>{" "}
        {job.location}
      </p>

      <p>
        <strong>💰 Salary:</strong>{" "}
        {job.salary}
      </p>

      <p
        className="trust-score"
        style={{
          color: getTrustColor(
            job.trustScore
          ),
        }}
      >
        🛡 Trust Score:
        {" "}
        {job.trustScore}/100
      </p>

      {matchScore !== null && (
        <p className="match-score">
          🎯 Match Score:
          {" "}
          {matchScore}%
        </p>
      )}

      <div className="job-buttons">

        <Link
          to={`/job/${job._id}`}
        >
          <button className="job-btn primary-btn">
            View Details
          </button>
        </Link>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
        >
          <button className="job-btn primary-btn">
            Apply Now
          </button>
        </a>

        <button
          onClick={saveJob}
          className="job-btn secondary-btn"
        >
          Save Job
        </button>

        <button
          onClick={applyJob}
          className="job-btn secondary-btn"
        >
          Track
        </button>

        <button
          onClick={reportJob}
          className="job-btn danger-btn"
        >
          Report
        </button>

      </div>

    </div>
  );
}

export default JobCard;