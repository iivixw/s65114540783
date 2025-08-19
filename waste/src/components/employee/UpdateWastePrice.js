import React, { useState } from "react";
import axios from "axios";
import "./UpdateWastePrice.css"; // ใช้ CSS ใหม่ที่คุณจะสร้าง
import SidebarEmployee from "./SidebarEmployee";

const UpdateWastePrice = () => {
  const [wasteType, setWasteType] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePrice = async () => {
    if (!wasteType || !price) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/updateWastePrice",
        {
          waste_type: wasteType,
          price: price,
        }
      );

      setMessage(response.data.message);
      setWasteType("");
      setPrice("");
    } catch (error) {
      console.error("Error updating waste price:", error);
      setMessage("เกิดข้อผิดพลาดในการอัปเดตราคา");
    }
  };

  return (
    <div className="update-waste-layout">
      <SidebarEmployee />
      <div className="update-waste-page">
        <div className="update-waste-container">
          <h1 className="update-waste-title">อัปเดตราคาขยะ</h1>

          <div className="update-waste-form">
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
            >
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

            <button onClick={handleUpdatePrice}>อัปเดตราคา</button>
          </div>

          {message && <p className="update-waste-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateWastePrice;
