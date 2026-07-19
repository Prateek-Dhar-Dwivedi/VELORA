import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./SavedJobs.css";

function SavedJobs() {
  const [jobs, setJobs] =
    useState([]);

  const removeJob = async (
    jobId
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/save/${jobId}`,
        {
          headers: {
            authorization:
              token,
          },
        }
      );

      setJobs(
        jobs.filter(
          (job) =>
            job._id !== jobId
        )
      );

      toast.success(
        "Job Removed"
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to remove job"
      );
    }
  };

  useEffect(() => {
    const fetchSaved =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(
              `${process.env.REACT_APP_API_URL}/api/user/saved`,
              {
                headers: {
                  authorization:
                    token,
                },
              }
            );

          setJobs(res.data);
        } catch (err) {
          console.log(err);
        }
      };

    fetchSaved();
  }, []);

  return (
    <div className="saved-page">

      <h1>
        ❤️ Saved Jobs
      </h1>

      <p>
        Your favorite job
        opportunities in one
        place.
      </p>

      {jobs.length === 0 ? (
        <div className="empty-state">
          No Saved Jobs Yet
        </div>
      ) : (
        <div className="saved-grid">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="saved-card"
            >
              <h3>
                {job.title}
              </h3>

              <p>
                🏢 {job.company}
              </p>

              <p>
                📍 {job.location}
              </p>

              <button
                className="remove-btn"
                onClick={() =>
                  removeJob(
                    job._id
                  )
                }
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SavedJobs;