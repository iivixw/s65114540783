/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDelete, MdEdit, MdOutlineSearch } from "react-icons/md";
import Sidebar from "../../sidebar/Sidebar";
import "./GarbageCollectionForm.css";

const GarbageCollectionForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    quantity: "",
    type: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [garbageData, setGarbageData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const garbageTypes = [
    "ขยะทั่วไป", "ขยะรีไซเคิล", "ขยะอินทรีย์", "ขยะอันตราย", "อื่นๆ"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedData = [...garbageData];
      updatedData[editingIndex] = { ...formData, id: updatedData[editingIndex].id };
      setGarbageData(updatedData);
      setEditingIndex(null);
      alert("อัปเดตข้อมูลสำเร็จ!");
    } else {
      const newEntry = { id: garbageData.length + 1, ...formData };
      setGarbageData([...garbageData, newEntry]);
      alert("บันทึกข้อมูลสำเร็จ!");
    }
    setFormData({ date: "", time: "", quantity: "", type: "" });
  };

  const handleDelete = (id) => {
    const updated = garbageData.filter((entry) => entry.id !== id);
    setGarbageData(updated);
  };

  const handleEdit = (index) => {
    setFormData(garbageData[index]);
    setEditingIndex(index);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchTerm);
  };

  const filteredData = garbageData.filter((entry) =>
    Object.values(entry).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="garbage-collection-page">
      <Sidebar />
      <div className="garbage-form-wrapper">
        <div className="garbage-form-layout">
          <div className="garbage-form-section">
            <h2 className="custom-heading">ฟอร์มบันทึกข้อมูลการเก็บขยะ</h2>
            <form onSubmit={handleSubmit} className="garbage-form">
              <div className="search-container">
             <input
  type="text"
  id="garbage-search-box"
  className="search-box"
  placeholder="ค้นหาข้อมูล..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

                <button type="button" className="btn-search" onClick={handleSearchClick}>
                  <MdOutlineSearch size={20} /> ค้นหา
                </button>
              </div>
              <div className="form-group"><label>วันที่:</label><input type="date" name="date" value={formData.date} onChange={handleChange} required /></div>
              <div className="form-group"><label>เวลา:</label><input type="time" name="time" value={formData.time} onChange={handleChange} required /></div>
              <div className="form-group"><label>ปริมาณ:</label><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required /></div>
              <div className="form-group">
                <label>ประเภท:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">เลือกประเภท</option>
                  {garbageTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="button-group">
                <button type="submit" className="btn btn-submit">
                  {editingIndex !== null ? "อัปเดตข้อมูล" : "เพิ่มข้อมูล"}
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => {
                    setFormData({ date: "", time: "", quantity: "", type: "" });
                    setEditingIndex(null);
                  }}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>

          <div className="garbage-table-section">
            <h2 className="custom-heading">รายการข้อมูลการเก็บขยะ</h2>
            {garbageData.length > 0 ? (
              <table className="garbage-table">
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>เวลา</th>
                    <th>ปริมาณ</th>
                    <th>ประเภท</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.time}</td>
                        <td>{entry.quantity}</td>
                        <td>{entry.type}</td>
                        <td>
  <button className="btn-icon" onClick={() => handleEdit(index)}>
    <MdEdit />
  </button>
</td>
<td>
  <button className="btn-icon" onClick={() => handleDelete(entry.id)}>
    <MdDelete />
  </button>
</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data-text">ยังไม่มีข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="no-data-box">
                <p className="no-data-text">ยังไม่มีข้อมูลการเก็บขยะ</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarbageCollectionForm;
