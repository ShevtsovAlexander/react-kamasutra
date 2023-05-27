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
import * as queryString from 'querystring';
type PropsType = {};

type QueryParamsType = {
  term?: string;
  friend?: string;
  page?: string;
};
export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const filter = useSelector(getUsersFilter);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const followingInProgress = useSelector(getFollowingInProgress);
  const dispatch: any = useDispatch();
  const history = useHistory();

  let actualFilter = filter;
  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType;

    let actualPage = currentPage;

    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };

    if (parsed.friend) {
      actualFilter.friend = parsed.friend === 'true' ? true : parsed.friend === 'false' ? false : null;
    }
    if (parsed.page) {
      actualPage = +parsed.page;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/developers',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

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
        <UsersSearchForm onFilterChanged={onFilterChanged} initialValue={actualFilter} />
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
