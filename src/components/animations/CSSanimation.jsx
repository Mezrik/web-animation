import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/animation.css';

import { getRandomColor, random } from '../../Helpers';
import { animationConfig } from '../../config.js';

const generateAnimation = (seed, max) => {
  let styleSheet = document.styleSheets[0];

  let animationName = `animation${Math.round(random(max))}`;

  let keyframes =
  `@-webkit-keyframes ${animationName} {
      10% {-webkit-transform:translate(${random(-seed, seed)}px, ${random(-seed, seed)}px)}
      30% {-webkit-transform:translate(${random(-seed, seed)}px, ${random(-seed, seed)}px)}
      50% {-webkit-transform:translate(${random(-seed, seed)}px, ${random(-seed, seed)}px)}
      80% {-webkit-transform:translate(${random(-seed, seed)}px, ${random(-seed, seed)}px)}
      100% {-webkit-transform:translate(${random(-seed, seed)}px, ${random(-seed, seed)}px)}
  }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return animationName;
}

export const CSSanimation = (props) => {

  let movementAnimation = {
      animationTimingFunction: 'ease-in-out',
      animationDuration: `${animationConfig.duration}s`,
      animationDelay: '0.0s',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationFillMode: 'forwards'
  }

  const seeds = new Array(props.particlesCount).fill(Math.floor(random(200, 250)));
  let particles = seeds.map((seed, i) => {
    movementAnimation = {
      ...movementAnimation,
      animationName: generateAnimation(seed, props.particlesCount),
      backgroundColor: getRandomColor()
    }

    return <div key={`particle-${i}`} className="dot" style={movementAnimation}></div>;
  });

  return <div className="animation-frame">{props.stop ? null : particles}</div>;
}

CSSanimation.propTypes = {
  particlesCount: PropTypes.number,
  stop: PropTypes.bool,
}
