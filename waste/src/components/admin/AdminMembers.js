import React, { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { MdDelete } from "react-icons/md"; // ไอคอนลบ
import "./AdminMembers.css";

const AdminMembers = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "สมชาย ใจดี", email: "somchai@example.com" },
    { id: 2, name: "สุภาพร นิลวรรณ", email: "supaporn@example.com" },
    { id: 3, name: "วิชัย พรหมมินทร์", email: "wichai@example.com" },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบสมาชิกนี้หรือไม่?");
    if (confirmDelete) {
      setMembers(members.filter((member) => member.id !== id));
      alert("ลบสมาชิกเรียบร้อย!");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar /> {/* ทำให้ Sidebar มีขนาดเต็มจอด้านซ้าย */}
      <div className="admin-members-page">
        <div className="members-container">
          {/* หัวข้อ */}
          <div className="header-container">
            <h2>จัดการสมาชิก</h2>
          </div>

        
            {members.length > 0 ? (
              <table className="members-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ชื่อสมาชิก</th>
                    <th>อีเมล</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(member.id)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>ยังไม่มีสมาชิก</p>
            )}
          </div>
        </div>
      </div>

  );
};

export default AdminMembers;
