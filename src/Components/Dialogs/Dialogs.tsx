import * as React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import dialogs from './Dialogs.module.css';
import AddMessageForm from './AddMessageForm/AddMessageForm';
import { InitialStateType } from '../../redux/dialogs-reducer';

type PropsTypes = {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
};
export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Dialogs: React.FC<PropsTypes> = (props) => {
  const state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((node) => <Dialog key={node.id} name={node.name} id={node.id} />);
  let messagesElements = state.messages.map((node) => <Message key={node.id} message={node.message} />);

  let addNewMessage = (value: NewMessageFormValuesType) => {
    props.sendMessage(value.newMessageBody);
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
