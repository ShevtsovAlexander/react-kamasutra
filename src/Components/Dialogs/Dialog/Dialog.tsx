import * as React from 'react';
import { NavLink } from 'react-router-dom';
import dialog from './Dialog.module.css';

type PropsType = {
  id: number;
  name: string;
};

const Dialog: React.FC<PropsType> = (props) => {
  return (
    <div className={dialog.dialogItems}>
      <img className={dialog.nameIcons} src="https://cdn-icons-png.flaticon.com/512/1250/1250751.png" alt={'hi'} />
      <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
    </div>
  );
};
export default Dialog;
