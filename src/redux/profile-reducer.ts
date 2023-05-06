import { profileAPI } from '../API/api';
import { stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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

type InitialStateType = typeof InitialState;

const profileReducer = (state = InitialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
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
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    default:
      return state;
  }
};

type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setUserStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => {
  return async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
  };
};
export const getUserStatus = (userId: number) => {
  return async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
  };
};
export const updateUserStatus = (status: string) => {
  return async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};
export const savePhoto = (file: any) => {
  return async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  };
};
export const saveProfile = (profile: ProfileType) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0]);
    }
  };
};
export default profileReducer;
