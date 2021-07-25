import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Pricing from './pages/Pricing/Pricing';
import Payment from './pages/Payment/Payment';
import Perks from './pages/Perks/Perks';
import Menu from './components/Menu/Menu';
import './App.scss';

function App() {
  const [activeSection,setActiveSection] = useState("hero-carousel");
  const [activeColor,setActiveColor] = useState("#000");

  //scrollThrottler, checkActiveSection, isInViewport together checks the current
  //section of page which is in view to change various formattings of menu etc.

  //to limit the state changes while scrolling
  var scrollTimeout;
  function scrollThrottler() {
    if ( !scrollTimeout ) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        checkActiveSection();
       }, 66);
    }
  }

  //check the viewport and determine which section is displaying
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

  //to change the current active section as per the viewport
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

  useEffect(() => {
    window.addEventListener("scroll", scrollThrottler, false);
    return function cleanUp() {
      window.removeEventListener("scroll", scrollThrottler, false);
    }
  });

  return (
    <Router>
      <div className="App">
        <Menu
          activeSection={activeSection}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
          <Switch>
            <Route exact path="/">
              <LandingPage
                activeSection={activeSection}
                activeColor={activeColor}
              />
            </Route>
            <Route path="/pricing" component={Pricing} />
            <Route path="/perks" component={Perks} />
            <Route path="/payment" component={Payment} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
