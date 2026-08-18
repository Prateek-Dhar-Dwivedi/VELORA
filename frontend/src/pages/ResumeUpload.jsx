import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaFileUpload, FaFolderOpen } from "react-icons/fa";
import { API_URL } from "../api";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      return toast.error("Please select a PDF file first");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please log in first before uploading a resume");
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("resume", file);

      console.log("Posting resume to:", `${API_URL}/api/upload/resume`);
      const res = await axios.post(
        `${API_URL}/api/upload/resume`,
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Trigger automatic skills extraction
      try {
        await axios.post(
          `${API_URL}/api/upload/extract-skills`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );
      } catch (skillErr) {
        console.log("Skill extraction warning:", skillErr);
      }

      setMessage("Resume uploaded and analyzed successfully!");
      toast.success("Resume Uploaded Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Upload Failed. Please ensure your file is a valid PDF.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-card">
        <h1><FaFileUpload style={{ marginRight: "8px" }} />Resume Upload</h1>

        <p>
          Upload your resume and unlock AI-powered
          job recommendations.
        </p>

        <label className="upload-box">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <div className="upload-content">
            <h3><FaFolderOpen style={{ marginRight: "8px" }} />Upload Resume</h3>

            <p>
              {file
                ? file.name
                : "Click here to choose a PDF"}
            </p>
          </div>
        </label>

        <button
          className="upload-btn"
          onClick={uploadResume}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Uploading & Analyzing..." : "Upload Resume"}
        </button>

        {message && (
          <p className="success-msg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;