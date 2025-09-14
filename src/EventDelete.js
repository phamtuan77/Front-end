import React, { useState } from "react";

function EventDelete() {
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    if (!eventId || !userId) {
      alert("⚠️ Vui lòng nhập đầy đủ Event ID và Operator ID!");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:6868/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: parseInt(userId) }),
      });

      if (!res.ok) {
        throw new Error("Xóa sự kiện thất bại!");
      }

      const data = await res.json();
      alert("✅ " + (data.message || "Xóa sự kiện thành công!"));

      setEventId(""); 
      setUserId("");
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="number"
        placeholder="Nhập Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nhập Operator ID "
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px", background: "red", color: "white" }}
      >
        Xóa sự kiện
      </button>
    </div>
  );
}

export default EventDelete;