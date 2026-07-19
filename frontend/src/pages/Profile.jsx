import {useEffect,useState} from "react";
import axios from "axios";
import "./Profile.css";
import {toast} from "react-toastify";
import Loader from "../components/Loader";

function Profile(){

const [user,setUser]=useState(null);
const [skills,setSkills]=useState("");

const token=localStorage.getItem("token");

useEffect(()=>{

const getProfile=async()=>{

try{

const res=await axios.get(
`${process.env.REACT_APP_API_URL}/api/user/profile`,
{
headers:{
authorization:token
}
}
);

setUser(res.data);
setSkills(res.data.skills||"");

}catch(err){
console.log(err);
}

};

getProfile();

},[token]);


const saveSkills=async()=>{

try{

await axios.put(
`${process.env.REACT_APP_API_URL}/api/user/skills`,
{
skills
},
{
headers:{
authorization:token
}
}
);

toast.success("Skills Updated");
setSkills("");

}catch(err){
toast.error("Update Failed");
}

};


const sendAlert=async()=>{

try{

await axios.post(
`${process.env.REACT_APP_API_URL}/api/user/job-alert`,
{},
{
headers:{
authorization:token
}
}
);

toast.success("Job Alert Sent");

}catch(err){
toast.error("Alert Failed");
}

};


if(!user){
return <Loader/>;
}


return(

<div className="profile-container">

<div className="profile-left">

<div className="profile-avatar">
👤
</div>

<h1>{user.name}</h1>

<p>{user.email}</p>

<div className="ai-badge">
🤖 AI Career Profile
</div>


<div className="mini-stats">

<div>
<h2>{user.savedJobs?.length||0}</h2>
<p>Saved</p>
</div>

<div>
<h2>{user.applications?.length||0}</h2>
<p>Applied</p>
</div>

</div>

</div>


<div className="profile-right">


<div className="glass-card">

<h2>📄 Resume</h2>

{
user.resumeUrl?

<a
href={user.resumeUrl}
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

<h2>🚀 Skills Intelligence</h2>


<div className="skill-tags">

{
skills.split(",").filter(Boolean).map((skill,index)=>(

<span key={index}>
{skill}
</span>

))
}

</div>


<textarea
placeholder="Add skills: React, Node, AI..."
value={skills}
onChange={(e)=>setSkills(e.target.value)}
/>


<div className="actions">

<button onClick={saveSkills}>
Save Skills
</button>

<button onClick={sendAlert}>
📧 Job Alert
</button>

</div>

</div>


</div>

</div>

);

}

export default Profile;