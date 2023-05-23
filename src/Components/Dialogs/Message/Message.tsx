import * as React from 'react';
import message from './Message.module.css';

type PropsType = {
  message: string;
};
const Message: React.FC<PropsType> = (props) => {
  return <div className={message.item}>{props.message}</div>;
};

export default Message;
