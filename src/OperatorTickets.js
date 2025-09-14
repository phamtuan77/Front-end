import React, { useState } from "react";

function OperatorTickets() {
  const [operatorId, setOperatorId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTickets = async () => {
    if (!operatorId) {
      alert("Vui lòng nhập Operator ID");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:6868/api/tickets/operator/${operatorId}`
      );
      if (!response.ok) {
        throw new Error("Không lấy được danh sách vé");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      alert("❌ Lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      
      <div>
        <label>Operator ID: </label>
        <input
          type="number"
          value={operatorId}
          onChange={(e) => setOperatorId(e.target.value)}
        />
        <button onClick={handleFetchTickets} style={{ marginLeft: "10px" }}>
          Xem vé
        </button>
      </div>

      {loading && <p>⏳ Đang tải...</p>}

      {tickets.length > 0 && (
        <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Event ID</th>
              <th>Owner ID</th>
              <th>Owner Name</th>
              <th>Trạng thái</th>
              <th>Đã thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticket_id}>
                <td>{t.ticket_id}</td>
                <td>{t.event_id}</td>
                <td>{t.owner_id}</td>
                <td>{t.owner_name}</td>
                <td>{t.trang_thai}</td>
                <td>{t.da_thanh_toan ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tickets.length === 0 && !loading && (
        <p>Không có vé nào để hiển thị.</p>
      )}
    </div>
  );
}

export default OperatorTickets;