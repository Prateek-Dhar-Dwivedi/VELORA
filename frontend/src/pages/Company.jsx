import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/JobCard";
import "./Company.css";

function Company() {
  const { name } = useParams();

  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {
    const fetchCompanyJobs =
      async () => {
        try {
          const res =
            await axios.get(
              `${process.env.REACT_APP_API_URL}/api/jobs/company/${name}`
            );

          setJobs(res.data);
        } catch (err) {
          console.log(err);
        }
      };

    fetchCompanyJobs();
  }, [name]);

  return (
    <div className="company-page">

      <div className="company-banner">

        <div className="company-logo">
          🏢
        </div>

        <div>
          <h1>{name}</h1>

          <p>
            Explore all job
            opportunities from
            this company.
          </p>
        </div>

      </div>

      <div className="company-stats">

        <div className="company-stat-card">
          <h2>
            {jobs.length}
          </h2>

          <p>
            Open Positions
          </p>
        </div>

        <div className="company-stat-card">
          <h2>
            Active
          </h2>

          <p>
            Hiring Status
          </p>
        </div>

      </div>

      <h2 className="jobs-title">
        Available Jobs
      </h2>

      <div className="company-jobs">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>

    </div>
  );
}

export default Company;