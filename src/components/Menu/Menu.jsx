import React, { useState, useEffect } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const [isOpen,setIsOpen] = useState(false);
  const [activeBg,setActiveBg] = useState("#51E2E9");
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

  //To change the color of menu links
  useEffect(() => {
    const sec = props.activeSection;
    if (sec==='hero-carousel' || sec==='perks' || sec==='get-expcon') {
      props.setActiveColor("#191919");
      setActiveBg("#51E2E9");
    } else if (sec==='superior-sound') {
      props.setActiveColor("#D34848");
      setActiveBg("#191919");
    } else if (sec==='front-row') {
      props.setActiveColor("#FCB33F");
      setActiveBg("#191919");
    } else if (sec==='reviews') {
      props.setActiveColor("#51E2E9");
      setActiveBg("#191919");
    }
  },[props.activeSection]);

  const activeStyle = {color: props.activeColor};
  const menuBg = {backgroundColor: activeBg};

  return (
    <div onMouseLeave={hideMenu} className="menu-container">
      <div className="logo-container">
        <div onClick={toggleMenu} className="hamburger-icon">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="4" fill={isOpen ? props.activeColor : "white"}/>
            <rect y="10" width="40" height="4" fill={isOpen ? props.activeColor : "white"}/>
            <rect y="20" width="40" height="4" fill={isOpen ? props.activeColor : "white"}/>
          </svg>
        </div>
        <div style={isOpen ? {color: props.activeColor} : {}} className="brand-name">EXP|CON</div>
      </div>
      <div style={menuBg} className={`${isOpen && 'show-circular-backdrop'} circular-backdrop`} />
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
