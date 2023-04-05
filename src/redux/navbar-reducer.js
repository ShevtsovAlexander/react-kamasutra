const InitialReducer = {
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
  ],
  navFriends: ['Ivan', 'Amir', 'Adam'],
};

const navbarReducer = (state = InitialReducer, action) => {
  return state;
};

export default navbarReducer;
