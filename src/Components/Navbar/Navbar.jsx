import React from 'react';
import { NavLink } from 'react-router-dom';
import navbar from './Navbar.module.css';
import { useSelector } from 'react-redux';

const Navbar = (props) => {
  const navState = useSelector((state) => state.navBar);

  return (
    <nav className={navbar.nav}>
      <div className={navbar.navbar}>
        {navState.navLinks.map((n) => (
          <div className={navbar.item}>
            <NavLink key={n.id} to={n.to} activeClassName={navbar.activeLink}>
              {n.menu}
            </NavLink>
            {/*<NavLink key={n.id} className={({ isActive }) => (isActive ? navbar.activeLink : undefined)} to={n.to}>*/}
            {/*  {n.menu}*/}
            {/*</NavLink>*/}
          </div>
        ))}
      </div>
      <div className={navbar.friends}>
        <h1>Friends</h1>
        <div className={navbar.friendItems}>
          {navState.navFriends.map((n) => (
            <div key={n.id} className={navbar.friendItem}>
              <img className={navbar.imgFriends} src="https://www.svgrepo.com/show/62628/sea.svg" alt={'fd'}></img>
              <p>{n}</p>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
