// import * as React from 'react';
// // @ts-ignore
// import ReactDOM from 'react-dom';
// import SamuraiJSApp from './App';
//
// it('renders without crashing', () => {
//   const div:  = document.createElement('div');
//   ReactDOM.render(<SamuraiJSApp />, div),
//   ReactDOM.unmountComponentAtNode(div);
// });

//reducer test jest
// import usersReducer, {actions, InitialState} from './users-reducer'
//
// let state: InitialState;
//
// beforeEach(() => {
//   state = {
//     users: [
//       {
//         id: 0, name: 'Dimych 0', followed: false,
//         photos: {small: null, large: null}, status: 'status 0'
//       },
//       {
//         id: 1, name: 'Dimych 1', followed: false,
//         photos: {small: null, large: null}, status: 'status 1'
//       },
//       {
//         id: 2, name: 'Dimych 2', followed: true,
//         photos: {small: null, large: null}, status: 'status 2'
//       },
//       {
//         id: 3, name: 'Dimych 3', followed: true,
//         photos: {small: null, large: null}, status: 'status 3'
//       },
//     ],
//     pageSize: 10,
//     totalUsersCount: 0,
//     currentPage: 1,
//     isFetching: false,
//     followingInProgress: []
//   }
// })
//
// test('follow success', () => {
//   const newState = usersReducer(state, actions.followSuccess(1))
//
//   expect(newState.users[0].followed).toBeFalsy();
//   expect(newState.users[1].followed).toBeTruthy();
// })
//
// test('unfollow success', () => {
//   const newState = usersReducer(state, actions.unfollowSuccess(3))
//
//   expect(newState.users[2].followed).toBeTruthy();
//   expect(newState.users[3].followed).toBeFalsy();
// })

//thunk test mock
// import {actions, follow, unfollow} from './users-reducer'
// import {usersAPI} from '../api/users-api'
// import {APIResponseType, ResultCodesEnum} from '../api/api'
//
// jest.mock('../api/users-api')
// const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
//
// const dispatchMock = jest.fn();
// const getStateMock = jest.fn();
//
// beforeEach(() => {
//   dispatchMock.mockClear();
//   getStateMock.mockClear();
//   userAPIMock.follow.mockClear();
//   userAPIMock.unfollow.mockClear();
// })
//
//
// const result: APIResponseType = {
//   resultCode: ResultCodesEnum.Success,
//   messages: [],
//   data: {}
// }
//
// userAPIMock.follow.mockReturnValue(Promise.resolve(result));
// userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
//
//
//
// test('success follow thunk', async () => {
//   const thunk = follow(1)
//
//   await thunk(dispatchMock, getStateMock, {})
//
//   expect(dispatchMock).toBeCalledTimes(3)
//   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
//   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
//   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
// })
//
// test('success unfollow thunk', async () => {
//   const thunk = unfollow(1)
//
//   await thunk(dispatchMock, getStateMock, {})
//
//   expect(dispatchMock).toBeCalledTimes(3)
//   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
//   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
//   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
// })
