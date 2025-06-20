import { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom, isConnecting }) => {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && chatroom.trim()) {
      joinChatRoom(username, chatroom);
    }
  };

  return (
    <Card className="border-0 shadow-lg floating" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card.Header className="bg-white border-0 py-4">
        <h4 className="mb-0 text-center text-primary">Join Professional Chat</h4>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="text-muted">Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-3"
              style={{ borderRadius: '12px' }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-muted">Team Channel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chat room name"
              value={chatroom}
              onChange={(e) => setChatroom(e.target.value)}
              className="py-3"
              style={{ borderRadius: '12px' }}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              className="py-3"
              style={{ 
                borderRadius: '12px',
                background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                border: 'none'
              }}
              disabled={!username.trim() || !chatroom.trim() || isConnecting}
            >
              {isConnecting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Connecting...
                </>
              ) : 'Join Secure Chat'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WaitingRoom;