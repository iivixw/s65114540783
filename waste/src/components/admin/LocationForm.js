/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDelete, MdEdit, MdOutlineSearch } from "react-icons/md";
import Sidebar from "../../sidebar/Sidebar";
import "./LocationForm.css";

const LocationForm = () => {
  const [locationData, setLocationData] = useState({
    villageName: "",
    villageNumber: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const villageOptions = [
    "บ้านหนองหลวง",
    "บ้านหนองแวง",
    "บ้านหนองใหญ่",
    "บ้านโนนสั้น",
  ];

  const villageNumbers = ["หมู่ที่ 1", "หมู่ที่ 2", "หมู่ที่ 3", "หมู่ที่ 4"];

  const handleChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedList = [...locationList];
      updatedList[editingIndex] = locationData;
      setLocationList(updatedList);
      setEditingIndex(null);
      alert("อัปเดตข้อมูลสำเร็จ!");
    } else {
      setLocationList([...locationList, locationData]);
      alert("เพิ่มข้อมูลสำเร็จ!");
    }

    setLocationData({ villageName: "", villageNumber: "" });
  };

  const handleDelete = (index) => {
    setLocationList(locationList.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setLocationData(locationList[index]);
    setEditingIndex(index);
  };

  return (
    <div className="location-layout">
      <Sidebar />
      <div className="location-form-container">
        <div className="form-box">
          <h2 className="custom-heading">ฟอร์มเพิ่มข้อมูลสถานที่</h2>

          <div className="search-container">
            <input
              type="text"
              className="search-box"
              placeholder="ค้นหาสถานที่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn-search">
              <MdOutlineSearch size={20} /> ค้นหา
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ชื่อหมู่บ้าน:</label>
              <select
                name="villageName"
                value={locationData.villageName}
                onChange={handleChange}
                required
              >
                <option value="">เลือกหมู่บ้าน</option>
                {villageOptions.map((village) => (
                  <option key={village} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>หมู่ที่:</label>
              <select
                name="villageNumber"
                value={locationData.villageNumber}
                onChange={handleChange}
                required
              >
                <option value="">เลือกหมู่ที่</option>
                {villageNumbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
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
      setLocationData({ villageName: "", villageNumber: "" });
      setEditingIndex(null);
    }}
  >
    ยกเลิก
  </button>
</div>

          </form>

          <div className="table-container">
            <h3 className="custom-heading">รายการสถานที่</h3>
            {locationList.length > 0 ? (
              <table className="location-table">
                <thead>
                  <tr>
                    <th>ชื่อหมู่บ้าน</th>
                    <th>หมู่ที่</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {locationList.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.villageName}</td>
                      <td>{entry.villageNumber}</td>
                      <td>
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => handleEdit(index)}
                        >
                          <MdEdit size={20} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(index)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>ยังไม่มีข้อมูลสถานที่</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
