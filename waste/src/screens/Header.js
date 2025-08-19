import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    // อัพเดท currentPage เมื่อ URL เปลี่ยน
    const handleLocationChange = () => {
      setCurrentPage(window.location.pathname);
    };

    // ฟังการเปลี่ยนแปลง URL
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <nav className="navbar">
        {/* แสดงลิงก์เฉพาะในหน้า /home และ /dashboard */}
        {currentPage === "/home" && <a href="/home">หน้าแรก</a>}
        {currentPage === "/dashboard" && <a href="/dashboard">แดชบอร์ด</a>}
        {/* ลิงก์เข้าสู่ระบบและลงทะเบียนจะแสดงทุกหน้า */}
        <a href="member/signIn">เข้าสู่ระบบ</a>
        <a href="users/signUp">ลงทะเบียน</a>
      </nav>
    </header>
  );
};

export default Header;
