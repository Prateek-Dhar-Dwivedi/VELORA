import { useEffect, useState } from "react";
import axios from "axios";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/applications`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      setApplications(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    applicationId,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/application/${applicationId}`,
        { status },
        {
          headers: {
            authorization: token,
          },
        }
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1>📝 My Applications</h1>
        <p>
          Track your job application journey
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h2>No applications yet</h2>
          <p>
            Apply to jobs and they will appear here.
          </p>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => (
            <div
              key={app._id}
              className="application-card"
            >
              <h3>
                {app.job?.title || "Job Title"}
              </h3>

              <p>
                🏢{" "}
                {app.job?.company ||
                  "Company"}
              </p>

              <div className="status-section">
                <span
                  className={`status-badge ${app.status.toLowerCase()}`}
                >
                  {app.status}
                </span>
                <label>Status</label>

                <select
                  value={app.status}
                  onChange={(e) =>
                    updateStatus(
                      app._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                  <option value="Selected">
                    Selected
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;