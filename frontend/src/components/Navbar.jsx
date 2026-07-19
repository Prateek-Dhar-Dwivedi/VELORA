import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaChartBar,
  FaUserCircle,
  FaRobot,
  FaFileUpload,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from "react-icons/fa";

import logo from "../velora.png";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <img src={logo} alt="VELORA Logo" />
        VELORA
      </Link>


      <div className="nav-links">

        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/jobs" className={({ isActive }) => isActive ? "active" : ""}>
          <FaBriefcase />
          Jobs
        </NavLink>

        <NavLink to="/recommendations" className={({ isActive }) => isActive ? "active" : ""}>
          <FaRobot />
          AI Jobs
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink to="/applications" className={({ isActive }) => isActive ? "active" : ""}>
          Applications
        </NavLink>

        <NavLink to="/upload-resume" className={({ isActive }) => isActive ? "active" : ""}>
          <FaFileUpload />
          Resume
        </NavLink>

      </div>


      <div className="nav-right">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>


        <NavLink
          to="/profile"
          className={({ isActive }) => isActive ? "active-icon" : ""}
        >
          <FaUserCircle />
        </NavLink>


        {!token ? (
          <>
            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="register-btn">
                Register
              </button>
            </Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;