import { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WaitingRoom from "./Components/waitingroom";
import ChatRoom from "./Components/ChatRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

// ✅ Generate unique ID using crypto or fallback
const generateUniqueId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

const App = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const joinChatRoom = async (username, chatroom) => {
    try {
      setIsConnecting(true);

      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5016/chat", { withCredentials: true })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      conn.on("ReceiveMessage", (user, message) => {
        setMessages((prev) => [
          ...prev,
          {
            username: user,
            msg: message,
            timestamp: new Date(),
            id: generateUniqueId(), // ✅ fixed
          },
        ]);
      });

      conn.on("UserJoined", (user) => {
        setMessages((prev) => [
          ...prev,
          {
            username: "System",
            msg: `${user} has joined the chat`,
            isSystem: true,
            timestamp: new Date(),
            id: generateUniqueId(), // ✅ fixed
          },
        ]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(conn);
      setUserData({ username, chatroom });

      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          msg: `Welcome to ${chatroom}, ${username}!`,
          isSystem: true,
          isWelcome: true,
          timestamp: new Date(),
          id: generateUniqueId(), // ✅ fixed
        },
      ]);
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const sendMessage = async (message) => {
    const tempId = generateUniqueId(); // ✅ fixed

    try {
      if (connection) {
        setMessages((prev) => [
          ...prev,
          {
            username: "You",
            msg: message,
            timestamp: new Date(),
            id: tempId,
            status: "sending",
          },
        ]);

        await connection.invoke("SendMessage", message);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: "sent" } : msg
          )
        );
      }
    } catch (error) {
      console.error("Send message error:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  return (
    <div className={`app-container ${connection ? "connected" : ""}`}>
      <Container className="py-4">
        <div className="app-header">
          <h1 className="app-title animate-charcter">ChatApp Pro</h1>
          <p className="app-subtitle">Secure enterprise messaging solution</p>
        </div>

        {!connection ? (
          <WaitingRoom joinChatRoom={joinChatRoom} isConnecting={isConnecting} />
        ) : (
          <ChatRoom
            messages={messages}
            sendMessage={sendMessage}
            userData={userData}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
