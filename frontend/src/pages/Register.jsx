import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerUser = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      // Name validation
      if (!/^[A-Za-z\s]+$/.test(name)) {
        toast.error("Name should contain only letters");
        return;
      }

      // Email validation
      if (!email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Password validation
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      toast.success(
        "Registration Successful"
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account 🚀</h1>

        <p>
          Powered by AI. Driven by Your Ambition.
        </p>

        <input
          required
          type="text"
          placeholder="Full Name"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={registerUser}
          className="auth-btn"
        >
          Register
        </button>

        <p className="auth-link">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;