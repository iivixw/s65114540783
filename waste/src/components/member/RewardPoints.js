/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RewardPoints.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";

const RewardPoints = () => {
  const navigate = useNavigate();

  return (
    <div className="points-container">
      <div className="points-form">
        {/* Header */}
        <div className="points-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/account")}
          />
          <h1 className="points-title">คะแนนสะสม</h1>
        </div>

        {/* Points Card */}
        <div className="points-card">
          <FaDollarSign className="points-icon" />
          <h2 className="points-value">300</h2>
          <p>ใช้ได้ถึง 31 ธ.ค. 67</p>
          <a
            href=""
            className="history-link"
            onClick={() => navigate("/member/pointshistory")}
          >
            ดูประวัติคะแนนสะสม
          </a>
        </div>

        {/* Note Section */}
        <div className="points-note">
          <h3>หมายเหตุ :</h3>
          <ul>
            <li>
              คะแนนสะสมจะขึ้นอยู่กับน้ำหนักและประเภทของขยะที่นำมาขายหรือรีไซเคิล
            </li>
            <li>ขยะที่แยกอย่างถูกต้องตามหมวดหมู่จะได้รับคะแนนสะสมมากกว่า</li>
            <li>
              คะแนนสะสมที่ได้รับอาจเปลี่ยนแปลงได้ตามอัตราการรีไซเคิลหรือความต้องการของวัสดุในตลาด
            </li>
          </ul>
          <a
            href=""
            className="learn-more-link"
            onClick={() => navigate("/member/pointsguide")}
          >
            ดูวิธีการสะสมคะแนน
          </a>
        </div>
      </div>
    </div>
  );
};

export default RewardPoints;
