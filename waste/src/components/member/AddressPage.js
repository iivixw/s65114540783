import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressPage.css";
import { IoIosArrowBack } from "react-icons/io"; // ไอคอนย้อนกลับ
import { FaMapMarkerAlt } from "react-icons/fa"; // ไอคอนสถานที่

const AddressPage = () => {
  const [address, setAddress] = useState(""); // ค่าเริ่มต้นของที่อยู่
  const navigate = useNavigate();

  // รายการที่อยู่ให้เลือก
  const addressOptions = [
    "บ้านหนองหลวง",
    "บ้านหนองแวง",
    "บ้านหนองใหญ่",
    "บ้านโนนสั้น",
  ];

  // ฟังก์ชันจัดการการเปลี่ยนแปลงที่อยู่
  const handleAddAddress = (e) => {
    setAddress(e.target.value);
  };

  // ฟังก์ชันบันทึกที่อยู่
  const handleSave = () => {
    if (address) {
      alert(`บันทึกที่อยู่: ${address}`);
    } else {
      alert("กรุณาเลือกที่อยู่ก่อนบันทึก");
    }
  };

  return (
    <div className="address-container">
      <div className="address-form">
        {/* Header */}
        <div className="address-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/accountsettings")} // ย้อนกลับไปหน้า Account Settings
          />
          <h1 className="header-text">ที่อยู่ของฉัน</h1>
        </div>

        {/* Address Section */}
        <div className="address-section">
          <label>ที่อยู่</label>
          <div className="address-box">
            <FaMapMarkerAlt className="address-icon" />
            <select
              className="address-dropdown"
              value={address}
              onChange={handleAddAddress}
            >
              <option value="">เพิ่มที่อยู่ของคุณ</option>
              {addressOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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

export default AddressPage;
