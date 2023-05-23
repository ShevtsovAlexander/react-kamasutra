import { ResultCodeEnum, ResultCodeForCapcthaEnum } from '../API/api';
import { FormAction, stopSubmit } from 'redux-form';
import { Dispatch } from 'redux';
import { securityAPI } from '../API/security-api';
import { authAPI } from '../API/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  captchaUrl: null as string | null,
  isAuth: false,
};

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
      type: 'SET_USER_DATA',
      data: { userId, email, login, isAuth },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'GET_CAPTCHA_URL_SUCCESS',
      data: { captchaUrl },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let responseMe = await authAPI.me();
  if (responseMe.resultCode === 0) {
    let { id, email, login } = responseMe.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  let captchaUrl = response.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};
export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
  async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
      await dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
        await dispatch(getCaptchaUrl());
      }
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
export default authReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;
