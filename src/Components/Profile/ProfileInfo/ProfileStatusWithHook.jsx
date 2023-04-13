import React, { useState } from 'react';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        {!editMode && <span onDoubleClick={activateEditMode}>{props.status || 'Please enter your status'}</span>}
      </div>
      <div>
        {editMode && <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
      </div>
    </div>
  );
};
export default ProfileStatusWithHooks;