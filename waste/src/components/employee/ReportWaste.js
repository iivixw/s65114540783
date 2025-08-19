import React, { useState } from "react";
import axios from "axios";
import SidebarEmployee from "./SidebarEmployee";
import "./ReportWaste.css";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#ffc107", "#28a745", "#007bff"];

const ReportWaste = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setMessage("กรุณากรอกวันที่เริ่มต้นและสิ้นสุด");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/reportWaste", {
        params: { start_date: startDate, end_date: endDate },
      });
      setReport(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching report:", error);
      setMessage("เกิดข้อผิดพลาดในการสร้างรายงาน");
      setReport(null);
    }
  };

  // ข้อมูลตัวอย่างสำหรับกราฟ
  const pieData = [
    { name: "ขยะทั่วไป", value: 400 },
    { name: "ขยะรีไซเคิล", value: 300 },
    { name: "ขยะอินทรีย์", value: 300 },
  ];

  const barData = [
    { name: "รีไซเคิล", คะแนน: 90 },
    { name: "อินทรีย์", คะแนน: 75 },
    { name: "อันตราย", คะแนน: 60 },
  ];

  return (
    <div className="report-layout">
      <SidebarEmployee />
      <div className="report-main-content">
        {/* 📋 ฟอร์ม */}
        <div className="report-form-card">
          <h1 className="report-title">รายงานปริมาณขยะและยอดขายขยะรีไซเคิล</h1>

          <div className="report-form">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleGenerateReport}>สร้างรายงาน</button>
          </div>

          {message && <p className="report-message">{message}</p>}

          {report && (
            <div className="report-summary">
              <p><strong>ปริมาณขยะทั้งหมด:</strong> {report.total_weight} กก.</p>
              <p><strong>ยอดขายรีไซเคิล:</strong> {report.total_revenue} บาท</p>
            </div>
          )}
        </div>

        {/* 📊 กราฟ */}
        <div className="chart-container">
          <div className="chart-card">
            <h3>สัดส่วนประเภทขยะ</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>คะแนนเฉลี่ยตามประเภทขยะ</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="คะแนน" fill="#ffc107" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWaste;
