import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobDetails.css";
import Loader from "../components/Loader";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] =
    useState(null);

  useEffect(() => {
    const fetchJob =
      async () => {
        const res =
          await axios.get(
            `${process.env.REACT_APP_API_URL}/api/jobs/${id}`
          );

        setJob(res.data);
      };

    fetchJob();
  }, [id]);

  if (!job) {
    return <Loader />;
  }

  return (
    <div className="job-details-page">

      <div className="job-header">

        <div>
          <h1>{job.title}</h1>

          <h3>
            🏢 {job.company}
          </h3>

          <p>
            📍 {job.location}
          </p>
        </div>

        <div className="trust-box">
          <h2>
            {job.trustScore}/100
          </h2>

          <span>
            Trust Score
          </span>
        </div>

      </div>

      <div className="job-info-grid">

        <div className="info-card">
          <h4>Salary</h4>

          <p>
            💰 {job.salary}
          </p>
        </div>

        <div className="info-card">
          <h4>Status</h4>

          <p>
            {job.isVerified
              ? "✅ Verified"
              : "⚠️ Unverified"}
          </p>
        </div>

      </div>

      <div className="description-card">

        <h2>
          Job Description
        </h2>

        <div
          dangerouslySetInnerHTML={{
            __html:
              job.description,
          }}
        />

      </div>

      <a
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
      >
        <button className="apply-btn">
          🚀 Apply Now
        </button>
      </a>

    </div>
  );
}

export default JobDetails;