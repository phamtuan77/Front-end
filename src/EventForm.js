import React, { useState } from "react";

function EventForm() {
  const [tenSuKien, setTenSuKien] = useState("");
  const [phiThamDu, setPhiThamDu] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [ngay, setNgay] = useState("");
  const [diaDiem, setDiaDiem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      ten_su_kien: tenSuKien,
      phi_tham_du: Number(phiThamDu),
      user_id: Number(operatorId),
      ngay: ngay,
      dia_diem: diaDiem,
    };

    try {
      const response = await fetch("http://127.0.0.1:6868/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tạo sự kiện thất bại: ${errorText}`);
      }

      const data = await response.json();
      alert(
        `✅ Tạo sự kiện thành công!\nID: ${data.event_id}\nTên: ${data.ten_su_kien}\nNgày: ${data.ngay}\nĐịa điểm: ${data.dia_diem}`
      );
    } catch (error) {
      alert("❌ Lỗi: " + error.message);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Tạo sự kiện mới</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sự kiện: </label>
          <input
            type="text"
            value={tenSuKien}
            onChange={(e) => setTenSuKien(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phí tham dự: </label>
          <input
            type="number"
            value={phiThamDu}
            onChange={(e) => setPhiThamDu(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ngày tổ chức: </label>
          <input
            type="text"
            placeholder=""
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Địa điểm: </label>
          <input
            type="text"
            value={diaDiem}
            onChange={(e) => setDiaDiem(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Operator ID: </label>
          <input
            type="number"
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tạo sự kiện</button>
      </form>
    </div>
  );
}

export default EventForm;