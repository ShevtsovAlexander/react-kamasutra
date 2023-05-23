export type navLinksType = {
  id: number;
  to: string;
  menu: string;
};

const InitialState = {
  navLinks: [
    {
      id: 1,
      to: '/profile',
      menu: 'Profile',
    },
    {
      id: 2,
      to: '/dialogs',
      menu: 'Messages',
    },
    {
      id: 3,
      to: '/users',
      menu: 'Users',
    },
    {
      id: 4,
      to: '/music',
      menu: 'Music',
    },
    {
      id: 5,
      to: '/news',
      menu: 'News',
    },
    {
      id: 6,
      to: '/settings',
      menu: 'Settings',
    },
  ] as Array<navLinksType>,
  navFriends: ['Ivan', 'Amir', 'Adam'] as Array<string>,
};

type InitialStateType = typeof InitialState;
const navbarReducer = (state = InitialState, action: any): InitialStateType => {
  return state;
};

export default navbarReducer;
