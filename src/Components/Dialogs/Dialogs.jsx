import React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import dialogs from './Dialogs.module.css';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';

const Dialogs = (props) => {
  const state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((node) => <Dialog key={node.id} name={node.name} id={node.id} />);
  let messagesElements = state.messages.map((node) => <Message key={node.id} message={node.message} />);
  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessageCreator();
  };

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBodyCreator(body);
  };
  return (
    <div className={dialogs.dialogs}>
      <div> {dialogsElements}</div>
      <div className={dialogs.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder="Enter your message"></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
