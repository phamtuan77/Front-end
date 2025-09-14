// src/EventDetail.js
import React, { useState } from "react";

function EventDetail() {
  const [eventId, setEventId] = useState(""); // state để lưu event_id nhập vào
  const [event, setEvent] = useState(null);   // state để lưu thông tin sự kiện lấy về

  // Hàm gọi API để lấy chi tiết sự kiện
  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:6868/api/events/${eventId}`);
      if (!res.ok) throw new Error("Không tìm thấy sự kiện"); // Nếu API trả lỗi
      const data = await res.json();
      setEvent(data); // Lưu sự kiện vào state
    } catch (err) {
      alert(err.message); // Hiển thị lỗi
      setEvent(null);
    }
  };

  return (
    <div>
      {/* Ô nhập Event ID */}
      <input
        type="number"
        placeholder="Nhập event_id"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      {/* Nút gọi API */}
      <button onClick={fetchEvent}>Xem chi tiết</button>

      {/* Hiển thị chi tiết sự kiện nếu có */}
      {event && (
        <div style={{ marginTop: "10px" }}>
          <p><b>ID:</b> {event.event_id}</p>
          <p><b>Tên sự kiện:</b> {event.ten_su_kien}</p>
          <p><b>Ngày:</b> {event.ngay}</p>
          <p><b>Phí tham dự:</b> {event.phi_tham_du}</p>
          <p><b>Địa điểm:</b> {event.dia_diem}</p> {/* ✅ bổ sung trường địa điểm */}
        </div>
      )}
    </div>
  );
}

export default EventDetail;