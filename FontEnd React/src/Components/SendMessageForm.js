import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
  const [msg, setMsg] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (msg.trim()) {
          sendMessage(msg);
          setMsg("");
        }
      }}
    >
      <InputGroup className="mb-0">
        <Form.Control
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          placeholder="Type your professional message..."
          className="py-3"
          style={{ 
            borderRadius: '12px 0 0 12px',
            border: '1px solid #dee2e6',
            borderRight: 'none'
          }}
        />
        <Button 
          variant="primary" 
          type="submit" 
          disabled={!msg}
          style={{ 
            borderRadius: '0 12px 12px 0',
            background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
            border: 'none'
          }}
          className="px-4"
        >
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;