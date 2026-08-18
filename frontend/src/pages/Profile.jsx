import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaRobot,
  FaFileAlt,
  FaEnvelope,
  FaCamera,
  FaSpinner,
} from "react-icons/fa";
import { API_URL } from "../api";
import "./Profile.css";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Profile() {

  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const getProfile = async () => {

      try {

        const res = await axios.get(
          `${API_URL}/api/user/profile`,
          {
            headers: {
              authorization: token
            }
          }
        );

        setUser(res.data);
        setSkills(res.data.skills || "");

      } catch (err) {
        console.log(err);
      }

    };

    getProfile();

  }, [token]);


  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file (JPG, PNG, WEBP)");
    }

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axios.post(
        `${API_URL}/api/upload/avatar`,
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Failed to upload profile picture"
      );
    } finally {
      setUploadingAvatar(false);
    }
  };


  const saveSkills = async () => {

    try {

      await axios.put(
        `${API_URL}/api/user/skills`,
        {
          skills
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      toast.success("Skills Updated");
      setSkills("");

    } catch (err) {
      toast.error("Update Failed");
    }

  };


  const sendAlert = async () => {

    try {

      await axios.post(
        `${API_URL}/api/user/job-alert`,
        {},
        {
          headers: {
            authorization: token
          }
        }
      );

      toast.success("Job Alert Sent");

    } catch (err) {
      toast.error("Alert Failed");
    }

  };


  if (!user) {
    return <Loader />;
  }


  return (

    <div className="profile-container">

      <div className="profile-left">

        <div className="avatar-wrapper">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name || "Profile DP"} />
            ) : (
              <FaUser />
            )}
            {uploadingAvatar && (
              <div className="avatar-loading-overlay">
                <FaSpinner className="spin-icon" />
              </div>
            )}
          </div>

          <label className="avatar-edit-btn" title="Change Profile Picture">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarUpload}
              disabled={uploadingAvatar}
            />
          </label>
        </div>

        <h1>{user.name}</h1>

        <p>{user.email}</p>


        <div className="mini-stats">

          <div>
            <h2>{user.savedJobs?.length || 0}</h2>
            <p>Saved</p>
          </div>

          <div>
            <h2>{user.applications?.length || 0}</h2>
            <p>Applied</p>
          </div>

        </div>

      </div>


      <div className="profile-right">


        <div className="glass-card">

          <h2><FaFileAlt style={{ marginRight: "8px" }} />Resume</h2>

          {
            user.resumeUrl ?

              <a
                href={`${API_URL}/api/upload/resume/view?token=${token}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume →
              </a>

              :

              <p>No Resume Uploaded</p>

          }

        </div>


        <div className="glass-card">

          <h2>Skills Intelligence</h2>


          <div className="skill-tags">

            {
              skills.split(",").filter(Boolean).map((skill, index) => (

                <span key={index}>
                  {skill}
                </span>

              ))
            }

          </div>


          <textarea
            placeholder="Add skills: React, Node, AI..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />


          <div className="actions">

            <button onClick={saveSkills}>
              Save Skills
            </button>

            <button onClick={sendAlert}>
              <FaEnvelope style={{ marginRight: "6px" }} />Job Alert
            </button>

          </div>

        </div>


      </div>

    </div>

  );

}

export default Profile;