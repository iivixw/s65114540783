import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CloseAccountPage.css";
import { IoIosArrowBack } from "react-icons/io";

const CloseAccountPage = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleCloseAccount = () => {
    if (
      window.confirm(
        "คุณแน่ใจหรือไม่ว่าต้องการปิดบัญชี? การกระทำนี้ไม่สามารถยกเลิกได้หลังจาก 7 วัน"
      )
    ) {
      setIsConfirmed(true);
      alert("บัญชีของคุณถูกปิดเรียบร้อยแล้ว!");
    }
  };

  return (
    <div className="close-account-container">
      <div className="close-account-form">
        {/* Header */}
        <div className="close-account-header">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/member/accountsettings")} // ย้อนกลับไปหน้า Account Settings
          />
          <h1 className="header-text">การปิดบัญชี</h1>
        </div>

        <div className="close-account-content">
          <h2>การปิดบัญชี</h2>
          <ul>
            <li>
              การปิดบัญชีจะทำให้คะแนน การค้นพบ
              และวิธีการคัดแยกของคุณไม่แสดงบนระบบ
            </li>
            <li>
              คุณสามารถกู้คืนบัญชีกลับมาได้ใน <strong>7 วัน</strong>{" "}
              หากเกินเวลาดังกล่าวบัญชีและข้อมูลทั้งหมดจะถูกลบ
            </li>
            <li>หลังจากการยืนยันคุณจะไม่สามารถเข้าสู่ระบบได้</li>
          </ul>

          {!isConfirmed ? (
            <button
              className="close-account-button"
              onClick={handleCloseAccount}
            >
              ยืนยันการปิดบัญชี
            </button>
          ) : (
            <p className="confirmation-message">
              บัญชีของคุณถูกปิดเรียบร้อยแล้ว
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CloseAccountPage;
