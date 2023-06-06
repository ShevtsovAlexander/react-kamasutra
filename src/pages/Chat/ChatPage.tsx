import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';
import { ChatMessageType } from '../../API/chat-api';

const ChatPage: React.FC = () => {
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
  }, [dispatch]);
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
export const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div style={{ height: '400px', overflow: 'auto' }} onScroll={scrollHandler}>
      {React.useMemo(() => messages.map((m) => <Message key={m.id} message={m} />), [messages])}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};
export const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  return (
    <div>
      <img alt="Chat Avatar" style={{ width: '30px', height: ' 30px' }} src={message.photo} /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
});
export const AddMessageForm: React.FC = React.memo(() => {
  const [message, setMessage] = useState('');
  const dispatch: any = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);
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
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
          Add Message
        </button>
      </div>
    </div>
  );
});
export default ChatPage;
