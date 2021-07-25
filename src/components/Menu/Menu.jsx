import React, { useState } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [isOpen,setIsOpen] = useState(false);
  const [activeColor,setActiveColor] = useState("#FFF");
  const [activePage,setActivePage] = useState("/");

  function toggleMenu() {
    setIsOpen( prevValue => !prevValue);
  }

  function hideMenu() {
    setIsOpen(false);
  }

  function handleClickLink(e) {
    setActivePage(e.target.pathname);
    hideMenu();
  }

  const activeStyle = {color: activeColor};

  return (
    <div onMouseLeave={hideMenu} className="menu-container">
      <div className="logo-container">
        <div onClick={toggleMenu} className="hamburger-icon" />
        <div style={{color: activeColor}} className="brand-name">EXP|CON</div>
      </div>
      <div className={`${isOpen && 'show-circular-backdrop'} circular-backdrop`} />
      <ul className={`${isOpen && 'expand-menu'} menu-options`}>
        <li style={{transitionDelay: "0s"}} className={`${isOpen && 'show-option'} option`}>
          <Link style={activePage==="/" ? activeStyle : {}} onClick={handleClickLink} to="/">WHAT IS IT</Link>
        </li>
        <li style={{transitionDelay: "0.1s"}} className={`${isOpen && 'show-option'} option`}>
          <Link style={activePage==="/perks" ? activeStyle : {}} onClick={handleClickLink} to="/perks">PERKS</Link>
        </li>
        <li style={{transitionDelay: "0.2s"}} className={`${isOpen && 'show-option'} option`}>
          <Link style={activePage==="/pricing" ? activeStyle : {}} onClick={handleClickLink} to="/pricing">PRICING</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
