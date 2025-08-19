import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"; // Arrow icons import
import { FaUser, FaMapMarkerAlt, FaLock, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router
import "./AccountSettings.css";

const AccountSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="account-container">
      {/* Form with Header */}
      <form className="account-form">
        {/* Back Arrow inside the form */}
        <div className="account-header">
          <div className="back-container">
            <IoIosArrowBack
              className="back-arrow"
              onClick={() => navigate("/member/account")}
            />
          </div>
          <h1>บัญชีของฉัน</h1>
        </div>

        {/* Personal Info Section */}
        <div className="account-section">
          <h2>ข้อมูลส่วนตัว</h2>
          <AccountItem
            icon={<FaUser />}
            text="แก้ไขข้อมูล"
            to="/member/editprofile"
          />
          <AccountItem
            icon={<FaMapMarkerAlt />}
            text="ที่อยู่"
            to="/member/addresspage"
          />
          <AccountItem
            icon={<FaLock />}
            text="เปลี่ยนรหัสผ่าน"
            to="/member/changepasswordpage"
          />
        </div>

        {/* Manage Account Section */}
        <div className="account-section">
          <h2>จัดการบัญชี</h2>
          <AccountItem
            icon={<FaTrash />}
            text="ปิดบัญชี"
            to="/member/closeaccountpage"
          />
        </div>
      </form>
    </div>
  );
};

const AccountItem = ({ icon, text, to }) => (
  <div className="account-item">
    <span>{text}</span>
    <Link to={to} className="arrow-link">
      <IoIosArrowForward className="arrow-icon" />
    </Link>
  </div>
);

export default AccountSettings;
