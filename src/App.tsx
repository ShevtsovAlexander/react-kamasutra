import * as React from 'react';
import { Component } from 'react';
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
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';

export const routerPath = {
  // dialogs: '/dialogs',
  dialogsId: `/dialogs/:id?`,
  profile: '/profile',
  profileId: '/profile/:userId',
  music: '/music',
  news: '/news',
  settings: '/settings',
  users: '/users',
  login: '/login',
};

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      // @ts-ignore
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            {/*<Routes>*/}
            {/*<Route path={routerPath.dialogs || routerPath.dialogsId} render={() => <DialogsContainer />} />*/}
            <Route path={routerPath.dialogsId} render={() => <DialogsContainer />} />
            <Route path={routerPath.profileId} render={() => <ProfileContainer />} />
            <Route exact path={routerPath.profile} render={() => <ProfileContainer />} />
            <Route path={routerPath.users} render={() => <UsersContainer />} />
            <Route path={routerPath.music} render={() => <Music />} />
            <Route path={routerPath.news} render={() => <News />} />
            <Route path={routerPath.settings} render={() => <Settings />} />
            <Route path={routerPath.login} render={() => <Login />} />
            {/*<Route*/}
            {/*</Routes>*/}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default SamuraiJSApp;
