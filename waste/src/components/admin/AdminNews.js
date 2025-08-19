import React, { useState } from "react";
import { MdOutlineAddCircle, MdEdit, MdDelete } from "react-icons/md";
import Sidebar from "../../sidebar/Sidebar";
import "./AdminNews.css";

const AdminNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
    author: "",
  });

  const [newsList, setNewsList] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    setNewsList([...newsList, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      content: "",
      image: null,
      category: "",
      author: "",
    });
  };

  const handleDelete = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  const handleEdit = (news) => {
    setFormData(news);
    setNewsList(newsList.filter((item) => item.id !== news.id));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content-wrapper">
        {/* ฟอร์มโพสต์ */}
        <div className="news-form-container">
          <h3 className="news-form-title">จัดการข่าวสารและกิจกรรม</h3>
          <form onSubmit={handleSubmit} className="news-form">
            <div className="form-group">
              <label>หัวข้อข่าว:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>หมวดหมู่ข่าว:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="ทั่วไป">ทั่วไป</option>
                <option value="กิจกรรม">กิจกรรม</option>
                <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
              </select>
            </div>
            <div className="form-group">
              <label>ผู้เขียนข่าว:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>รายละเอียด:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>แนบรูปภาพ:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
  <button type="submit" className="btn btn-submit">
    <MdOutlineAddCircle size={20} /> โพสต์ข่าวสาร
  </button>
  <button
    type="button"
    className="btn btn-cancel"
    onClick={() =>
      setFormData({
        title: "",
        content: "",
        image: null,
        category: "",
        author: "",
      })
    }
  >
    ยกเลิก
  </button>
</div>

          </form>
        </div>

        <div className="news-list-container">
  <h3 className="list-title">รายการข่าวที่โพสต์</h3>
  {newsList.length === 0 ? (
    <p className="no-data-news">ยังไม่มีข้อมูลข่าวที่โพสต์</p>
  ) : (
    <table className="news-table">
      <thead>
        <tr>
          <th>รูปภาพ</th>
          <th>หัวข้อ</th>
          <th>หมวดหมู่</th>
          <th>ผู้เขียน</th>
          <th>รายละเอียด</th>
          <th>แก้ไข</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        {newsList.map((news) => (
          <tr key={news.id}>
            <td>
              {news.image && (
                <img
                  src={URL.createObjectURL(news.image)}
                  alt="ข่าว"
                  className="news-image"
                />
              )}
            </td>
            <td>{news.title}</td>
            <td>{news.category}</td>
            <td>{news.author}</td>
            <td>{news.content}</td>
            <td>
              <button onClick={() => handleEdit(news)} className="btn-edit">
                <MdEdit />
              </button>
            </td>
            <td>
              <button onClick={() => handleDelete(news.id)} className="btn-delete">
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </div>
    </div>
  );
};

export default AdminNews;
