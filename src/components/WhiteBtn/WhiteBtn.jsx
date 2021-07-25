import React, { useEffect } from 'react';
import './WhiteBtn.scss';

const WhiteBtn = (props) => {

  useEffect(() => {
    document.querySelectorAll('.white-btn-container').forEach((btn) => {
      btn.onmousemove = function (e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        e.target.style.setProperty('--x', x + 'px');
        e.target.style.setProperty('--y', y + 'px');
      };
    })
  },[]);

  return (
    <div className={`${props.className} white-btn-container`}>
      <div className="white-btn button"><span style={{color:props.activeColor}} className="btn-text">{props.text}</span></div>
    </div>
  );
}

export default WhiteBtn;
