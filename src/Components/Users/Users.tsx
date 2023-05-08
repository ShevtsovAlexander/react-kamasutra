import * as React from 'react';
import User from './User';
import Paginator from '../common/Pagintor/Paginator';
import { UserType } from '../../types/types';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<UserType>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: Array<number>;
};
const Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }: PropsType) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            users={u}
            followingInProgress={props.followingInProgress}
            key={u.id}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};
export default Users;
