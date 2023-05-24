import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { userAPI } from '../API/users-api';

const InitialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: {
    term: ' ',
    friend: null as null | boolean,
  },
};

const usersReducer = (state = InitialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_CURRENT_USERS':
      return { ...state, currentPage: action.currentPage };
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount };
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),

  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),

  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_USERS',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: 'SET_FILTER',
      payload: filter,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
};

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionTypes,
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess);
  };
};
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess);
  };
};
export default usersReducer;

export type InitialStateType = typeof InitialState;
export type FilterType = typeof InitialState.filter;
type ActionTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionTypes>;
type ThunkType = BaseThunkType<ActionTypes>;
