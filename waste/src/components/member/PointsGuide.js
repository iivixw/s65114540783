import React from "react";
import { useNavigate } from "react-router-dom";
import "./PointsGuide.css";
import { IoIosArrowBack } from "react-icons/io";

const PointsGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <div className="guide-form">
        {/* Header */}
        <div className="guide-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/rewardpoints")}
          />
          <h1 className="guide-title">วิธีการสะสมคะแนน</h1>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ประเภทขยะ</th>
                <th>คะแนนสะสมต่อหน่วย (กิโลกรัม)</th>
                <th>ตัวอย่างขยะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ขยะรีไซเคิล (กระดาษ)</td>
                <td>10 คะแนน</td>
                <td>กระดาษหนังสือพิมพ์, กล่องกระดาษ</td>
              </tr>
              <tr>
                <td>ขยะรีไซเคิล (พลาสติก)</td>
                <td>20 คะแนน</td>
                <td>ขวดพลาสติก, ถุงพลาสติก</td>
              </tr>
              <tr>
                <td>ขยะรีไซเคิล (โลหะ)</td>
                <td>30 คะแนน</td>
                <td>กระป๋องอลูมิเนียม, เศษโลหะ</td>
              </tr>
              <tr>
                <td>ขยะรีไซเคิล (แก้ว)</td>
                <td>15 คะแนน</td>
                <td>ขวดแก้ว, เศษแก้ว</td>
              </tr>
              <tr>
                <td>ขยะอิเล็กทรอนิกส์</td>
                <td>50 คะแนน</td>
                <td>โทรศัพท์เก่า, คอมพิวเตอร์เก่า</td>
              </tr>
              <tr>
                <td>ขยะอันตราย</td>
                <td>100 คะแนน</td>
                <td>แบตเตอรี่, หลอดไฟ</td>
              </tr>
              <tr>
                <td>ขยะอินทรีย์</td>
                <td>5 คะแนน</td>
                <td>เศษอาหาร, เปลือกผลไม้</td>
              </tr>
              <tr>
                <td>ขยะชิ้นใหญ่</td>
                <td>200 คะแนน</td>
                <td>เฟอร์นิเจอร์, เครื่องใช้ไฟฟ้าขนาดใหญ่</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointsGuide;
