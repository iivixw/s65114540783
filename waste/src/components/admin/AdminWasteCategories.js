/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { MdEdit, MdDelete } from "react-icons/md";
import "./AdminWasteCategories.css";

const AdminWasteCategories = () => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const wasteOptions = [
    "ขยะทั่วไป",
    "ขยะรีไซเคิล",
    "ขยะอินทรีย์",
    "ขยะอันตราย",
    "ขยะอิเล็กทรอนิกส์",
    "ขยะพลาสติก",
    "ขยะโลหะ",
    "อื่นๆ",
  ];

  const [wasteCategories, setWasteCategories] = useState([
    { id: 1, name: "ขยะรีไซเคิล", price: 10 },
    { id: 2, name: "ขยะอันตราย", price: 20 },
    { id: 3, name: "ขยะทั่วไป", price: 5 },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (editingId) {
      setWasteCategories(
        wasteCategories.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      alert("อัปเดตข้อมูลสำเร็จ!");
    } else {
      setWasteCategories([
        ...wasteCategories,
        { id: wasteCategories.length + 1, ...formData },
      ]);
      alert("เพิ่มประเภทขยะสำเร็จ!");
    }

    setFormData({ name: "", price: "" });
    setEditingId(null);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบประเภทขยะนี้หรือไม่?")) {
      setWasteCategories(wasteCategories.filter((item) => item.id !== id));
      alert("ลบประเภทขยะสำเร็จ!");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content-container">
        <div className="waste-container">
          <h2>จัดการประเภทขยะและราคา</h2>

          <form onSubmit={handleSubmit} className="waste-form">
            <div className="form-group">
              <label>ชื่อประเภทขยะ:</label>
              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">เลือกประเภทขยะ</option>
                {wasteOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ราคาต่อหน่วย (บาท):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="button-group">
  <button type="submit" className="btn btn-submit">
    เพิ่มประเภทขยะ
  </button>
  <button
    type="button"
    className="btn btn-cancel"
    onClick={() => setFormData({ name: "", price: "" })}
  >
    ยกเลิก
  </button>
</div>

          </form>

          <h3 className="table-title">รายการประเภทขยะ</h3>
          <table className="waste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ชื่อประเภทขยะ</th>
                <th>ราคาต่อหน่วย (บาท)</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {wasteCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.price}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(category)}
                    >
                      <MdEdit size={20} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(category.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWasteCategories;
