import React, { useState } from "react";

function StaffCheckIn() {
  const [staffId, setStaffId] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [result, setResult] = useState(null);

  const handleCheckIn = async () => {
    if (!staffId || !ticketId || !qrCode) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:6868/api/staffs/${staffId}/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticket_id: parseInt(ticketId),
          qr_code: qrCode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Check-in thất bại");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Staff ID"
        value={staffId}
        onChange={(e) => setStaffId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <input
        type="text"
        placeholder="QR Code"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
      />
      <button onClick={handleCheckIn}>Check-in</button>

      {result && (
        <div style={{ marginTop: "10px" }}>
          <p>Ticket ID: {result.ticket_id}</p>
          <p>Message: {result.message}</p>
          <p>Check-in status: {result.da_checkin ? "Đã check-in" : "Chưa check-in"}</p>
        </div>
      )}
    </div>
  );
}

export default StaffCheckIn;