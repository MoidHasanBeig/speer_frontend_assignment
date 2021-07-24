import React, { useState, useEffect } from 'react';
import Menu from './components/Menu/Menu';
import './App.scss';

function App() {
  const [activeSection,setActiveSection] = useState("top");

  //scrollThrottler, checkActiveSection, isInViewport together checks the current
  //section of page which is in view to change various formattings of menu etc.
  
  var scrollTimeout;
  function scrollThrottler() {
    if ( !scrollTimeout ) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        checkActiveSection();
       }, 66);
    }
  }

  function checkActiveSection() {
    let sectionList = document.getElementsByClassName("section");
    let sectionArr = Array.from(sectionList);
    sectionArr.forEach( (section) => {
      let activeId = isInViewport(section);
      if (activeId && activeId!==activeSection) {
        setActiveSection(activeId);
      }
    });
  }

  let isInViewport = function (elem) {
      let bounding = elem.getBoundingClientRect();
      let screenHeight = window.innerHeight || document.documentElement.clientHeight;
      if ( bounding.top > -300 && bounding.top*2 <= (screenHeight)) {
        return elem.id;
      }
      else {
        return false;
      }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollThrottler, false);
    return function cleanUp() {
      window.removeEventListener("scroll", scrollThrottler, false);
    }
  });

  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
