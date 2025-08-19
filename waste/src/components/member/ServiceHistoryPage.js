import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./ServiceHistoryPage.css";

const ServiceHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // จำลองข้อมูลการใช้บริการ
    setHistory([
      { id: 1, service: "ขายขยะ", date: "01 ก.พ. 2567", points: "+200" },
      { id: 2, service: "แลกของรางวัล", date: "25 ม.ค. 2567", points: "-150" },
      { id: 3, service: "บริจาคขยะ", date: "20 ม.ค. 2567", points: "+300" },
    ]);
  }, []);

  return (
    <div className="service-history-container">
      <div className="form-wrapper">
        <form className="history-form">
          <div className="form-header">
            <button
              type="button"
              className="icon-button back-icon"
              onClick={() => navigate("/dashboard")}
            >
              <IoIosArrowBack />
            </button>
            <h1 className="form-title">ประวัติการใช้บริการ</h1>
          </div>
          <div className="history-list">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} className="history-item">
                  <span className="history-service">{item.service}</span>
                  <span className="history-date">{item.date}</span>
                  <span className="history-points">{item.points}</span>
                </div>
              ))
            ) : (
              <p className="no-history">ยังไม่มีประวัติการใช้บริการ</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceHistoryPage;
