import React, { useState } from "react";

const SurveyForm = ({ onCreated }) => {


  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const body = {
      title,
      description,
      event_id: parseInt(eventId, 10),
    };

    fetch(`http://127.0.0.1:6868/api/operators/${userId}/surveys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          let errorData = { code: res.status, message: "Unknown error" };

          if (contentType && contentType.includes("application/json")) {
            const json = await res.json();
            errorData.message = json.message || JSON.stringify(json);
          } else {
            errorData.message = await res.text();
          }

          throw errorData;
        }

        return res.json();
      })
      .then((data) => {
        setSuccess(`Tạo khảo sát thành công: ID ${data.survey_id}`);
        setLoading(false);
        setTitle("");
        setDescription("");
        setEventId(1);
        onCreated && onCreated(data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>Tạo khảo sát mới</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Operator ID : </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event ID: </label>
          <input
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tiêu đề: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo"}
        </button>
      </form>

      {/* Hiển thị lỗi giống Swagger */}
      {error && (<div style={{ color: "red", marginTop: "10px" }}>
         
          <p><strong></strong> {error.message}</p>
        </div>
      )}

      {/* Hiển thị khi thành công */}
      {success && (
        <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
      )}
    </div>
  );
};

export default SurveyForm;