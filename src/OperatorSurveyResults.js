import React, { useState } from "react";

const OperatorSurveyResults = () => {
  const [operatorId, setOperatorId] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    if (!operatorId || !surveyId) {
      alert("Vui lòng nhập cả Operator ID và Survey ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://127.0.0.1:6868/api/operators/${operatorId}/surveys/${surveyId}/results`,
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
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginTop: "10px" }}>
      <h4>Xem kết quả khảo sát</h4>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Operator ID:{" "}
          <input
            type="number"
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
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

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {results && (
        <div>
          <h5>Survey ID: {results.survey_id}</h5>
          <ul>
            {results.responses.map((res, idx) => (
              <li key={idx}>
                <strong>User ID:</strong> {res.user_id} | <strong>Trả lời:</strong> {res.tra_loi}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OperatorSurveyResults;