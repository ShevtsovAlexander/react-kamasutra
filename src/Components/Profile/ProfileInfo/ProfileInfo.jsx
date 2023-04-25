import React from 'react';
import profileInfo from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import profileIcon from '../../../Asserts/images/free-icon-profile-3135768.png';
import ProfileStatusWithHooks from './ProfileStatusWithHook';

const ProfileInfo = ({ profile, savePhoto, status, updateUserStatus, isOwner }) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
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
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
        </div>

        <div className={profileInfo.bio}>
          <h1>{profile.fullName}</h1>

          <ul>
            <li>About me: {profile.aboutMe}</li>
            <li>City: Moscow</li>
            <li>Education: RANEPA</li>
            <li>To contact me: {profile.contacts.twitter}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
