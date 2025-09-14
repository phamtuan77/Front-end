import React, { useState } from "react";

function SponsorCheckIn() {
  const [sponsorId, setSponsorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async () => {
    if (!sponsorId || !qrCode) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:6868/api/sponsors/${sponsorId}/scan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qr_code: qrCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Quét QR code thất bại");
      }

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Sponsor ID"
        value={sponsorId}
        onChange={(e) => setSponsorId(e.target.value)}
      />
      <input
        type="text"
        placeholder="QR Code"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
      />
      <button onClick={handleScan}>Quét QR Code</button>

      {scanResult && (
        <div style={{ marginTop: "10px" }}>
          <p><b>Event ID:</b> {scanResult.event_id}</p>
          <p><b>Ticket ID:</b> {scanResult.ticket_id}</p>
          <p><b>Visitor:</b></p>
          <ul>
            <li><b>User ID:</b> {scanResult.visitor.user_id}</li>
            <li><b>Tên:</b> {scanResult.visitor.ten}</li>
            <li><b>Email:</b> {scanResult.visitor.email}</li>
            <li><b>Role:</b> {scanResult.visitor.role}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SponsorCheckIn;