import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchWaste.css";
import SidebarEmployee from "./SidebarEmployee";

const SearchWaste = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [wasteWeight, setWasteWeight] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/search?query="
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSaveWaste = async () => {
    if (!selectedMember || !wasteWeight) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/saveWaste", {
        employee_number: selectedMember,
        waste_weight: wasteWeight,
      });

      setMessage(response.data.message);
      setWasteWeight("");
      setSelectedMember("");
    } catch (error) {
      console.error("Error saving waste data:", error);
      setMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="search-waste-layout">
      <SidebarEmployee /> {/* แสดง Sidebar ด้านซ้าย */}
      <div className="search-waste-page">
        <div className="search-waste-container">
          <h1 className="search-waste-title">บันทึกข้อมูลขยะ</h1>

          <div className="search-waste-form">
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">เลือกสมาชิก</option>
              {members.map((member) => (
                <option key={member.employee_number} value={member.employee_number}>
                  {member.name} - {member.employee_number}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={wasteWeight}
              onChange={(e) => setWasteWeight(e.target.value)}
              placeholder="ป้อนน้ำหนักขยะ (กิโลกรัม)"
            />

            <button className="search-waste-button" onClick={handleSaveWaste}>
              บันทึกข้อมูลขยะ
            </button>
          </div>

          {message && <p className="search-waste-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchWaste;
