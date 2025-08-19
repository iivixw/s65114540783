import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PointsHistory.css";
import { IoIosArrowBack } from "react-icons/io";

const PointsHistory = () => {
  const [activeTab, setActiveTab] = useState("received"); // สลับแท็บ
  const navigate = useNavigate();

  return (
    <div className="history-container">
      <div className="history-form">
        {/* Header */}
        <div className="history-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/rewardpoints")}
          />
          <h1 className="history-title">ประวัติคะแนนสะสม</h1>
        </div>

        {/* Tabs */}
        <div className="history-tabs">
          <button
            className={`tab ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
            ที่ได้รับ
          </button>
          <button
            className={`tab ${activeTab === "expired" ? "active" : ""}`}
            onClick={() => setActiveTab("expired")}
          >
            ที่หมดอายุ
          </button>
        </div>

        {/* Tab Content */}
        <div className="history-content">
          {activeTab === "received" ? <ReceivedPoints /> : <ExpiredPoints />}
        </div>
      </div>
    </div>
  );
};

// ✅ แสดงประวัติคะแนนที่ได้รับ
const ReceivedPoints = () => {
  return (
    <div className="points-list">
      <h3>05 ธันวาคม 2567</h3>
      <PointItem
        name="ขวดเบียร์รีไซโอ"
        details="สหกรณ์หมู่บ้าน"
        amount="20 ลัง"
        points="+300"
      />
      <PointItem
        name="หนังสือ"
        details="สหกรณ์หมู่บ้าน"
        amount="12 กิโลกรัม"
        points="+100"
      />
    </div>
  );
};

// ✅ แสดงประวัติคะแนนที่หมดอายุ (ตัวอย่าง)
const ExpiredPoints = () => {
  return (
    <div className="points-list">
      <h3>รายการคะแนนที่หมดอายุ</h3>
      <p className="no-data">ไม่มีคะแนนสะสมที่หมดอายุ</p>
    </div>
  );
};

// ✅ Component รายการคะแนนสะสม
const PointItem = ({ name, details, amount, points }) => (
  <div className="point-item">
    <div className="point-info">
      <h4>{name}</h4>
      <p>{details}</p>
      <small>14:08</small>
    </div>
    <div className="point-amount">
      <span>{amount}</span>
      <span className="point-value">{points}</span>
    </div>
  </div>
);

export default PointsHistory;
