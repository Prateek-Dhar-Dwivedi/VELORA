import "./Features.css";
import {
  FaShieldAlt,
  FaRobot,
  FaFileAlt,
  FaBell,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features">
      <h2>Why Choose JobShield?</h2>

      <div className="features-grid">

        <div className="feature-card">
          <FaShieldAlt />
          <h3>Scam Detection</h3>
          <p>
            Detect suspicious job
            postings before applying.
          </p>
        </div>

        <div className="feature-card">
          <FaRobot />
          <h3>AI Recommendations</h3>
          <p>
            Get jobs matched to
            your skills automatically.
          </p>
        </div>

        <div className="feature-card">
          <FaFileAlt />
          <h3>Resume Analysis</h3>
          <p>
            Improve your profile
            and increase hiring chances.
          </p>
        </div>

        <div className="feature-card">
          <FaBell />
          <h3>Email Alerts</h3>
          <p>
            Receive instant updates
            about relevant jobs.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;