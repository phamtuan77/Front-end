import React, { useState } from "react";
import EventList from "./EventList"; // Danh sách sự kiện
import EventDetail from "./EventDetail"; // Chi tiết sự kiện
import SurveyResponse from "./SurveyResponse"; // Người dùng trả lời khảo sát
import EventForm from "./EventForm"; // Form tạo sự kiện mới
import EventUpdate from "./EventUpdate"; // Cập nhật thông tin sự kiện
import EventDelete from "./EventDelete"; // Xóa sự kiện
import SurveyForm from "./SurveyForm"; // Form tạo khảo sát
import TicketRegister from "./TicketRegister"; // Đăng ký vé
import TicketPayment from "./TicketPayment"; // Thanh toán vé
import TicketInfo from "./TicketInfo"; // Xem thông tin vé
import StaffCheckIn from "./StaffCheckin"; // Nhân viên check-in
import SponsorCheckIn from "./SponsorCheckin"; // Nhà tài trợ check-in
import SponsorVisitor from "./SponsorVisitor"; // Quản lý khách/khách mời của nhà tài trợ
import UserCreate from "./UserForm"; // Tạo tài khoản người dùng
import UserDetail from "./UserDetail"; // Xem chi tiết người dùng
import Report from "./Report"; // Báo cáo thống kê
import EventSurveys from "./EventSurveys"; // Danh sách khảo sát của sự kiện
import OperatorTickets from "./OperatorTickets"; // Quản lý vé (operator)
import OperatorSurveyResult from "./OperatorSurveyResults"; // Xem kết quả khảo sát (operator)

function App() {
  const [activeTab, setActiveTab] = useState("users");
  const [eventId, setEventId] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleViewReport = () => {
    if (eventId && operatorId) setShowReport(true);
    else alert("Vui lòng nhập cả Event ID và Operator ID");
  };

  const tabs = [
    { id: "users", label: "Tài khoản" },
    { id: "events", label: "Sự kiện" },
    { id: "tickets", label: "Vé" },
    { id: "checkin", label: "Checkin" },
    { id: "sponsor", label: " Sponsor" },
    { id: "surveys", label: "Khảo sát" },
    { id: "operator", label: "Operator" },
  ];

  const cardStyle = {
    background: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  };

  const titleStyle = {
    color: "#2563eb",
    marginBottom: "10px",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f7f9fc", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#2563eb",
          color: "white",
          padding: "15px 20px",
          fontSize: "22px",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        Phầm mềm quản lý sự kiện
      </header>

      {/* Menu */}
      <nav
        style={{
          display: "flex",
          gap: "10px",
          padding: "15px 20px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          flexWrap: "wrap",}}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: activeTab === tab.id ? "#2563eb" : "#f3f4f6",
              color: activeTab === tab.id ? "white" : "#374151",
              fontWeight: "500",transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Nội dung */}
      <main style={{ padding: "20px" }}>
        {activeTab === "users" && (
          <div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Tạo tài khoản</h2>
              <UserCreate />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Chi tiết tài khoản</h2>
              <UserDetail />
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Danh sách sự kiện</h2>
              <EventList />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Chi tiết sự kiện</h2>
              <EventDetail />
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Đăng ký vé</h2>
              <TicketRegister />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Thanh toán vé</h2>
              <TicketPayment />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Thông tin vé</h2>
              <TicketInfo />
            </div>
          </div>
        )}

        {activeTab === "checkin" && (
          <div style={cardStyle}>
            <h2 style={titleStyle}>Kiểm tra vé</h2>
            <StaffCheckIn />
          </div>
        )}

        {activeTab === "sponsor" && (
          <div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Quét qr code khách ghé</h2>
              <SponsorCheckIn />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Danh sách khách đã ghé</h2>
              <SponsorVisitor />
            </div>
          </div>
        )}

        {activeTab === "surveys" && (
          <div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Danh sách khảo sát</h2>
              <EventSurveys />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Trả lời khảo sát</h2>
              <SurveyResponse />
            </div>
          </div>
        )}

        {activeTab === "operator" && (
          <div>
            <div style={cardStyle}><h2 style={titleStyle}>Quản lý sự kiện</h2>
              <EventForm />
              <EventUpdate />
              <EventDelete />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Quản lý khảo sát</h2>
              <SurveyForm />
              <OperatorSurveyResult />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Danh sách đăng ký</h2><OperatorTickets />
            </div>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Thống kê</h2>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  Event ID:{" "}
                  <input
                    type="number"
                    value={eventId}
                    onChange={(e) => {
                      setEventId(e.target.value);
                      setShowReport(false);
                    }}
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </label>
                <label>
                  Operator ID:{" "}
                  <input
                    type="number"
                    value={operatorId}
                    onChange={(e) => {
                      setOperatorId(e.target.value);
                      setShowReport(false);
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </label>
                <button
                  onClick={handleViewReport}
                  style={{
                    marginLeft: "10px",
                    padding: "6px 12px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Xem báo cáo
                </button>
              </div>
              {showReport && <Report eventId={eventId} operatorId={operatorId} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;