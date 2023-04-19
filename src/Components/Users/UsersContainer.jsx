import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }
  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
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
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};
export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers: requestUsers,
})(UsersContainer);
