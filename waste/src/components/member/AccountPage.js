import React from "react";
import "./AccountPage.css";
import { FaUser, FaDollarSign, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  console.log("AccountPage Loaded"); // Debugging
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("คุณต้องการออกจากระบบจริงหรือไม่?")) {
      navigate("/home");
    }
  };

  return (
    <div className="account-container">
      <form className="account-form">
        {/* Header พร้อมปุ่มย้อนกลับ */}
        <div className="account-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/dashboard")}
          />
          <h1>บัญชีของฉัน</h1>
        </div>

        {/* User Info */}
        <div className="account-section">
          <AccountItem icon={<FaUser />} text="วิชญาดา มะลัยทอง" />
        </div>

        {/* Account Section */}
        <div className="account-section">
          <h2>บัญชี</h2>
          <AccountItem
            icon={<FaUser />}
            text="บัญชีของฉัน"
            onClick={() => navigate("/member/accountsettings")}
          />
          <AccountItem
            icon={<FaDollarSign />}
            text="คะแนนสะสม"
            onClick={() => navigate("/member/pointshistory")}
          />
        </div>

        {/* Logout Button in Center */}
        <div className="account-section logout-section">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> ออกจากระบบ
          </button>
        </div>
      </form>
    </div>
  );
};

const AccountItem = ({ icon, text, onClick }) => (
  <div
    className="account-item"
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <span className="account-icon">{icon}</span>
    <span className="account-text">{text}</span>
    {onClick && <IoIosArrowForward className="account-arrow" />}
  </div>
);

export default AccountPage;
