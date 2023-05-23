import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store.js';

let mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
  } as MapPropsType);

type MapPropsType = {
  isAuth: boolean;
};
type DispatchPropsType = {};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & WCP> = (props): JSX.Element => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/login" />;
    // @ts-ignore
    return <WrappedComponent {...(restProps as WCP)} />;
  };
  // @ts-ignore
  return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}
