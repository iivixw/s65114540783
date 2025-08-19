import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import "./ChangePasswordPage.css";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      const response = await axios.post("http://localhost:5001/update-password", {
        username,
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        alert("เปลี่ยนรหัสผ่านสำเร็จ!");
        navigate("/dashboard");
      } else {
        setError(response.data.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="change-password-page">
      <div className="password-container">
        <div className="password-form">
          <div className="password-header">
            <IoIosArrowBack
              className="back-icon"
              onClick={() => navigate("/member/accountsettings")}
            />
            <h1 className="header-text">เปลี่ยนรหัสผ่าน</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-section">
              <label>รหัสผ่านปัจจุบัน *</label>
              <input
                type="password"
                className="password-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-section">
              <label>รหัสผ่านใหม่ *</label>
              <input
                type="password"
                className="password-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-section">
              <label>ยืนยันรหัสผ่านใหม่ *</label>
              <input
                type="password"
                className="password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-container">
              <button type="submit" className="save-button">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
