import { FormAction, stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { profileAPI } from '../API/profile-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const InitialState = {
  posts: [
    {
      id: 1,
      message: 'Hey, how are u?',
      likeCounts: 12,
    },
    {
      id: 2,
      message: 'Hi, I am studying React',
      likeCounts: 11,
    },
  ] as Array<PostType>,
  profile: null as null | ProfileType,
  status: '',
  newPostText: '',
};

const profileReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likeCounts: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'SAVE_PHOTO_SUCCESS':
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    default:
      return state;
  }
};

type InitialStateType = typeof InitialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'ADD_POST',
      newPostText,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'SET_USER_PROFILE',
      profile,
    } as const),

  setUserStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
};

export const getUserProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
  };
};
export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(response));
  };
};
export const updateUserStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };
};
export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
};
export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
      if (userId !== null) {
        await dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }));
      return Promise.reject(response.messages[0]);
    }
  };
};
export default profileReducer;
