import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Navbar from './Components/Navbar/Navbar';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';

export const routerPath = {
  // dialogs: '/dialogs',
  dialogsId: `/dialogs/:id?`,
  // profile: '/profile',
  profileId: '/profile/:userId?',
  music: '/music',
  news: '/news',
  settings: '/settings',
  users: '/users',
  login: '/login',
};

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          {/*<Routes>*/}
          {/*<Route path={routerPath.dialogs || routerPath.dialogsId} render={() => <DialogsContainer />} />*/}
          <Route path={routerPath.dialogsId} render={() => <DialogsContainer />} />
          <Route path={routerPath.profileId} render={() => <ProfileContainer />} />
          <Route path={routerPath.users} render={() => <UsersContainer />} />
          <Route path={routerPath.music} render={() => <Music />} />
          <Route path={routerPath.news} render={() => <News />} />
          <Route path={routerPath.settings} render={() => <Settings />} />
          <Route path={routerPath.login} render={() => <Login />} />
          {/*</Routes>*/}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
