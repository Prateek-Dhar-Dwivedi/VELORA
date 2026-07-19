import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadResume = async () => {
    if (!file) {
      return toast.error("Select a PDF first");
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/resume`,
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Resume Uploaded Successfully");
      toast.success("Resume Uploaded");

      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-card">
        <h1>📄 Resume Upload</h1>

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
            <h3>📁 Upload Resume</h3>

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
        >
          Upload Resume
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