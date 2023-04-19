import React from 'react';
import User from './User';
import Paginator from '../common/Pagintor/Paginator';

const Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
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
