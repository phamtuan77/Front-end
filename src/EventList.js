import React, { useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    fetch("http://127.0.0.1:6868/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setShowList(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  };

  return (
    <div>
      {!showList && (
        <button onClick={fetchEvents}>
          Hiển thị danh sách sự kiện
        </button>
      )}

      {loading && <p>Đang tải...</p>}

      {showList && !loading && (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sự kiện</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.ten_su_kien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventList;