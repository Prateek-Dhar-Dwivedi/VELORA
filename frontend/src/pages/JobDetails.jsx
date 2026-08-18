import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
} from "react-icons/fa";
import { API_URL } from "../api";
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
            `${API_URL}/api/jobs/${id}`
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
            <FaBuilding style={{ marginRight: "6px" }} />{job.company}
          </h3>

          <p>
            <FaMapMarkerAlt style={{ marginRight: "6px" }} />{job.location}
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
            <FaMoneyBillWave style={{ marginRight: "6px" }} />{job.salary}
          </p>
        </div>

        <div className="info-card">
          <h4>Status</h4>

          <p>
            {job.isVerified ? (
              <span style={{ color: "#16a34a" }}>
                <FaCheckCircle style={{ marginRight: "6px" }} />Verified
              </span>
            ) : (
              <span style={{ color: "#f59e0b" }}>
                <FaExclamationTriangle style={{ marginRight: "6px" }} />Unverified
              </span>
            )}
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
          <FaRocket style={{ marginRight: "8px" }} />Apply Now
        </button>
      </a>

    </div>
  );
}

export default JobDetails;