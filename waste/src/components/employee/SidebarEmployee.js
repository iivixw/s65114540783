// src/components/employee/SidebarEmployee.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaTrashAlt,
  FaClock,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./SidebarEmployee.css";

const SidebarEmployee = () => {
  return (
    <div className="sidebar-emp">
      <div className="sidebar-emp-profile">
        <FaUserCircle size={60} />
        {/* ✅ คลิกชื่อ Employee เพื่อไปหน้า profile */}
        <Link to="/employee/employeeprofile" className="sidebar-emp-name-link">
          Employee
        </Link>
      </div>

      <ul className="sidebar-emp-menu">
        <li>
          <Link to="/employee/searchmembers">
            <FaSearch /> <span>ค้นหาสมาชิก</span>
          </Link>
        </li>
        <li>
          <Link to="/employee/searchwaste">
            <FaTrashAlt /> <span>ค้นหาขยะ</span>
          </Link>
        </li>
        <li>
          <Link to="/employee/udatewasteprice">
            <FaFileAlt /> <span>อัปเดตราคาขยะ</span>
          </Link>
        </li>
        <li>
          <Link to="/employee/udatewastepricetime">
            <FaClock /> <span>เวลาราคาขยะ</span>
          </Link>
        </li>
        <li>
          <Link to="/employee/reportwaste">
            <FaFileAlt /> <span>รายงานขยะ</span>
          </Link>
        </li>
        <li>
          <Link to="/home">
            <FaSignOutAlt /> <span>ออกจากระบบ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarEmployee;
