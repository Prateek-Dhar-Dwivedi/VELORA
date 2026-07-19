import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import "./Jobs.css";
import { toast } from "react-toastify";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minTrustScore, setMinTrustScore] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else if (
          Array.isArray(res.data.jobs)
        ) {
          setJobs(res.data.jobs);
        } else {
          setJobs([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const syncJobs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/jobs/sync`
      );

      toast.success(
        `${res.data.imported} jobs imported`
      );

      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="jobs-page">

      <div className="jobs-header">
        <h1>🚀 Explore Opportunities</h1>

        <p>
          Discover verified jobs,
          AI-matched opportunities,
          and trusted companies.
        </p>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs, companies, locations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className="sync-btn"
          onClick={syncJobs}
        >
          🔄 Sync Jobs
        </button>
      </div>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={() =>
              setVerifiedOnly(
                !verifiedOnly
              )
            }
          />
          Verified Only
        </label>

        <select
          value={minTrustScore}
          onChange={(e) =>
            setMinTrustScore(
              Number(e.target.value)
            )
          }
        >
          <option value={0}>
            All Trust Scores
          </option>

          <option value={50}>
            50+
          </option>

          <option value={70}>
            70+
          </option>

          <option value={90}>
            90+
          </option>
        </select>
      </div>

      <div className="jobs-grid">
        {jobs
          .filter((job) => {
            const matchesSearch =
              job.title
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||
              job.company
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||
              job.location
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesVerified =
              !verifiedOnly ||
              job.isVerified;

            const matchesTrust =
              job.trustScore >=
              minTrustScore;

            return (
              matchesSearch &&
              matchesVerified &&
              matchesTrust
            );
          })
          .map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}
      </div>
    </div>
  );
}

export default Jobs;