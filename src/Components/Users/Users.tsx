import * as React from 'react';
import User from './User';
import Paginator from '../common/Pagintor/Paginator';
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const filter = useSelector(getUsersFilter);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const followingInProgress = useSelector(getFollowingInProgress);
  const dispatch: any = useDispatch();
  const history: any = useHistory();

  useEffect(() => {
    history.push({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };
  const unFollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
      </div>
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
            followingInProgress={followingInProgress}
            key={u.id}
            unFollow={unFollow}
            followUser={followUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
