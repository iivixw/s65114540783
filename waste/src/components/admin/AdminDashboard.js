import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./AdminDashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AdminDashboard = () => {
  const pieData = [
    { name: "จุดรับขยะ", value: 50 },
    { name: "แจ้งเตือนปัญหา", value: 10 },
    { name: "ผู้ใช้งาน", value: 120 },
  ];

  const barData = [
    { name: "วันนี้", trips: 5 },
    { name: "เดือนนี้", trips: 150 },
  ];

  const COLORS = ["#00C49F", "#FCE38A", "#F38181"];

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <div className="cards">
          <div className="card chart-card" style={{ gridColumn: "span 2" }}>
            <h3 style={{ fontSize: "1.5rem" }}>📊 กราฟสถิติ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.3rem" }}>📌 จำนวนจุดรับขยะ</h3>
            <p style={{ fontSize: "1.1rem" }}>50 จุด</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.3rem" }}>🚛 รอบเก็บขยะวันนี้/เดือนนี้</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trips" fill="#39A0ED" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.3rem" }}>👥 จำนวนผู้ใช้งานระบบ</h3>
            <p style={{ fontSize: "1.1rem" }}>120 คน</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.3rem" }}>
              ⚠️ แจ้งเตือนปัญหา/ข้อร้องเรียน
            </h3>
            <p style={{ fontSize: "1.1rem" }}>10 เรื่อง</p>
          </div>
          <div className="card calendar-card">
            <h3 style={{ fontSize: "1.3rem" }}>📅 ปฏิทินกิจกรรม</h3>
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
