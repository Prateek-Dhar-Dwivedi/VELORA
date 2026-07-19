import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import {
  Pie,
  Bar,
} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    verifiedJobs: 0,
    scamJobs: 0,
  });

  const [companies, setCompanies] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const statsRes =
          await axios.get(
            `${process.env.REACT_APP_API_URL}/api/jobs/stats`
          );

        setStats(statsRes.data);

        const companyRes =
          await axios.get(
            `${process.env.REACT_APP_API_URL}/api/jobs/top-companies`
          );

        console.log(
          "Top Companies:",
          companyRes.data
        );

        setCompanies(companyRes.data);
      } catch (err) {
        console.log(err);
      }
    };

  const pieData = {
    labels: [
      "Verified Jobs",
      "Scam Jobs",
      "Other Jobs",
    ],
    datasets: [
      {
        data: [
          stats.verifiedJobs,
          stats.scamJobs,
          stats.totalJobs -
          stats.verifiedJobs -
          stats.scamJobs,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#3b82f6",
        ],
        borderWidth: 2,
      },
    ],
  };

  const companyData = {
    labels: companies.map(
      (c) => c._id || "Unknown"
    ),
    datasets: [
      {
        label: "Jobs Available",
        data: companies.map(
          (c) => c.count
        ),
        backgroundColor:
          "rgba(59,130,246,0.7)",
      },
    ],
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-title">
        <h1>Velora Analytics</h1>
        <p>
          Analytics and platform insights
        </p>
      </div>

      <div className="dashboard-stats">

        <div className="stat-card">
          <h2>{stats.totalJobs}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{stats.verifiedJobs}</h2>
          <p>Verified Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{stats.scamJobs}</h2>
          <p>Scam Reports</p>
        </div>

      </div>

      <div className="chart-grid">

        <div className="chart-card">
          <h2>🥧 Job Distribution</h2>

          <div className="chart-container">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="chart-card">
          <h2>🏢 Top Hiring Companies</h2>

          <div className="chart-container">
            <Bar
              data={companyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

      </div>

      <div className="company-count">
        Companies Found: {companies.length}
      </div>

    </div>
  );
}

export default Dashboard;