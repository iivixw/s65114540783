/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDelete, MdEditDocument, MdOutlineSearch } from "react-icons/md";
import Sidebar from "../../sidebar/Sidebar";
import "./ReportForm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    wasteType: "",
    village: "",
    points: "",
    expenseDate: "",
    expenseAmount: "",
    expensePrice: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [reportData, setReportData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const garbageTypes = [
    "ขยะทั่วไป",
    "ขยะรีไซเคิล",
    "ขยะอินทรีย์",
    "ขยะอันตราย",
    "อื่นๆ",
  ];
  const villages = [
    "บ้านหนองหลวง",
    "บ้านหนองแวง",
    "บ้านหนองใหญ่",
    "บ้านโนนสั้น",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedData = [...reportData];
      updatedData[editingIndex] = formData;
      setReportData(updatedData);
      setEditingIndex(null);
      alert("อัปเดตข้อมูลสำเร็จ!");
    } else {
      setReportData([...reportData, formData]);
      alert("เพิ่มข้อมูลสำเร็จ!");
    }

    setFormData({
      wasteType: "",
      village: "",
      points: "",
      expenseDate: "",
      expenseAmount: "",
      expensePrice: "",
    });
  };

  const handleDelete = (index) => {
    setReportData(reportData.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(reportData[index]);
    setEditingIndex(index);
  };

  return (
    <div className="report-page">
  <Sidebar />

  <div className="report-wrapper">
    {/* ด้านซ้าย: ฟอร์ม */}
    <div className="form-section">
      <h2 className="custom-heading">ฟอร์มเพิ่มข้อมูลรายงาน</h2>

      <div className="search-container">
        <input
  id="report-search-box"
  type="text"
  className="search-box"
  placeholder="ค้นหารายงาน..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

        <button className="btn-search">
          <MdOutlineSearch size={20} /> ค้นหา
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ... [form-group ต่าง ๆ เหมือนเดิม] */}
        <div className="form-group">
          <label>ประเภทขยะ:</label>
          <select name="wasteType" value={formData.wasteType} onChange={handleChange} required>
            <option value="">เลือกประเภท</option>
            {garbageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>หมู่บ้าน:</label>
          <select name="village" value={formData.village} onChange={handleChange} required>
            <option value="">เลือกหมู่บ้าน</option>
            {villages.map((village) => (
              <option key={village} value={village}>
                {village}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>คะแนนสะสม:</label>
          <input type="number" name="points" value={formData.points} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>วันที่บันทึกรายจ่าย:</label>
          <input type="date" name="expenseDate" value={formData.expenseDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>จำนวนขยะที่บันทึก:</label>
          <input type="number" name="expenseAmount" value={formData.expenseAmount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>ราคาต่อหน่วย:</label>
          <input type="number" name="expensePrice" value={formData.expensePrice} onChange={handleChange} required />
        </div>

        <div className="button-group">
          <button type="submit" className="report-btn report-submit">
            เพิ่มข้อมูล
          </button>
          <button type="button" className="report-btn report-cancel">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>

    {/* ด้านขวา: ตาราง */}
    <div className="table-section">
      <h2 className="custom-heading">รายการข้อมูลรายงาน</h2>
      {reportData.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>ประเภทขยะ</th>
              <th>หมู่บ้าน</th>
              <th>คะแนนสะสม</th>
              <th>วันที่บันทึก</th>
              <th>จำนวนขยะ</th>
              <th>ราคาต่อหน่วย</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.wasteType}</td>
                <td>{entry.village}</td>
                <td>{entry.points}</td>
                <td>{entry.expenseDate}</td>
                <td>{entry.expenseAmount}</td>
                <td>{entry.expensePrice}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>
                    <MdEditDocument size={18} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>
                    <MdDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-report-data">ยังไม่มีข้อมูลรายงาน</p>
      )}
    </div>
  </div>
</div>

  );
};

export default ReportForm;
