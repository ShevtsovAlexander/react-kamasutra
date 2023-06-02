import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';
import { chatMessageType } from '../../API/chat-api';

export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
export const Chat: React.FC = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
export const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

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
export const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch: any = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
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
        <button onClick={sendMessageHandler}>Add Message</button>
      </div>
    </div>
  );
};
export default ChatPage;
