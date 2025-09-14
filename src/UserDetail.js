import React, { useState } from "react";

function UserDetail() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:6868/api/users/${userId}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Nhập user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFetch}>Xem</button>

      {user && (
        <div style={{ marginTop: "10px" }}>
          <p><b>ID:</b> {user.id}</p>
          <p><b>Tên:</b> {user.ten}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;