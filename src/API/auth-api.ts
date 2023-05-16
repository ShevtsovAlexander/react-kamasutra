import { instance, ResultCodeEnum, ResultCodeForCapcthaEnum } from './api';

type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodeEnum | ResultCodeForCapcthaEnum;
  messages: Array<string>;
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
