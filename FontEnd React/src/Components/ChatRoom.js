import { Row, Col, Card, Container, Badge } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const ChatRoom = ({ messages, sendMessage, userData }) => (
  <Container className="py-4" style={{ maxWidth: '900px' }}>
    <Row className="justify-content-center">
      <Col>
        <Card className="border-0 shadow-lg overflow-hidden">
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center border-0">
            <div>
              <h4 className="mb-0 text-primary">💬 {userData?.chatroom || 'Team Chat'}</h4>
              <small className="text-muted">Connected as {userData?.username}</small>
            </div>
            <Badge pill bg="primary" className="px-3 py-2">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </Badge>
          </Card.Header>

          <Card.Body 
            className="message-area p-0"
            style={{ 
              height: '65vh',
              overflowY: 'auto',
              background: '#ffffff'
            }}
          >
            <MessageContainer messages={messages} />
          </Card.Body>

          <Card.Footer className="bg-white p-3 border-top">
            <SendMessageForm sendMessage={sendMessage} />
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ChatRoom;