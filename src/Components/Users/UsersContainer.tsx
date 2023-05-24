import * as React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers, FilterType } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
  }
  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.getUsers(pageNumber, pageSize, filter);
  };
  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsers(1, pageSize, filter);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          currentPage={this.props.currentPage}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};
export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers: requestUsers,
  }),
)(UsersContainer);
