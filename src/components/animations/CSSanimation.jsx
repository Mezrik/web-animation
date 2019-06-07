import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CSSanimation.css';

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const generateAnimation = (seed, max) => {
  let styleSheet = document.styleSheets[0];

  let animationName = `animation${Math.round(Math.random() * max)}`;

  let keyframes =
  `@-webkit-keyframes ${animationName} {
      10% {-webkit-transform:translate(${(Math.random() * (seed + seed)) - seed}%, ${(Math.random() * (seed + seed)) - seed}%)}
      30% {-webkit-transform:translate(${(Math.random() * (seed + seed)) - seed}%, ${(Math.random() * (seed + seed)) - seed}%)}
      50% {-webkit-transform:translate(${(Math.random() * (seed + seed)) - seed}%, ${(Math.random() * (seed + seed)) - seed}%)}
      80% {-webkit-transform:translate(${(Math.random() * (seed + seed)) - seed}%, ${(Math.random() * (seed + seed)) - seed}%)}
      90% {-webkit-transform:translate(${(Math.random() * (seed + seed)) - seed}%, ${(Math.random() * (seed + seed)) - seed}%)}
  }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return animationName;
}

export const CSSanimation = (props) => {

  let movementAnimation = {
      animationTimingFunction: 'ease',
      animationDuration: '5s',
      animationDelay: '0.0s',
      animationIterationCount: 'infinite',
      animationDirection: 'normal',
      animationFillMode: 'forwards'
  }

  const seeds = new Array(props.particlesCount).fill(Math.floor(Math.random() * (2000 - 1000) + 1000));
  let particles = seeds.map((seed) => {
    movementAnimation = {
      ...movementAnimation,
      animationName: generateAnimation(seed, props.particlesCount),
      backgroundColor: getRandomColor()
    }

    return <div className="dot" style={movementAnimation}></div>;
  });

  return <div className="animation-frame">{particles}</div>;
}

CSSanimation.propTypes = {
  particlesCount: PropTypes.number,
}
