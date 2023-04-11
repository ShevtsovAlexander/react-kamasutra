import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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

let mapStateToPropsFactory = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToPropsFactory, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
})(UsersContainer);
