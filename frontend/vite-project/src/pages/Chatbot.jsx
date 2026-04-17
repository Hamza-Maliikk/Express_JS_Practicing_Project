import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const API = "http://localhost:8000/api/messages";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.name || !userInfo.email) return;

    setShowForm(false); // 👈 form band, chat open
  };

  const msgSubmit = async () => {
    if (!input.trim()) return;

    // user message add
    const newMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);

    socket.emit("user-message", {
      text: input,
      userId: socket.id,
      name: userInfo.name,
      email: userInfo.email,
    });

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          name: userInfo.name,
          email: userInfo.email,
        }),
      });

      const data = await res.json();

      // bot reply
      const botMsg = {
        text: data.reply || "No response",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <>
      <style>{`
        .chatbot-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
        }

        .chatbot-box {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 300px;
          height: 400px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
        }

        .chatbot-header {
          background: #007bff;
          color: white;
          padding: 10px;
          font-weight: bold;
        }

        .chatbot-body {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          font-size: 14px;
        }

        .msg {
          margin-bottom: 8px;
          padding: 6px 10px;
          border-radius: 8px;
          max-width: 80%;
        }

        .user {
          background: #007bff;
          color: white;
          margin-left: auto;
        }

        .bot {
          background: #eee;
        }

        .chatbot-input {
          display: flex;
          border-top: 1px solid #ccc;
        }

        .chatbot-input input {
          flex: 1;
          border: none;
          padding: 10px;
          outline: none;
        }

        .chatbot-input button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
        }
      `}</style>

      {/* Button */}
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">Chat Support</div>

          {/* 🔥 STEP 1: FORM */}
          {showForm ? (
            <form
              onSubmit={handleFormSubmit}
              style={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Your Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />

              <button type="submit">Start Chat</button>
            </form>
          ) : (
            <>
              {/* 🔥 STEP 2: CHAT */}
              <div className="chatbot-body">
                {messages.length === 0 && (
                  <p>👋 Hello {userInfo.name}! How can I help you?</p>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={`msg ${m.sender}`}>
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="chatbot-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={msgSubmit}>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
