import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios"; // ✅ เพิ่ม axios
import "./ReportPage.css";

const ReportPage = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [severity, setSeverity] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [error, setError] = useState("");

  const issueOptions = [
    "รถเก็บขยะไม่มาตามเวลาที่กำหนด",
    "จุดเก็บขยะล้น/ขยะไม่ได้รับการจัดเก็บ",
    "ขยะตกหล่นระหว่างการเก็บ",
    "ถังขยะชำรุด/เสียหาย",
    "อื่น ๆ",
  ];

  const handleIssueChange = (event) => {
    setSelectedIssue(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedIssue || !location || !severity) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formData = new FormData();
    formData.append("issue_type", selectedIssue);
    formData.append("location", location);
    formData.append("severity", severity);
    formData.append("additional_comments", additionalComments);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/report-issue",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("ส่งรายงานปัญหาเรียบร้อย!");
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการส่งรายงาน");
    }
  };

  return (
    <div className="report-issue-container">
      <div className="report-issue-form">
        <div className="form-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="form-title">รายงานปัญหา</h1>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>ประเภทของปัญหา</label>
            <select
              value={selectedIssue}
              onChange={handleIssueChange}
              className="dropdown"
            >
              <option value="" disabled>
                กรุณาเลือกประเภทของปัญหา
              </option>
              {issueOptions.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>สถานที่เกิดปัญหา</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="กรุณาระบุสถานที่"
            />

            <label>แนบรูปภาพ</label>
            <input type="file" onChange={handleImageUpload} />
          </div>

          <div className="form-section">
            <label>ระดับความรุนแรงของปัญหา</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>
                กรุณาเลือกระดับความรุนแรง
              </option>
              <option value="สูง">
                สูง (ส่งผลกระทบอย่างมากต่อการให้บริการ)
              </option>
              <option value="ปานกลาง">
                ปานกลาง (กระทบบางส่วน แต่ยังให้บริการได้)
              </option>
              <option value="ต่ำ">ต่ำ (มีผลกระทบเล็กน้อย)</option>
            </select>
          </div>

          <div className="form-section">
            <label>ข้อเสนอแนะเพิ่มเติม</label>
            <textarea
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="กรุณาใส่ความคิดเห็นเพิ่มเติม (ถ้ามี)"
            />
          </div>

          <button type="submit" className="submit-button">
            ส่งรายงาน
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
