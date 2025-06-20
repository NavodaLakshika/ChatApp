import React from "react";
import { Container } from "react-bootstrap";

const MessageContainer = ({ messages }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container fluid className="message-container p-4">
      {messages.map((msg) => (
        <div 
          key={msg.id}
          className={`message ${msg.isSystem ? 'system-message' : ''} ${msg.isWelcome ? 'welcome-message' : ''} ${msg.username === 'You' ? 'own-message' : ''} message-animation`}
        >
          {msg.username !== 'System' && msg.username !== 'You' && (
            <div className="user-avatar">
              {msg.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="message-content-wrapper">
            <div className="message-header">
              <strong className="message-username">
                {msg.username}
                {msg.status && (
                  <span className={`status-indicator status-${msg.status}`}></span>
                )}
              </strong>
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
            <div className="message-content">{msg.msg}</div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default MessageContainer;