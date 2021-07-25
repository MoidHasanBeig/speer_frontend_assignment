import React, { useEffect } from 'react';
import './LandingPage.scss';
import * as kampos from 'kampos';
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

    const turbulence = kampos.effects.turbulence({ noise: kampos.noise.perlinNoise });

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const CELL_FACTOR = 1;
    const AMPLITUDE = CELL_FACTOR / WIDTH;

    turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
    turbulence.octaves = 4;
    turbulence.isFractal = true;

    const mapTarget = document.createElement('canvas');
    mapTarget.width = WIDTH;
    mapTarget.height = HEIGHT;

    const dissolveMap = new kampos.Kampos({ target: mapTarget, effects: [turbulence], noSource: true });

    dissolveMap.draw();

    const dissolve = kampos.transitions.dissolve();

    dissolve.map = mapTarget;
    dissolve.high = 0.05; // for liquid-like effect

    const target = document.querySelector('#target');
    const hippo = new kampos.Kampos({ target, effects: [dissolve] });

    Promise.all(promisedImages).then(([fromImage, toImage]) => {
        hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });

        dissolve.to = toImage;
    }).then(function () {
        hippo.play(time => {
            dissolve.progress = Math.abs(Math.sin(time * 4e-4)); // multiply time by a factor to slow it down a bit
        });
    });
  },[]);

  return (
    <div className="landing-page">
    <main>
      <section>
        <figure>
          <div className="cta-container">
            <p className="hero-image-text">INTERACTIVE CONCERT EXPERIENCE</p>
            <p className="hero-image-subtext">Experience your favourite artists like never<br/>before and from the comfort of your own home.</p>
            <div className="btn-container">
              <div className="try-now-big"></div>
              <p className="btn-text">TRY IT NOW</p>
            </div>
          </div>
          <canvas id="target">
            <img id="source-from" src={img1} alt="" />
            <img id="source-to" data-src={img2} alt="" />
            <img id="third-img" data-src={img3} alt="" />
          </canvas>
        </figure>
      </section>
    </main>
    </div>
  );
}

export default LandingPage;
