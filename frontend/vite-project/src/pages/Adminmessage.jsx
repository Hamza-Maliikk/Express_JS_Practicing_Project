import React from 'react'
import { io } from "socket.io-client";

const API = "http://localhost:8000/api/messages";
const socket = io("http://localhost:8000");

const Adminmessage = () => {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        // Pehle database se purane messages load karo
        fetch(API)
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error("Error fetching messages:", err));

        // Admin room join karo
        socket.emit("join-admin");

        // Real-time naye messages suno
        socket.on("receive-message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        // Cleanup
        return () => {
            socket.off("receive-message");
        };
    }, []);   

  return (
    <div>
      <h1>Admin Messages</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={msg._id || i}>
            <strong>{msg.name}:</strong> {msg.message || msg.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Adminmessage