import { ResultCodeEnum, ResultCodeForCapcthaEnum } from '../API/api';
import { stopSubmit } from 'redux-form';
import { Dispatch } from 'redux';
import { securityAPI } from '../API/security-api';
import { authAPI } from '../API/auth-api';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  captchaUrl: null as string | null,
  isAuth: false,
};
type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  data: {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
  };
};
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  data: { captchaUrl: string };
};
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  data: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch: Dispatch<ActionTypes>) => {
  let responseMe = await authAPI.me();
  if (responseMe.resultCode === 0) {
    let { id, email, login } = responseMe.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionTypes>) => {
  let response = await securityAPI.getCaptchaUrl();
  let captchaUrl = response.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };

export const logout = () => async (dispatch: Dispatch<ActionTypes>) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
export default authReducer;
