/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdNotifications,
  MdPerson,
  MdAttachMoney,
  MdAdminPanelSettings,
  MdLocationOn,
  MdDelete,
  MdReport,
  MdFeedback,
  MdLogout,
  MdAccountCircle,
} from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/admin/adminprofile" className="admin-profile">
        <MdAccountCircle size={48} />
        <span className="admin-name">Admin</span>
      </Link>
      <ul>
        <li>
          <Link to="/admin/admindashboard" className="sidebar-link">
            <MdDashboard size={24} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/adminnew" className="sidebar-link">
            <MdNotifications size={24} /> ข่าวสารและกิจกรรม
          </Link>
        </li>
        <li>
          <Link to="/admin/adminmembers" className="sidebar-link">
            <MdPerson size={24} /> รายชื่อสมาชิก
          </Link>
        </li>
        <li>
          <Link to="/admin/adminwaste" className="sidebar-link">
            <MdAttachMoney size={24} /> ประเภทขยะและราคา
          </Link>
        </li>
        <li>
          <Link to="/admin/locationform" className="sidebar-link">
            <MdLocationOn size={24} /> ข้อมูลสถานที่
          </Link>
        </li>
        <li>
          <Link to="/admin/garbageform" className="sidebar-link">
            <MdDelete size={24} /> ข้อมูลการเก็บขยะ
          </Link>
        </li>
        <li>
          <Link to="/admin/reportform" className="sidebar-link">
            <MdReport size={24} /> ข้อมูลรายงาน
          </Link>
        </li>
        <li>
          <Link to="/admin/complaintform" className="sidebar-link">
            <MdFeedback size={24} /> ข้อมูลร้องเรียน
          </Link>
        </li>
        <li>
          <Link to="/home" className="sidebar-link">
            <MdLogout size={24} /> ออกจากระบบ
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
