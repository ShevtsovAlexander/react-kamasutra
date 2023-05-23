import { ChangeEvent, useEffect, useState } from 'react';
import * as React from 'react';

type PropsType = {
  status: string;
  updateUserStatus: (status: string) => void;
};
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div>
      {!editMode && (
        <div>
          {' '}
          <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || 'Please enter your status'}</span>
        </div>
      )}
      {editMode && (
        <div>
          {' '}
          <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />{' '}
        </div>
      )}
    </div>
  );
};
export default ProfileStatusWithHooks;
