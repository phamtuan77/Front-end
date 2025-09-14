import React, { useState } from "react";

const EventSurveys = () => {
  const [eventId, setEventId] = useState("");
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSurveys = async () => {
    if (!eventId) {
      alert("Vui lòng nhập Event ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://127.0.0.1:6868/api/events/${eventId}/surveys`,
        { headers: { accept: "application/json" } }
      );

      if (!response.ok) {
        throw new Error("Không thể tải danh sách khảo sát");
      }

      const data = await response.json();
      setSurveys(data);
    } catch (err) {
      setError(err.message);
      setSurveys([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Xem khảo sát</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Event ID:{" "}
          <input
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        </label>
        <button onClick={fetchSurveys}>Xem khảo sát</button>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {!loading && surveys.length === 0 && <p>Không có khảo sát nào.</p>}

      {surveys.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {surveys.map((survey) => (
            <li
              key={survey.survey_id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{survey.title}</h3>
              <p><strong>ID:</strong> {survey.survey_id}</p>
              <p><strong>Mô tả:</strong> {survey.description}</p>
              <p><strong>Event ID:</strong> {survey.event_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventSurveys;