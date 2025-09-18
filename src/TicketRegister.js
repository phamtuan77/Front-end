import React, { useState } from "react";

function TicketRegister() {
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:6868/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: parseInt(eventId),
        user_id: parseInt(userId),
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="number"
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Đăng ký vé</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Kết quả đăng ký vé</h3>
          <p><strong>Ticket ID:</strong> {result.ticket_id}</p>
          <p><strong>Event ID:</strong> {result.event_id}</p>
          <p><strong>Owner ID:</strong> {result.owner_id}</p>
          <p><strong>Giá vé:</strong> {result.gia_ve}</p>
          <p><strong>Trạng thái:</strong> {result.trang_thai}</p>
          <p><strong>Đã thanh toán:</strong> {result.da_thanh_toan ? "Có" : "Chưa"}</p>
          <p><strong>QR Code:</strong> {result.qr_code || "Chưa có"}</p>
        </div>
      )}
    </div>
  );
}

export default TicketRegister;