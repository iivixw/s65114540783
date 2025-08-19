/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    username: "admin",
    fullName: "Admin",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleUsernameChange = (e) => {
    setProfile({
      ...profile,
      username: e.target.value,
      fullName: e.target.value,
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert(
      `อัปเดตข้อมูลสำเร็จ!\n\nชื่อผู้ใช้: ${profile.username}\nรหัสผ่าน: ${password}`
    );
  };

  const handleCancel = () => {
    setProfile({
      username: "admin",
      fullName: "Adminเหมียว",
    });
    setPassword("");
    setSelectedImage(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="profile-container">
        <div className="header-container">
          <h3 className="custom-heading">Admin Profile</h3>
        </div>

        <div className="profile-card">
          <label htmlFor="imageUpload" className="image-upload-label">
            <div className="profile-img-container">
              <img
                src={selectedImage || "/default-profile.png"}
                alt=""
                className="profile-img"
              />
            </div>
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <h2>{profile.fullName}</h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="profile-form">
          <div className="form-group">
            <label>ชื่อผู้ใช้:</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label>รหัสผ่าน:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="profile-button-group">
            <button type="submit" className="profile-btn profile-submit">
              อัปเดตข้อมูล
            </button>
            <button
              type="button"
              className="profile-btn profile-cancel"
              onClick={handleCancel}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
