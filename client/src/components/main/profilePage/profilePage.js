import React from "react";
import "./profilePage.css";

const Profile = ({ user }) => {
    return (
        <div> 
            <br/>
     
        <div className="profile-container ">
        <h2 className="bold_title">My Profile</h2>
            
            <div className="profile-info ">
                <div className="profile-label">Name:</div>
                <div className="profile-value">{user.name}</div>
            </div>
            <div className="profile-info ">
                <div className="profile-label">Username:</div>
                <div className="profile-value">{user.username}</div>
            </div>
            <div className="profile-info ">
                <div className="profile-label">Bio:</div>
                <div className="profile-value">{user.bio}</div>
            </div>
            <div className="profile-info ">
                <div className="profile-label">Age:</div>
                <div className="profile-value">{user.age}</div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
