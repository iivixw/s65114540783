import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/admin/signin", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        navigate(response.data.redirect); // ✅ เปลี่ยนเส้นทางไป "/admin/AdminDashboard"
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>เข้าสู่ระบบแอดมิน</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
};

export default AdminLogin;
