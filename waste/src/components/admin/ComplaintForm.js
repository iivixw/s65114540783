import React, { useState } from "react";
import { MdDelete, MdEditDocument, MdSearch } from "react-icons/md";
import Sidebar from "../../sidebar/Sidebar"; 
import "./ComplaintForm.css";

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    type: "",
    garbageTruck: "",
    details: "",
    other: "",
  });

  const [complaintData, setComplaintData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const garbageTypes = [
    "ขยะทั่วไป",
    "ขยะรีไซเคิล",
    "ขยะอินทรีย์",
    "ขยะอันตราย",
    "อื่นๆ",
  ];

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint.type.trim() === "" || complaint.details.trim() === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (editingIndex !== null) {
      const updatedData = [...complaintData];
      updatedData[editingIndex] = {
        ...complaint,
        date: new Date().toLocaleDateString(),
      };
      setComplaintData(updatedData);
      setEditingIndex(null);
      alert("อัปเดตข้อมูลสำเร็จ!");
    } else {
      const newEntry = {
        id: complaintData.length + 1,
        ...complaint,
        date: new Date().toLocaleDateString(),
      };
      setComplaintData([...complaintData, newEntry]);
      alert("บันทึกข้อมูลร้องเรียนสำเร็จ!");
    }
    setComplaint({ type: "", garbageTruck: "", details: "", other: "" });
  };

  const handleEdit = (index) => {
    setComplaint(complaintData[index]);
    setEditingIndex(index);
  };

  const handleDelete = (id) => {
    setComplaintData(complaintData.filter((entry) => entry.id !== id));
  };

  return (
    <div className="complaint-page">
  <Sidebar />
  <div className="complaint-layout">
    {/* 🔹 ฟอร์มกรอกข้อมูล */}
    <div className="main-container">
      <h2 className="custom-heading">ฟอร์มบันทึกข้อมูลร้องเรียน</h2>

      <div className="inner-form">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="ค้นหาข้อมูล..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-search">
            <MdSearch size={20} /> ค้นหา
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ประเภทขยะ :</label>
            <select name="type" value={complaint.type} onChange={handleChange} required>
              <option value="">เลือกประเภท</option>
              {garbageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>รหัสรถเก็บขยะ :</label>
            <input
              type="text"
              name="garbageTruck"
              value={complaint.garbageTruck}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>รายละเอียดร้องเรียน :</label>
            <textarea
              name="details"
              value={complaint.details}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>อื่นๆ :</label>
            <textarea
              name="other"
              value={complaint.other}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-submit">
              {editingIndex !== null ? "อัปเดตข้อมูล" : "เพิ่มข้อมูล"}
            </button>
            <button type="button" className="btn btn-cancel">
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* 🔹 ตารางข้อมูลร้องเรียน */}
    <div className="table-container">
      <h2 className="custom-heading">รายการข้อมูลร้องเรียน</h2>
      {complaintData.length > 0 ? (
        <table className="complaint-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ประเภทขยะ</th>
              <th>รหัสรถเก็บขยะ</th>
              <th>รายละเอียด</th>
              <th>อื่นๆ</th>
              <th>วันที่ร้องเรียน</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {complaintData.map((entry, index) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.type}</td>
                <td>{entry.garbageTruck}</td>
                <td>{entry.details}</td>
                <td>{entry.other}</td>
                <td>{entry.date}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(index)}>
                    <MdEditDocument size={20} />
                  </button>
                </td>
                <td>
                  <button className="btn btn-delete" onClick={() => handleDelete(entry.id)}>
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">ไม่มีข้อมูลร้องเรียน</div>

      )}
    </div>
  </div>
</div>

  );
};

export default ComplaintForm;
