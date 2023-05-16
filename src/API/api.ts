import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '601d9c96-904a-43fa-a8d5-e01ede7221dc',
  },
  withCredentials: true,
});
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCapcthaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
