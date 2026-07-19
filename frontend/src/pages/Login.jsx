import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Auth.css";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login Successful"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Welcome Back 👋</h1>

        <p>
          Login to continue your
          VELORA journey
        </p>

        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={loginUser}
          className="auth-btn"
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account?
          <Link to="/register">
            Register
          </Link>
        </p>

        <div className="google-login">
          <GoogleLogin
            onSuccess={async (
              credentialResponse
            ) => {
              try {
                const res = await axios.post(
                  `${process.env.REACT_APP_API_URL}/api/auth/google`,
                  {
                    credential:
                      credentialResponse.credential,
                  }
                );

                localStorage.setItem(
                  "token",
                  res.data.token
                );

                toast.success(
                  "Google Login Successful"
                );

                window.location.href = "/";
              } catch (err) {
                console.log(err);

                toast.error(
                  "Google Login Failed"
                );
              }
            }}
            onError={() => {
              toast.error(
                "Google Login Failed"
              );
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Login;