import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div>
          <h2>VELORA</h2>
          <p>
            AI-powered job discovery,
            resume matching and scam detection.
          </p>
        </div>

        <div>
          <h3>Platform</h3>

          <Link to="/jobs">Jobs</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div>
          <h3>Resources</h3>

          <Link to="/upload-resume">
            Resume Upload
          </Link>

          <Link to="/recommendations">
            AI Recommendations
          </Link>

          <Link to="/profile">
            My Profile
          </Link>
        </div>

        <div>
          <h3>Contact</h3>

          <a href="mailto:support@velora.com">
            support@velora.com
          </a>

          <p>India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 VELORA • AI-Powered Career Intelligence
      </p>
    </footer>
  );
}

export default Footer;