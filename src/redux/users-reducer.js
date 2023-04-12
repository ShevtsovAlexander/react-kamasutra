import { userAPI } from '../API/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_USERS = 'SET_CURRENT_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const InitialReducer = {
  users: [],
  // [
  //   {
  //     id: 1,
  //     followed: false,
  //     fullName: 'Alexander',
  //     photoUrl: 'https://cdn-icons-png.flaticon.com/512/1250/1250751.png',
  //     status: 'I am studying REACT',
  //     location: { city: 'Moscow', country: 'Russia' },
  //   },
  //   {
  //     id: 2,
  //     followed: true,
  //     fullName: 'Amir',
  //     photoUrl: 'https://cdn-icons-png.flaticon.com/512/1250/1250751.png',
  //     status: 'I am studying REACT, too',
  //     location: { city: 'Yalta', country: 'Russia' },
  //   },
  //   {
  //     id: 3,
  //     followed: false,
  //     fullName: 'Anton',
  //     photoUrl: 'https://cdn-icons-png.flaticon.com/512/1250/1250751.png',
  //     status: 'I am working at home!',
  //     location: { city: 'Krasnodar', country: 'Russia' },
  //   },
  // ],
  pageSize: 5,
  totalUsersCount: 110,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = InitialReducer, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    }
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_USERS:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };

    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_USERS, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    userAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      // this.props.setTotalUsersCount(response.data.totalCount);
    });
  };
};

export const follow = (userId) => {
  return (dispatch) => {
    debugger;
    dispatch(toggleFollowingProgress(true, userId));
    userAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    userAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
export default usersReducer;
