// TicketPayment.js
import React, { useState } from "react";

function TicketPayment() {
  const [ticketId, setTicketId] = useState("");
  const [userId, setUserId] = useState("");
  const [giaVe, setGiaVe] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!ticketId || !userId || !giaVe) {
      alert("Vui lòng nhập đủ Ticket ID, User ID và Giá vé");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:6868/api/tickets/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticket_id: Number(ticketId),
          user_id: Number(userId),
          gia_ve: Number(giaVe),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err);
        setResult(null);
        return;
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError({ message: err.message });
      setResult(null);
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
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Giá vé:{" "}
          <input
            type="number"
            value={giaVe}
            onChange={(e) => setGiaVe(e.target.value)}
          />
        </label>
        <button onClick={handlePayment} style={{ marginLeft: "10px" }}>
          Thanh toán
        </button>
      </div>

      {result && (
        <div style={{ marginTop: "10px", color: "green" }}>
          <h4>Thanh toán thành công</h4>
          <p><strong>Ticket ID:</strong> {result.ticket_id}</p>
          <p><strong>Event ID:</strong> {result.event_id}</p>
          <p><strong>Owner ID:</strong> {result.owner_id}</p>
          <p><strong>Giá vé:</strong> {result.gia_ve}</p>
          <p><strong>Trạng thái:</strong> {result.trang_thai}</p>
          <p><strong>Đã thanh toán:</strong> {result.da_thanh_toan ? "Có" : "Chưa"}</p>
          <p><strong>QR Code:</strong> {result.qr_code || "Chưa có"}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <h4>Lỗi:</h4>
          <p>{error.message || JSON.stringify(error)}</p>
        </div>
      )}
    </div>
  );
}

export default TicketPayment;