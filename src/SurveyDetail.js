import React, { useState } from "react";

const SurveyDetail = () => {
  const [userId, setUserId] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    if (!userId || !surveyId) {
      alert("Vui lòng nhập User ID và Survey ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://127.0.0.1:6868/api/operators/${userId}/surveys/${surveyId}/results`,
        { headers: { accept: "application/json" } }
      );

      if (!response.ok) {
        throw new Error("Không thể tải kết quả khảo sát");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Chi tiết kết quả khảo sát</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          User ID:{" "}
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Survey ID:{" "}
          <input
            type="number"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        </label>
        <button onClick={fetchResults}>Xem kết quả</button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {results && results.responses && (
        <div>
          <h3>Survey ID: {results.survey_id}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.responses.map((res, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>User ID:</strong> {res.user_id}</p>
                <p><strong>Trả lời:</strong> {res.tra_loi}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SurveyDetail;