import profileReducer from './profile-reducer';
import React from 'react';
import { actions } from './profile-reducer';

let state = {
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
  ],
  profile: null,
  status: '',
  newPostText: '',
};

it('length of posts should be incremented', () => {
  let action = actions.addPostActionCreator('it-kamasutra.com');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});
