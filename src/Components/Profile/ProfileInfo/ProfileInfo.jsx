import React, { useState } from 'react';
import profileInfo from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import profileIcon from '../../../Asserts/images/free-icon-profile-3135768.png';
import ProfileStatusWithHooks from './ProfileStatusWithHook';
import ProfileDataForm from './ProfileDataForm.jsx';

const ProfileInfo = ({ profile, savePhoto, status, updateUserStatus, isOwner, saveProfile }) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  return (
    <div>
      <div>
        <img
          className={profileInfo.beach}
          src="https://oir.mobi/uploads/posts/2021-06/1623718749_20-oir_mobi-p-more-panorama-priroda-krasivo-foto-31.jpg"
        ></img>
      </div>
      <div className={profileInfo.myDate}>
        <div className={profileInfo.icon}>
          <img src={profile.photos.large || profileIcon}></img>
          {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

          {editMode ? (
            <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              profile={profile}
              isOwner={isOwner}
            />
          )}

          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit Data</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{' '}
        {Object.keys(profile.contacts).map((key) => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />;
        })}
      </div>
    </div>
  );
};
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={profileInfo.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
export default ProfileInfo;
