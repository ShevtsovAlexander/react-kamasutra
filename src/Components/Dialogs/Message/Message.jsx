import React from 'react';
import message from './Message.module.css';

const Message = (props) => {
  return <div className={message.item}>{props.message}</div>;
};

export default Message;
