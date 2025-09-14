import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    password: "",
    role: "guest",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:6868/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi tạo user");
      const data = await res.json();
      alert("Tạo user thành công! ID: " + data.id);
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="ten"
        placeholder="Tên"
        value={formData.ten}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      >
        <option value="guest">Guest</option>
        <option value="visitor">Visitor</option>
        <option value="operator">Operator</option>
        <option value="staff">Staff</option>
         <option value="sponsor">sponsor</option>
      </select>
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Tạo
      </button>
    </div>
  );
}

export default UserForm;