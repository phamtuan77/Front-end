import React, { useEffect, useState } from "react";

const Report = ({ eventId, operatorId }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:6868/api/events/${eventId}/report?user_id=${operatorId}`,
          { headers: { accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error("Không thể tải báo cáo");
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [eventId, operatorId]);

  if (loading) return <p>Đang tải báo cáo...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!report) return <p>Không có dữ liệu</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Thống kê sự kiện #{report.event_id}</h2>
      <ul style={{ listStyleType: "none", padding: 0, fontSize: "18px" }}>
        <li><strong>Đã check-in:</strong> {report.da_checkin}</li>
        <li><strong>Đã thanh toán:</strong> {report.da_thanh_toan}</li>
        <li><strong>Tổng vé:</strong> {report.tong_ve}</li>
        <li><strong>Phản hồi khảo sát:</strong> {report.phan_hoi_khao_sat}</li>
      </ul>
    </div>
  );
};

export default Report;