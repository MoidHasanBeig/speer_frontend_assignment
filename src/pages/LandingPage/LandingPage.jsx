import React, { useEffect } from 'react';
import './LandingPage.scss';
import * as kampos from 'kampos';
import RainbowBtn from '../../components/RainbowBtn/RainbowBtn';
import WhiteBtn from '../../components/WhiteBtn/WhiteBtn';
import img1 from './Image1.png';
import img2 from './Image2.png';
import img3 from './Image3.png';

const LandingPage = (props) => {

  useEffect( () => {
    // Notify when our images are ready
    function loadImage (src) {
       return new Promise(resolve => {
           const img = new Image();
           img.crossOrigin = 'anonymous';

           img.onload = function () {
               resolve(this);
           };

           img.src = src;
       });
    }
    // get the image URLs
    const imageFromSrc = document.querySelector('#source-from').src;
    const imageToSrc = document.querySelector('#source-to').dataset.src;
    const thirdImg = document.querySelector('#third-img').dataset.src;
    // load images
    const promisedImages = [
        loadImage(imageFromSrc),
        loadImage(imageToSrc),
        loadImage(thirdImg)
    ];

    let turbulence;
    let dissolveMap;
    let dissolve;

    function animateCarousel() {
      turbulence = kampos.effects.turbulence({ noise: kampos.noise.perlinNoise });

      let WIDTH = window.innerWidth;
      let HEIGHT = window.innerHeight;
      let CELL_FACTOR = 1;
      let AMPLITUDE = CELL_FACTOR / WIDTH;

      turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
      turbulence.octaves = 4;
      turbulence.isFractal = true;

      let mapTarget = document.createElement('canvas');
      mapTarget.width = WIDTH;
      mapTarget.height = HEIGHT;

      dissolveMap = new kampos.Kampos({ target: mapTarget, effects: [turbulence], noSource: true });

      dissolveMap.draw();

      dissolve = kampos.transitions.dissolve();

      dissolve.map = mapTarget;
      dissolve.high = 0.05; // for liquid-like effect

      let target = document.querySelector('#target');
      let hippo = new kampos.Kampos({ target, effects: [dissolve] });

      Promise.all(promisedImages).then(([fromImage, toImage, third]) => {
        hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });
        dissolve.to = toImage;
      }).then(function () {
        hippo.play(time => {
          dissolve.progress = Math.abs(Math.sin(time * 2e-4)); // multiply time by a factor to slow it down a bit
        });
      });
    }
    //start the carousel
    animateCarousel();

  },[]);

  return (
    <div className="landing-page">
      <WhiteBtn
        activeColor={props.activeColor}
        text="TRY IT NOW"
        className={`${(props.activeSection==="hero-carousel" || props.activeSection==="get-expcon") && "hide-nav-btn"} white-btn-nav`}
      />
      <main>
        <div className="section" id="hero-carousel">
          <section>
            <figure>
              <div className="cta-container">
                <p className="hero-image-text">INTERACTIVE CONCERT EXPERIENCE</p>
                <p className="hero-image-subtext">Experience your favourite artists like never<br/>before and from the comfort of your own home.</p>
                <RainbowBtn />
              </div>
              <canvas id="target">
                <img id="source-from" src={img1} alt="" />
                <img id="source-to" data-src={img2} alt="" />
                <img id="third-img" data-src={img3} alt="" />
              </canvas>
            </figure>
          </section>
        </div>
        <div className="section" id="superior-sound">
          <div className="cta-container">
            <div className="heading">SUPERIOR SOUND</div>
            <div className="subtext">Experience live versions of your<br />favourite songs.</div>
            <WhiteBtn
              activeColor={props.activeColor}
              text="SEE DEMO"
              className="superior-sound-cta"
            />
          </div>
          <div className="images-container">
            <div className="speaker-1" />
            <div className="speaker-2" />
          </div>
        </div>
        <div className="section" id="front-row">
          <div className="cta-container">
            <div className="heading">FRONT ROW SEATS</div>
              <div className="subtext">Experience concerts up close<br />and personal.</div>
              <WhiteBtn
                activeColor={props.activeColor}
                text="SEE DEMO"
                className="superior-sound-cta"
              />
            </div>
        </div>
        <div className="section" id="perks">
          <div className="heading">PERKS</div>
          <div className="details-container">
            <div className="perk perk-1">
              <div className="title title-1">Subscription<br/>Payment<br/>Model</div>
              <div className="desc desc-1">No commitment,<br/>cancel anytime. Never<br/>worry about forgetting<br/>a payment again.</div>
            </div>
            <div className="perk perk-2">
              <div className="title title-2">No Fee<br/>Cancellation<br/>Policy</div>
              <div className="desc desc-2">No commitment,<br/>cancel anytime. Never<br/>worry about forgetting<br/>a payment again.</div>
            </div>
            <div className="perk perk-3">
              <div className="title title-3">Subscription<br/>Payment<br/>Model</div>
              <div className="desc desc-3">No commitment,<br/>cancel anytime. Never<br/>worry about forgetting<br/>a payment again.</div>
            </div>
          </div>
        </div>
        <div className="section" id="reviews">
        <div className="heading">REVIEWS</div>
          <div className="image-container">
            <div className="small-speaker-1" />
            <div className="small-speaker-2" />
          </div>
          <div className="details-container">
            <div className="review review-1">
              <div className="stars" />
              <div className="title title-1">ARTIST</div>
              <div className="desc desc-1">"Love it, it's the<br/>best. I can't live<br/>without it!"</div>
            </div>
            <div className="review review-2">
              <div className="stars" />
              <div className="title title-2">PRODUCER</div>
              <div className="desc desc-2">"Love it, it's the<br/>best. I can't live<br/>without it!"</div>
            </div>
            <div className="review review-3">
              <div className="stars" />
              <div className="title title-3">MUSIC FAN</div>
              <div className="desc desc-3">"Love it, it's the<br/>best. I can't live<br/>without it!"</div>
            </div>
          </div>
        </div>
        <div className="section" id="get-expcon">
          <div className="sec-1">
            <div className="text-container">
              <div className="title">GET EXP|CON NOW</div>
              <div className="subtext">Purchase and download the app.</div>
            </div>
            <div className="cta-btn">
              <RainbowBtn />
            </div>
          </div>
          <div className="sec-2">
            <footer>
              <div className="brand-name">EXP|CON</div>
              <div className="footer-text">2021 &copy; All Rights Reserved | Speer Technologies Incorporated</div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
