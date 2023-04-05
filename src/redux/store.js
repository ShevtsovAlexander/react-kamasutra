import dialogsReducer from './dialogs-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';

let store = {
  _state: {
    profilePage: {
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
      newPostText: 'REACT',
    },
    dialogsPage: {
      names: [
        {
          name: 'Alexander',
          id: 121,
        },
        {
          name: 'Ivan',
          id: 342,
        },
        {
          name: 'Amir',
          id: 4433,
        },
        {
          name: 'Adam',
          id: 998,
        },
        {
          name: 'Anton',
          id: 443,
        },
      ],
      messages: [
        {
          message: 'Hi',
          id: 121,
        },
        {
          message: 'How is your React App',
          id: 342,
        },
        {
          message: 'Yeah Boy',
          id: 4433,
        },
        {
          message: 'Yeah Boy',
          id: 998,
        },
        {
          message: 'Yeah Boy',
          id: 443,
        },
      ],
      newMessageBody: '',
    },
    navBar: {
      navLinks: [
        {
          to: '/profile',
          menu: 'Profile',
        },
        {
          to: '/dialogs',
          menu: 'Messages',
        },
        {
          to: '/music',
          menu: 'Music',
        },
        {
          to: '/news',
          menu: 'News',
        },
        {
          to: '/settings',
          menu: 'Settings',
        },
      ],
      navFriends: ['Ivan', 'Amir', 'Adam'],
    },
  },
  _callSubscriber() {},
  getState() {
    return this._state;
  },
  subscribe(observe) {
    this._callSubscriber = observe;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.navBar = navbarReducer(this._state.navBar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
