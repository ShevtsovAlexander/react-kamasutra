import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import profile from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div className={profile.appWrapperContent}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
