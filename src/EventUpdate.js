import React, { useState } from "react";

function EventUpdate() {
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const [newName, setNewName] = useState("");
  const [newFee, setNewFee] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleUpdate = async () => {
    if (!eventId || !userId || !newName || !newFee || !newDate || !newLocation) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:6868/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          ten_moi: newName,
          phi_moi: parseInt(newFee),
          ngay: newDate,
          dia_diem: newLocation,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("Cập nhật sự kiện thất bại! " + errText);
      }

      const data = await res.json();
      alert(
        `✅ Sự kiện đã cập nhật!\nID: ${data.event_id}\nTên: ${data.ten_su_kien}\nNgày: ${data.ngay}\nĐịa điểm: ${data.dia_diem}\nPhí: ${data.phi_tham_du}`
      );

      // reset form
      setEventId("");
      setUserId("");
      setNewName("");
      setNewFee("");
      setNewDate("");
      setNewLocation("");
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
        placeholder="Nhập Operator ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <input
        type="text"
        placeholder="Tên sự kiện mới"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <input
        type="number"
        placeholder="Phí mới"
        value={newFee}
        onChange={(e) => setNewFee(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <input
        type="text"
        placeholder="Ngày mới "
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <input
        type="text"
        placeholder="Địa điểm mới"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button
        onClick={handleUpdate}
        style={{ marginLeft: "10px", background: "blue", color: "white" }}
      >
        Cập nhật sự </button>
    </div>
  );
}

export default EventUpdate;