import * as React from 'react';
import { Component, Suspense } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import { UsersPage } from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import { Login } from './Components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './Components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { Breadcrumb, Layout, Menu } from 'antd';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from './Components/Header/Header';
// import { ChatPage } from './pages/Chat/ChatPage';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

export const routerPath = {
  // dialogs: '/dialogs',
  dialogsId: `/dialogs/:id?`,
  profile: '/profile',
  profileId: '/profile/:userId',
  music: '/music',
  news: '/news',
  settings: '/settings',
  users: '/developers',
  login: '/login',
  chatPage: '/chat',
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
        <Layout>
          <Header />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                {' '}
                <Link to={routerPath.profile}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {' '}
                <Link to={routerPath.users}>Developers</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider className="site-layout-background" width={'200px'}>
                <Menu mode="inline" defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                    <Menu.Item key="1">
                      {' '}
                      <Link to={routerPath.profile}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      {' '}
                      <Link to={routerPath.dialogsId}>Messages</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={routerPath.music}>Music</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to={routerPath.news}>News</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                    <Menu.Item key="5">
                      <Link to={routerPath.users}>Developers</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      {' '}
                      <Link to={routerPath.settings}>Settings</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                      {' '}
                      <Link to={routerPath.chatPage}>Chat Page</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Route path={routerPath.dialogsId} render={() => <DialogsContainer />} />
                <Route path={routerPath.profileId} render={() => <ProfileContainer />} />
                <Route exact path={routerPath.profile} render={() => <ProfileContainer />} />
                <Route path={routerPath.users} render={() => <UsersPage pageTitle={'Search users:'} />} />
                <Route path={routerPath.music} render={() => <Music />} />
                <Route path={routerPath.news} render={() => <News />} />
                <Route path={routerPath.settings} render={() => <Settings />} />
                <Route path={routerPath.login} render={() => <Login />} />
                <Suspense fallback={<Preloader />}>
                  <Route path={routerPath.chatPage} render={() => <ChatPage />} />
                </Suspense>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {' '}
            Social Network ©2023 Created by Shevtsov Alexander with IT-kamasutra{' '}
          </Footer>
        </Layout>
      </BrowserRouter>
      // @ts-ignore
      // <BrowserRouter>
      //   <div className="app-wrapper">
      //     <HeaderContainer />
      //     <Navbar />
      //     <div className="app-wrapper-content">
      //       {/*<Routes>*/}
      //       {/*<Route path={routerPath.dialogs || routerPath.dialogsId} render={() => <DialogsContainer />} />*/}
      //       <Route path={routerPath.dialogsId} render={() => <DialogsContainer />} />
      //       <Route path={routerPath.profileId} render={() => <ProfileContainer />} />
      //       <Route exact path={routerPath.profile} render={() => <ProfileContainer />} />
      //       <Route path={routerPath.users} render={() => <UsersPage pageTitle={'Search users:'} />} />
      //       <Route path={routerPath.music} render={() => <Music />} />
      //       <Route path={routerPath.news} render={() => <News />} />
      //       <Route path={routerPath.settings} render={() => <Settings />} />
      //       <Route path={routerPath.login} render={() => <Login />} />
      //       {/*<Route*/}
      //       {/*</Routes>*/}
      //     </div>
      //   </div>
      // </BrowserRouter>
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
