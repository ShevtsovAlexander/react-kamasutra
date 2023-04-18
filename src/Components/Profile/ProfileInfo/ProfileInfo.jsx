import React from 'react';
import profileInfo from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import profileIcon from '../../../Asserts/images/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png';
import ProfileStatusWithHooks from './ProfileStatusWithHook';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
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
          <img src={props.profile.photos.large ? props.profile.photos.large : profileIcon}></img>
          <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
        </div>

        <div className={profileInfo.bio}>
          <h1>{props.profile.fullName}</h1>

          <ul>
            <li>About me: {props.profile.aboutMe}</li>
            <li>City: Moscow</li>
            <li>Education: RANEPA</li>
            <li>To contact me: {props.profile.contacts.twitter}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
