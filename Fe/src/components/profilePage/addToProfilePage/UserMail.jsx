import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//css
import "./UserMail.css";

// const socket = io("http://localhost:8080"); // Kết nối đến server

const MailPage = () => {
  const [mails, setMails] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { userId } = useParams();
  //   console.log(userId);

  // useEffect(() => {
  //   if (!userId) return;
  //   socket.emit("join_room", userId); //tham gia phòng khi vào trang
  //   socket.on("connect", () => {
  //     console.log("🔗 Kết nối thành công:", socket.id);
  //   });
  //   socket.on("connect_error", (err) => {
  //     console.error("❌ Lỗi kết nối:", err.message);
  //   });
  //   // 3️⃣ Lắng nghe sự kiện khi thư được cập nhật
  //   socket.on("mailStatusChanged", (data) => {
  //     console.log("📩 Cập nhật mới từ server:", data);

  //     // Thêm thông báo vào danh sách (hiển thị trên UI)
  //     setNotifications((prev) => [...prev, data]);
  //     console.log(notifications);

  //     // Cập nhật trạng thái thư trong danh sách
  //     setMails((prevMails) =>
  //       prevMails.map((mail) =>
  //         mail._id === data.mailId ? { ...mail, status: data.status } : mail
  //       )
  //     );

  //     // Ẩn thông báo sau 5 giây
  //     setTimeout(() => {
  //       setNotifications((prev) =>
  //         prev.filter((n) => n.mailId !== data.mailId)
  //       );
  //     }, 8000);
  //   });
  //   socket.on("mailStatusChanged", (data) => {
  //     console.log("📩 Cập nhật mới từ server:", data);
  //   });

  //   return () => {
  //     socket.off("mailStatusChanged"); // Cleanup listener khi rời trang
  //   };
  // }, [userId]);

  return (
    <div>
      <h2>📬 Hộp thư</h2>

      {/* Hiển thị thông báo mới */}
      <div className="notifications">
        {notifications.map((n) => (
          <div key={n.mailId} className="notification">
            {n.message}
          </div>
        ))}
      </div>

      {/* Hiển thị danh sách thư */}
      {/* <ul>
        {mails.map((mail) => (
          <li key={mail._id}>
            <p>📜 Nội dung: {mail.content}</p>
            <p>📌 Trạng thái: {mail.status}</p>
            <p>👀 Đã đọc: {mail.isRead ? "✅" : "❌"}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MailPage;
