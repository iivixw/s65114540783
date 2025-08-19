/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Dashboard.css"; // ไฟล์ CSS

const Dashboard = () => {
  const newsData = [
    { img: "/images/image1.png", alt: "News 1" },
    { img: "/images/image2.png", alt: "News 2" },
    { img: "/images/image3.png", alt: "News 3" },
    { img: "/images/image4.png", alt: "News 4" },
    { img: "/images/image5.png", alt: "News 5" },
  ];

  const scheduleData = [
    { type: "ขยะทั่วไป", day: "จันทร์, พุธ, ศุกร์", time: "06:00 - 08:00 น." },
    { type: "ขยะรีไซเคิล", day: "อังคาร, พฤหัสบดี", time: "06:00 - 08:00 น." },
    { type: "ขยะอันตราย", day: "เสาร์", time: "08:00 - 10:00 น." },
    { type: "ขยะอินทรีย์", day: "ทุกวัน", time: "06:00 - 07:00 น." },
    { type: "ขยะชิ้นใหญ่", day: "ทุกสิ้นเดือน", time: "08:00 - 12:00 น." },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <nav className="nav-menu">
          <ul>
            <li>
              <a href="">หน้าแรก</a>
            </li>
            <li>
              <a href="member/account">บัญชีของฉัน</a>
            </li>
            <li>
              <a href="member/servicehistorypage">ประวัติการใช้บริการ</a>
            </li>
            <li>
              <a href="member/reportpage">รายงาน</a>
            </li>
            <li>
              <a href="home">ออกจากระบบ</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* หัวข้อ */}
      <h1 className="title">ข้อมูลข่าวสารและกิจกรรม</h1>

      {/* แสดงรายการข่าวและกิจกรรม */}
      <section className="news-section">
        <div className="news-container">
          {newsData.map((item, index) => (
            <div key={index} className="news-item">
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* ตารางเวลาการเก็บขยะ */}
      <section className="schedule-section">
        <h2>ตารางเวลาการเก็บขยะในพื้นที่</h2>
        <table>
          <thead>
            <tr>
              <th>ประเภทขยะ</th>
              <th>วันเก็บ</th>
              <th>เวลาเก็บ</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
