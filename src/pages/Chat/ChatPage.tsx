import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
export type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
export const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
export const Messages: React.FC = () => {
  const [messages, sendMessage] = useState<chatMessageType[]>([]);
  useEffect(() => {
    ws.addEventListener('message', (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      sendMessage((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((m: chatMessageType) => (
        <Message message={m} />
      ))}
    </div>
  );
};
export const Message: React.FC<{ message: chatMessageType }> = ({ message }) => {
  return (
    <div key={message.userId}>
      <img style={{ width: '30px', height: ' 30px' }} src={message.photo} /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};
export const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (!message) {
      return;
    }
    ws.send(message);
    setMessage(' ');
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
          placeholder={'Enter your message...'}
        ></textarea>
      </div>
      <div>
        {' '}
        <button onClick={sendMessage}>Add Message</button>
      </div>
    </div>
  );
};
export default ChatPage;
