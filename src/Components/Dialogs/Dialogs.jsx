import React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import dialogs from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {
  const state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((node) => <Dialog key={node.id} name={node.name} id={node.id} />);
  let messagesElements = state.messages.map((node) => <Message key={node.id} message={node.message} />);
  let newMessageBody = state.newMessageBody;

  let addNewMessage = (value) => {
    props.sendMessageCreator(value.newMessageBody);
  };
  return (
    <div className={dialogs.dialogs}>
      <div> {dialogsElements}</div>
      <div className={dialogs.messages}>
        <div>{messagesElements}</div>
        <div>
          <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'} />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};
const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);
export default Dialogs;
