import React, { useState } from "react";

function SponsorVisitors() {
  const [sponsorId, setSponsorId] = useState("");
  const [visitors, setVisitors] = useState([]);

  const handleFetchVisitors = async () => {
    if (!sponsorId) {
      alert("Vui lòng nhập Sponsor ID");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:6868/api/sponsors/${sponsorId}/visitors`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể lấy danh sách visitor");
      }

      const data = await response.json();
      setVisitors(data.visitors || []);
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
      <button onClick={handleFetchVisitors}>Lấy danh sách</button>

      {visitors.length > 0 ? (
        <table style={{ marginTop: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>User ID</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Tên</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr key={v.user_id}>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{v.user_id}</td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{v.ten}</td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{v.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{v.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default SponsorVisitors;