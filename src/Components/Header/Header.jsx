import React from 'react';
import header from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={header.header}>
      <img src="https://cdn-icons-png.flaticon.com/512/183/183595.png"></img>
      <div className={header.loginBlock}>{props.isAuth ? props.login : <NavLink to={'/login'}> Login </NavLink>}</div>
    </header>
  );
};

export default Header;
