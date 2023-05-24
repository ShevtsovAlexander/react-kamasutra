import { APIResponseType, GetItemsType, instance } from './api';

export const userAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`),
      )
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`).then((res) => res.data) as Promise<APIResponseType>;
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((res) => res.data) as Promise<APIResponseType>;
  },
};
