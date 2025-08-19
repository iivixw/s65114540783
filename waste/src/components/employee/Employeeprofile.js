import React, { useState } from "react";
import SidebarEmployee from "./SidebarEmployee";
import "./Employeeprofile.css";

const Employeeprofile = () => {
  const [username, setUsername] = useState("พนักงาน");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdate = () => {
    alert("อัปเดตข้อมูลเรียบร้อยแล้ว");
  };

  const handleCancel = () => {
    setPassword("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="employee-profile-layout">
      <SidebarEmployee />
      <div className="employee-main-content">
        <div className="employee-profile-card">
          <h2 className="profile-title">Employee Profile</h2>

          <div className="profile-image-wrapper">
            <label htmlFor="profile-upload">
              <div
                className="profile-image"
                style={{
                  backgroundImage: profileImage ? `url(${profileImage})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <h3 className="profile-name">{username}</h3>

          <div className="form-group">
            <label className="employee-label">ชื่อผู้ใช้:</label>
            <input
              className="employee-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="employee-label">รหัสผ่าน:</label>
            <input
              className="employee-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่านใหม่"
            />
          </div>

          <div className="button-group">
            <button className="btn-update" onClick={handleUpdate}>อัปเดตข้อมูล</button>
            <button className="btn-cancel" onClick={handleCancel}>ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employeeprofile;
