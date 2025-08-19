import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const EditProfile = () => {
  const [name, setName] = useState(""); // แก้เป็นค่าว่างก่อน
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setName(storedUsername); // โหลดค่าจาก localStorage
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:5001/profile", {
        oldUsername: localStorage.getItem("username"),
        newUsername: name,
      });

      if (response.data.success) {
        alert(`บันทึกชื่อใหม่: ${response.data.newUsername}`);
        localStorage.setItem("username", response.data.newUsername); // อัปเดตชื่อใหม่ใน localStorage
        navigate("/member/accountsettings");
      }
    } catch (error) {
      alert(error.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-form">
        {/* Header */}
        <div className="edit-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/accountsettings")}
          />
          <h1 className="header-text">แก้ไขข้อมูล</h1>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <label>ชื่อ</label>
          <div className="input-box">
            <FaUser className="input-left-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
