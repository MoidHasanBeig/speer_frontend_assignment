import React, { useState } from 'react';
import './Menu.scss';

const Menu = () => {
  const [isOpen,setIsOpen] = useState(false);

  function onClick() {
    setIsOpen( prevValue => !prevValue);
  }

  return (
    <div className="menu-container">
      <div className="logo-container">
        <div onClick={onClick} className="hamburger-icon" />
        <div className="brand-name">EXP|CON</div>
      </div>
      <div className={`${isOpen && 'show-circular-backdrop'} circular-backdrop`} />
      <ul className={`${isOpen && 'expand-menu'} menu-options`}>
        <li style={{transitionDelay: "0s"}} className={`${isOpen && 'show-option'} option`}>WHAT IS IT</li>
        <li style={{transitionDelay: "0.1s"}} className={`${isOpen && 'show-option'} option`}>PERKS</li>
        <li style={{transitionDelay: "0.2s"}} className={`${isOpen && 'show-option'} option`}>PRICING</li>
      </ul>
    </div>
  );
}

export default Menu;
