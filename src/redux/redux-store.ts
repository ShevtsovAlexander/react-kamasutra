import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import dialogsReducer from './dialogs-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

let RootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navBar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
