// TicketPayment.js
import React, { useState } from "react";

function TicketPayment() {
  const [ticketId, setTicketId] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!ticketId || !userId) {
      alert("Vui lòng nhập cả Ticket ID và User ID");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:6868/api/tickets/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket_id: Number(ticketId), user_id: Number(userId) }),
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
      setError(err.message);
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
          />
        </label>
        <button onClick={handlePayment} style={{ marginLeft: "10px" }}>Thanh toán</button>
      </div>

      {result && (
        <div style={{ marginTop: "10px", color: "green" }}>
          <h4>Thanh toán thành công:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <h4>Lỗi:</h4>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TicketPayment;