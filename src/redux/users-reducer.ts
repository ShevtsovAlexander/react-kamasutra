import { userAPI } from '../API/api';
import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_USERS = 'SET_CURRENT_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const InitialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof InitialState;

const usersReducer = (state = InitialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
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

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });
type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_USERS;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_USERS,
  currentPage,
});
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);

  if (response.data.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};
export const follow = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
  };
};
export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
  };
};
export default usersReducer;
