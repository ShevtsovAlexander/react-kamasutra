import * as React from 'react';
import header from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};
export type DispatchPropsType = {
  logout: () => void;
};
const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={header.header}>
      <img alt="img Earth" src="https://cdn-icons-png.flaticon.com/512/183/183595.png" />

      <div className={header.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} <br /> <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
