import * as React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import profile from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';

type PropsType = {
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
  profile: ProfileType;
  status: string;
  isOwner: boolean;
};
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={profile.appWrapperContent}>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
