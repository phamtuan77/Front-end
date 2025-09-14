import React, { useState } from "react";

function SurveyResponse() {
  const [surveyId, setSurveyId] = useState("");
  const [userId, setUserId] = useState("");
  const [traLoi, setTraLoi] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:6868/api/surveys/${surveyId}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tra_loi: traLoi, user_id: parseInt(userId) }),
    });

    const data = await response.json();
    setMessage(data.message || "Trả lời thành công");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Survey ID"
          value={surveyId}
          onChange={(e) => setSurveyId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Câu trả lời"
          value={traLoi}
          onChange={(e) => setTraLoi(e.target.value)}
          required
        />
        <button type="submit">Gửi trả lời</button>
      </form>

      {/* ✅ Chỉ in 1 lần */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SurveyResponse;