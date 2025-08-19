import React, { useState } from "react";
import "./SignIn.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signin", // แน่ใจว่า URL API ใช้ `localhost:5001` สำหรับ Express backend
        formData
      );

      if (response.data.success) {
        // ✅ บันทึก Token และข้อมูลผู้ใช้
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);

        alert("เข้าสู่ระบบสำเร็จ!");

        // ✅ นำทางไปที่ /dashboard
        navigate("/dashboard");
      } else {
        // หาก response ไม่สำเร็จ, จะแสดงข้อความจาก API
        setError(response.data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาดจากการเชื่อมต่อ API หรืออื่นๆ
      setError(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <div className="login-card">
          <img src="/images/logo1.png" alt="โลโก้" />
          <h2>ยินดีต้อนรับสู่ CleanCity</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="รหัสผ่าน"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              เข้าสู่ระบบ
            </button>
          </form>
          <div className="additional-links">
            <p>
              <Link to="/member/changepasswordpage">ลืมรหัสผ่านของคุณ?</Link>
            </p>
            <p>
              ยังไม่มีบัญชี? <Link to="/users/signup">ลงทะเบียน</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
