import { Paperclip } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");
const API = "http://localhost:8000/api/messages";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const fileInputRef = useRef(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // ✅ Socket connect hone pe ID save karo
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Socket connected:", socket.id);
    });

    // ✅ AI / Admin reply receive karo
    socket.on("receive-reply", (data) => {
      setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
    });

    // ✅ Cleanup dono listeners
    return () => {
      socket.off("connect");
      socket.off("receive-reply");
    };
  }, []);

  // ✅ Auto scroll to bottom jab bhi message aaye
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) return;
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const msgSubmit = async () => {
    if (!input.trim() && !selectedFile) return;

    // ✅ User ka message UI mein add karo
    const newMsg = {
      text: input,
      sender: "user",
      file: selectedFile
        ? {
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
            type: selectedFile.type,
          }
        : null,
    };
    setMessages((prev) => [...prev, newMsg]);

    // ✅ Socket pe bhejo — socketId state se lo
    socket.emit("user-message", {
      text: input,
      userId: socketId || socket.id, // fallback bhi rakho
      name: userInfo.name,
      email: userInfo.email,
      fileName: selectedFile?.name || null,
    });

    // ✅ DB mein save karo
    try {
      const formData = new FormData();
      formData.append("message", input);
      formData.append("name", userInfo.name);
      formData.append("email", userInfo.email);
      if (selectedFile) formData.append("file", selectedFile);
      await fetch(API, { method: "POST", body: formData });
    } catch (err) {
      console.error("DB save error:", err);
    }

    setInput("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderFilePreview = (file) => {
    if (!file) return null;
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={file.url}
          alt={file.name}
          style={{ maxWidth: "100%", borderRadius: "6px", marginTop: "4px" }}
        />
      );
    }
    return (
      <a
        href={file.url}
        download={file.name}
        style={{ display: "block", marginTop: "4px", color: "#007bff", fontSize: "12px" }}
      >
        📎 {file.name}
      </a>
    );
  };

  return (
    <>
      <style>{`
        .chatbot-btn {
          position: fixed; bottom: 20px; right: 20px;
          background: #007bff; color: white;
          border: none; border-radius: 50%;
          width: 60px; height: 60px;
          font-size: 24px; cursor: pointer; z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,123,255,0.4);
        }
        .chatbot-box {
          position: fixed; bottom: 90px; right: 20px;
          width: 300px; height: 420px;
          background: white; border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          display: flex; flex-direction: column;
          overflow: hidden; z-index: 1000;
        }
        .chatbot-header {
          background: #007bff; color: white;
          padding: 10px; font-weight: bold;
        }
        .chatbot-body {
          flex: 1; padding: 10px;
          overflow-y: auto; font-size: 14px;
          display: flex; flex-direction: column;
        }
        .msg {
          margin-bottom: 8px; padding: 6px 10px;
          border-radius: 8px; max-width: 80%;
          word-break: break-word;
        }
        .user { background: #007bff; color: white; margin-left: auto; }
        .bot { background: #eee; color: #333; margin-right: auto; }
        .chatbot-input { border-top: 1px solid #ccc; }
        .file-preview-bar {
          display: flex; align-items: center;
          gap: 6px; padding: 4px 10px;
          background: #f0f4ff; font-size: 12px; color: #333;
        }
        .file-preview-bar button {
          background: none; border: none;
          color: red; cursor: pointer; font-size: 14px; padding: 0;
        }
        .input-row { display: flex; align-items: center; }
        .clip-btn {
          background: none; border: none;
          font-size: 18px; padding: 8px 10px;
          cursor: pointer; color: #555;
        }
        .clip-btn:hover { color: #007bff; }
        .input-row input[type="text"] {
          flex: 1; border: none;
          padding: 10px 0; outline: none; font-size: 14px;
        }
        .send-btn {
          background: #007bff; color: white;
          border: none; padding: 10px 15px;
          cursor: pointer; font-size: 14px;
        }
        .send-btn:hover { background: #0056b3; }
        .form-input {
          padding: 8px 10px; border: 1px solid #ccc;
          border-radius: 6px; font-size: 14px; outline: none;
        }
        .form-input:focus { border-color: #007bff; }
        .form-btn {
          padding: 8px; background: #007bff; color: white;
          border: none; border-radius: 6px;
          cursor: pointer; font-size: 14px;
        }
      `}</style>

      <button className="chatbot-btn" onClick={() => setOpen(!open)}>💬</button>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">💬 Chat Support</div>

          {showForm ? (
            <form
              onSubmit={handleFormSubmit}
              style={{ padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                className="form-input"
                type="text" placeholder="Your Name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <input
                className="form-input"
                type="email" placeholder="Your Email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
              <button className="form-btn" type="submit">Start Chat</button>
            </form>
          ) : (
            <>
              {/* ✅ ref lagaya auto scroll ke liye */}
              <div className="chatbot-body" ref={chatBodyRef}>
                {messages.length === 0 && (
                  <p style={{ color: "#888", fontSize: "13px" }}>
                    Hello {userInfo.name}! How can I help you?
                  </p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`msg ${m.sender}`}>
                    {m.text}
                    {m.file && renderFilePreview(m.file)}
                  </div>
                ))}
              </div>

              <div className="chatbot-input">
                {selectedFile && (
                  <div className="file-preview-bar">
                    📎 {selectedFile.name}
                    <button onClick={() => { setSelectedFile(null); fileInputRef.current.value = ""; }}>✕</button>
                  </div>
                )}

                <div className="input-row">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button className="clip-btn" onClick={() => fileInputRef.current.click()}>
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && msgSubmit()}
                  />
                  <button className="send-btn" onClick={msgSubmit}>Send</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}