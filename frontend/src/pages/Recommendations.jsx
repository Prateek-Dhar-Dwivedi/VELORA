import { useEffect, useState } from "react";
import axios from "axios";
import "./Recommendations.css";

function Recommendations() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/recommended-jobs`,
        {
          headers: {
            authorization: token
          }
        }
      );

      setJobs(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="recommend-page">

      <div className="recommend-header">
        <h1>🤖 AI Job Recommendations</h1>
        <p>Jobs matched specially for your skills and profile</p>
      </div>


      <div className="job-grid">

        {
          jobs.length === 0 ?

            <div className="empty-box">
              <h2>No Recommendations Found</h2>
              <p>Upload your resume and update your skills to get AI matches.</p>
            </div>

            :

            jobs.map((job) => (

              <div className="job-card" key={job._id}>

                <div className="card-top">

                  <div>
                    <h2>{job.title}</h2>
                    <p className="company">🏢 {job.company}</p>
                  </div>

                  <div className="match-box">
                    <p>🎯 Match Score: {job.matchScore ?? 0}%</p>

                    <div className="match-bar">
                      <div
                        className="match-fill"
                        style={{
                          width: `${job.matchScore ?? 0}%`
                        }}
                      ></div>
                    </div>

                  </div>

                </div>


                <div className="job-info">

                  <p>📍 {job.location || "Remote"}</p>

                  <p>💼 {job.employmentType || "Full Time"}</p>

                  <p>💰 {job.salary || "Not Specified"}</p>

                  <p>🛡 Trust Score: {job.trustScore || 0}/100</p>

                </div>


                <button
                  className="apply-btn"
                  onClick={() => {
                    if (job.applyUrl) {
                      window.open(job.applyUrl, "_blank");
                    } else {
                      alert("Application link not available");
                    }
                  }}
                >
                  View Job →
                </button>


              </div>

            ))

        }

      </div>

    </div>
  );

}

export default Recommendations;