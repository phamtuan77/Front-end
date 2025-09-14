// TicketInfo.js
import React, { useState } from "react";

function TicketInfo() {
  const [ticketId, setTicketId] = useState("");
  const [userId, setUserId] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);

  const handleFetchTicket = async () => {
    if (!ticketId || !userId) {
      alert("Vui lòng nhập Ticket ID và User ID");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:6868/api/tickets/${ticketId}?user_id=${userId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setTicketInfo(data);
    } catch (error) {
      console.error(error);
      alert("Không thể lấy thông tin vé");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
   
      <div style={{ marginBottom: "10px" }}>
        <label>
          Ticket ID:{" "}
          <input
            type="number"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          User ID:{" "}
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <button onClick={handleFetchTicket} style={{ marginLeft: "10px" }}>
          Xem thông tin
        </button>
      </div>

      {ticketInfo && (
        <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
          <p>Ticket ID: {ticketInfo.ticket_id}</p>
          <p>Event ID: {ticketInfo.event_id}</p>
          <p>Owner ID: {ticketInfo.owner_id}</p>
          <p>Trạng thái: {ticketInfo.trang_thai}</p>
          <p>Đã thanh toán: {ticketInfo.da_thanh_toan ? "Có" : "Chưa"}</p>
          <p>QR Code: {ticketInfo.qr_code || "Chưa có"}</p>
        </div>
      )}
    </div>
  );
}

export default TicketInfo;