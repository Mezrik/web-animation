import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMax, TweenMax, Power1 } from 'gsap/all';

import '../../styles/animation.css';

import { getRandomColor, random } from '../../Helpers';
import { animationConfig } from '../../config.js';

export class GSAPanimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: Math.floor(random(200, 250)),
    }

    this.particlesRefs = [];
    this.particlesAnimations = new TimelineMax({ paused: true });
  }

  generateAnimation(particle, seed, j = 1, i = 0) {
    let moveX = random(-seed, seed),
      moveY = random(-seed, seed);

    const duration = animationConfig.duration / 5;
    if (i >= 5) {
      moveX = 0;
      moveY = 0;
      i = 0;
    }

    return TweenMax.to(particle, duration, {
      x: moveX,
      y: moveY,
      ease: Power1.easeInOut,
      onComplete: () => this.particlesAnimations.add(this.generateAnimation(particle, seed, j + duration, i + 1), j),
    });
  }

  componentDidMount() {
    const { seed } = this.state;

    this.particlesRefs.map((ref, i) => {
      ref &&
        this.particlesAnimations.add(this.generateAnimation(ref, seed), 0);
    });

    this.particlesAnimations.paused(this.props.stop);
  }

  componentWillUnmount() {
      this.particlesAnimations.kill();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.particlesCount !== prevProps.particlesCount) {
      const { seed } = this.state;
      this.particlesAnimations = this.particlesAnimations.clear();

      this.particlesRefs.map((ref, i) => {
        ref &&
          this.particlesAnimations.add(this.generateAnimation(ref, seed), 0);
      });
    }

    if (this.props.stop !== prevProps.stop) {
      this.particlesAnimations.paused(!this.particlesAnimations.paused());
    }
  }

  render() {
    const { particlesCount, stop } = this.props;

    this.particlesRefs = [];
    const particles = [];

    for (var i = 0; i < particlesCount; i++) {
      particles.push(<div
        className="dot"
        style={{ backgroundColor: getRandomColor() }}
        ref={(ref) => { this.particlesRefs.push(ref);}}
        ></div>);
    }

    return <div className="animation-frame">{particles}</div>;
  }
}

GSAPanimation.propTypes = {
  particlesCount: PropTypes.number,
  stop: PropTypes.bool,
}
