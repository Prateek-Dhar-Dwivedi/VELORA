import "./Hero.css";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">
          🚀 AI-Powered Career Platform
        </span>
        <h1>
          Find Trusted Jobs.
          <br />
          Match Your Resume.
          <br />
          Get Hired Faster.
        </h1>

        <p>
          Velora helps you discover
          verified opportunities through
          AI-powered resume matching,
          career insights, scam detection,
          and intelligent recommendations.
        </p>

        <div className="hero-buttons">
          <Link to="/jobs">
            <button className="primary-btn">
              Explore Jobs
            </button>
          </Link>

          <Link to="/profile">
            <button className="secondary-btn">
              Upload Resume
            </button>
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="dashboard-card">
          <h3>🎯 AI Match Score</h3>
          <h1>94%</h1>
          <p>React Developer</p>
        </div>

        <div className="mini-card">
          <FaShieldAlt />
          <div>
            <h4>Trust Score</h4>
            <p>96 / 100</p>
          </div>
        </div>

        <div className="mini-card">
          <FaRobot />
          <div>
            <h4>AI Recommendation</h4>
            <p>MERN Developer</p>
          </div>
        </div>

        <div className="mini-card">
          <FaFileAlt />
          <div>
            <h4>Resume Analysis</h4>
            <p>React • Node • MongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;