import React, { useState } from "react";
import axios from "axios";
import "./UpdateWastePriceTime.css";
import SidebarEmployee from "./SidebarEmployee";

const UpdateWastePriceByTime = () => {
  const [wasteType, setWasteType] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  const handleUpdatePrice = async () => {
    if (!wasteType || !price || !startDate || !endDate) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      setLastSubmittedData(null);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/updateWastePriceByTime",
        {
          waste_type: wasteType,
          price: price,
          start_date: startDate,
          end_date: endDate,
        }
      );

      if (response.status === 200 && response.data.message?.includes("สำเร็จ")) {
        setMessage("เพิ่มข้อมูลสำเร็จ ✅");
        setLastSubmittedData({ wasteType, price, startDate, endDate });
        setWasteType("");
        setPrice("");
        setStartDate("");
        setEndDate("");
      } else {
        setMessage("เกิดข้อผิดพลาดในการอัปเดตราคา");
        setLastSubmittedData(null);
      }
    } catch (error) {
      console.error("Error updating waste price:", error);
      setMessage("เกิดข้อผิดพลาดในการอัปเดตราคา");
      setLastSubmittedData(null);
    }
  };

  return (
    <div className="update-waste-layout">
      <SidebarEmployee />
      <div className="update-waste-page">
        <div className="update-waste-container">
          <h1 className="update-waste-title">อัปเดตราคาขยะตามช่วงเวลา</h1>

          <div className="update-waste-form">
            <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
              <option value="">เลือกประเภทขยะ</option>
              <option value="ขยะทั่วไป">ขยะทั่วไป</option>
              <option value="ขยะรีไซเคิล">ขยะรีไซเคิล</option>
              <option value="ขยะอินทรีย์">ขยะอินทรีย์</option>
              <option value="ขยะอันตราย">ขยะอันตราย</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="ป้อนราคาขยะ (บาท)"
            />

            {/* ✅ แยกช่วงวันที่ออก */}
            <div className="update-date-wrapper">
              <label className="update-label">ช่วงวันที่</label>
              <div className="date-input-group">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="custom-date-input"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="custom-date-input"
                />
              </div>
            </div>

            <button onClick={handleUpdatePrice}>อัปเดตราคา</button>
          </div>

          {message && <p className="update-waste-message">{message}</p>}

          {lastSubmittedData && (
            <div className="waste-added-box">
              <h3>📌 ข้อมูลที่เพิ่มล่าสุด</h3>
              <p><strong>ประเภท:</strong> {lastSubmittedData.wasteType}</p>
              <p><strong>ราคา:</strong> {lastSubmittedData.price} บาท</p>
              <p><strong>ช่วงเวลา:</strong> {lastSubmittedData.startDate} - {lastSubmittedData.endDate}</p>
            </div>
          )}

          <div className="promo-card">
            <div className="promo-header">
              <div className="promo-circle">♻️</div>
              <div>
                <h3 className="promo-rank">โปรโมชั่นพิเศษ</h3>
                <span className="badge">รีไซเคิล</span>
                <span className="badge yellow">ช่วงเวลา 1-7 ส.ค.</span>
              </div>
              <div className="promo-score">+20%</div>
            </div>
            <div className="promo-desc">รับคะแนนพิเศษเพิ่มสำหรับขยะรีไซเคิลในช่วงกิจกรรมนี้</div>
            <button className="promo-btn" onClick={() => setShowDetails(true)}>
              ดูรายละเอียด
            </button>
          </div>

          {showDetails && (
            <div className="promo-detail-box">
              <div className="promo-detail-header">
                <h3>รายละเอียดโปรโมชั่น</h3>
                <button className="close-btn" onClick={() => setShowDetails(false)}>✕</button>
              </div>
              <p><strong>ประเภทขยะ:</strong> ขยะรีไซเคิล</p>
              <p><strong>ช่วงเวลา:</strong> 1 ส.ค. - 7 ส.ค.</p>
              <p><strong>คะแนนพิเศษ:</strong> เพิ่ม 20%</p>
              <p>สามารถใช้สิทธิ์ได้เฉพาะช่วงวันที่กำหนด และต้องเป็นขยะที่เข้าเกณฑ์เท่านั้น</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateWastePriceByTime;
