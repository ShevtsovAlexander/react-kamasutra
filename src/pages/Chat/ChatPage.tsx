import * as React from 'react';
import { useEffect, useState } from 'react';

type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
export const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
  useEffect(() => {
    let ws: WebSocket;
    const closeHenlder = () => {
      console.log(ws);
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener('close', closeHenlder);
      ws?.close();

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', closeHenlder);
      setWsChannel(ws);
    }
    createChannel();
    return () => {
      ws.removeEventListener('close', closeHenlder);
      ws.close();
    };
  }, []);
  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};
export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, sendMessage] = useState<chatMessageType[]>([]);
  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      sendMessage((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wsChannel?.addEventListener('message', messageHandler);

    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);
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
      <img alt="Chat Avatar" style={{ width: '30px', height: ' 30px' }} src={message.photo} /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};
export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    };
    wsChannel?.addEventListener('open', openHandler);

    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);
  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel?.send(message);
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
        <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>
          Add Message
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
