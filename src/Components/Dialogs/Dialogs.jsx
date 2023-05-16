import React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import dialogs from './Dialogs.module.css';
import AddMessageForm from './AddMessageForm/AddMessageForm';

const Dialogs = (props) => {
  const state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((node) => <Dialog key={node.id} name={node.name} id={node.id} />);
  let messagesElements = state.messages.map((node) => <Message key={node.id} message={node.message} />);

  let addNewMessage = (value) => {
    props.sendMessageCreator(value.newMessageBody);
  };
  return (
    <div className={dialogs.dialogs}>
      <div> {dialogsElements}</div>
      <div className={dialogs.messages}>
        <div>{messagesElements}</div>
        <div>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
