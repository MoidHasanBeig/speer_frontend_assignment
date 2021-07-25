import React, { useEffect } from 'react';
import './LandingPage.scss';
import * as kampos from 'kampos';
import RainbowBtn from '../../components/RainbowBtn/RainbowBtn';
import WhiteBtn from '../../components/WhiteBtn/WhiteBtn';
import img1 from './Image1.png';
import img2 from './Image2.png';
import img3 from './Image3.png';

const LandingPage = () => {

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
      // setTimeout(() => {
      //   hippo.stop();
      //   Promise.all(promisedImages).then(([fromImage, toImage, thirdImg]) => {
      //     hippo.setSource({ media: thirdImg, width: WIDTH, height: HEIGHT });
      //     dissolve.to = toImage;
      //   }).then(function () {
      //     hippo.play(time => {
      //       dissolve.progress = Math.abs(Math.sin(time * 2e-4)); // multiply time by a factor to slow it down a bit
      //     });
      //   });
      // },9000);
      // setTimeout(() => {
      //   hippo.stop();
      //   Promise.all(promisedImages).then(([fromImage, toImage, thirdImg]) => {
      //     hippo.setSource({ media: thirdImg, width: WIDTH, height: HEIGHT });
      //     dissolve.to = fromImage;
      //   }).then(function () {
      //     hippo.play(time => {
      //       dissolve.progress = Math.abs(Math.sin(time * 2e-4)); // multiply time by a factor to slow it down a bit
      //       console.log(dissolve.progress);
      //     });
      //   });
      // },18000);
      // setTimeout(() => {
      //   hippo.stop();
      // },24000);
      // setTimeout(() => {
      //   hippo.destroy();
      //   turbulence = null;
      //   dissolveMap = null;
      //   dissolve = null;
      //   animateCarousel();
      // },28000);
    }

    //start the carousel
    animateCarousel();

  },[]);

  return (
    <div className="landing-page">
      <WhiteBtn className="white-btn-nav"/>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
