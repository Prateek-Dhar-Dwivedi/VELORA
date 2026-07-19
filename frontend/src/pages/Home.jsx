import { Link } from "react-router-dom";
import "./Home.css";

import Features from "../components/Features";
import Stats from "../components/Stats";
import Footer from "../pages/Footer";
import { TypeAnimation } from "react-type-animation";

import {
  FaShieldAlt,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <div className="welcome-text">
            <h3>Welcome to <strong>VELORA</strong></h3>
          </div>
          <h1>
            <TypeAnimation
              sequence={[
                "Find Trusted Jobs.",
                1000,
                "Match Your Resume.",
                1000,
                "Get AI Powered Recommendations.",
                1000
              ]}
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <p>
            VELORA is your AI-powered career companion, helping you find trusted opportunities, optimize your resume, and land the right job faster.
          </p>

          <div className="buttons">
            <Link to="/jobs">
              <button className="primary-btn">
                Explore Jobs
              </button>
            </Link>

            <Link to="/upload-resume">
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

      {/* Trusted Companies */}
      <section className="trusted">
        <div className="trusted-header">
          <span>TRUSTED BY INDUSTRY LEADERS</span>

          <h2>
            Top Companies Hiring Through
            <span> VELORA</span>
          </h2>

          <p>
            Discover opportunities from
            the world's leading companies.
          </p>
        </div>

        <div className="company-grid">

          <div className="company-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
            />
  
          </div>

          <div className="company-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
            />
        
          </div>

          <div className="company-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
            />
  
          </div>

          <div className="company-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
              alt="Meta"
            />
          </div>

          <div className="company-card">
            <img
              src="https://www.adobe.com/federal/assets/svgs/adobe-logo.svg"
              alt="Adobe"
            />

          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Statistics */}
      <Stats />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;