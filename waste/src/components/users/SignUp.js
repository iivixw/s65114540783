import React, { useState } from "react";
import "./SignUp.css";
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    village: "",
  });

  const villages = [
    "บ้านหนองหลวง",
    "บ้านหนองแวง",
    "บ้านหนองใหญ่",
    "บ้านโนนสั้น",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        village: formData.village,
      });

      if (response.data.success) {
        alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");

        // ✅ หลังสมัครเสร็จ ให้พาไปหน้า SignIn เพื่อเข้าสู่ระบบก่อน
        navigate("/dashboard");
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
      } else {
        alert("เกิดข้อผิดพลาด ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <img src="/images/logo1.png" alt="โลโก้" />
          <h2>ยินดีต้อนรับสู่ CleanCity</h2>
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
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="อีเมล"
                value={formData.email}
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
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="ยืนยันรหัสผ่าน"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="select-container">
              <FaHome className="input-icon" />
              <select
                name="village"
                value={formData.village}
                onChange={handleChange}
                required
              >
                <option value=""> เลือกหมู่บ้าน</option>
                {villages.map((village) => (
                  <option key={village} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">
              สมัครสมาชิก
            </button>
          </form>
          <p>
            มีบัญชีผู้ใช้อยู่แล้ว? <Link to="/member/signIn">เข้าสู่ระบบ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
