import { NavLink } from 'react-router-dom';
import user from './Users.module.css';
import userPhoto from '../../Asserts/images/free-icon-profile-3135768.png';
import * as React from 'react';
import { UserType } from '../../types/types';

type userType = {
  users: UserType;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};
let User: React.FC<userType> = ({ users, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + users.id}>
            <img
              alt="profile"
              className={user.nameIcons}
              src={users.photos.small != null ? users.photos.small : userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {users.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === users.id)}
              onClick={() => {
                unfollow(users.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === users.id)}
              onClick={() => {
                follow(users.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{users.name}</div>
          <div>{users.status}</div>
        </span>
        <span>
          <div>{'users.location.country'}</div>
          <div>{'users.location.city'}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
