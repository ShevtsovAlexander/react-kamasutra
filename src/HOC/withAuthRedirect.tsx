import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store.js';
import { FC } from 'react';

let mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
  } as WrapperProps);

type WrapperProps = {
  isAuth: boolean;
};
export function withAuthRedirect<P extends WrapperProps>(WrappedComponent: React.ComponentType<P>): FC<P> {
  const RedirectComponent: FC<P> = (props) => {
    let { isAuth, ...wrappedOnlyProps } = props;

    if (!isAuth) return <Redirect to="/login" />;
    return <WrappedComponent {...(wrappedOnlyProps as P)} />;
  };
  //@ts-ignore
  return connect<WrapperProps, {}, P, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}
