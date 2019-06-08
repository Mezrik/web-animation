import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/animation.css';

import { getRandomColor, random } from '../../Helpers';
import { animationConfig } from '../../config.js';

// Source: http://codentronix.com/2012/01/24/html5-canvas-crazy-balls/
function floatEquals(v1,v2,delta) {
  return Math.abs(v1 - v2) <= delta;
}

function Ball(ctx, maxRadius) {
  this.calcTargetPoint = function() {
    this.radius = Math.random() * this.maxRadius + 1
    this.maxX = ctx.canvas.width - this.radius
    this.maxY = ctx.canvas.height - this.radius

    this.targetX = Math.random() * this.maxX
    this.targetY = Math.random() * this.maxY

    var speed = Math.random() * 50 + 50
    this.velX = (this.targetX - this.x) / speed
    this.velY = (this.targetY - this.y) / speed

    this.fillColor = getRandomColor();
  }

  this.update = function() {
    var needNewTarget = false;

    this.x += this.velX
    this.y += this.velY

    if( this.x <= this.radius ) {
      this.x = this.radius;
      needNewTarget = true;
    }
    if( this.y <= this.radius ) {
      this.y = this.radius;
      needNewTarget = true;
    }
    if( this.x >= this.maxX ) {
      this.x = this.maxX;
      needNewTarget = true;
    }
    if( this.y >= this.maxY ) {
      this.y = this.maxY;
      needNewTarget = true;
    }
    if( floatEquals(this.x,this.targetX,0.9) && floatEquals(this.y,this.targetY,0.9) ) {
      needNewTarget = true;
    }

    if( needNewTarget ) {
      this.calcTargetPoint();
    }
  }

  this.draw = function() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
    this.ctx.fill();
  }

  this.ctx = ctx
  this.maxRadius = maxRadius
  this.radius = Math.random() * maxRadius + 1

  this.maxX = ctx.canvas.width - this.radius
  this.maxY = ctx.canvas.height - this.radius

  this.x = Math.random() * this.maxX
  this.y = Math.random() * this.maxY

  this.calcTargetPoint()
}

export class CanvasAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: Math.floor(random(-1, 1)),
      canvasSize: {
        height: 500,
        width: 500,
      }
    }

    this.canvas = null;
  }

  animation(ctx, balls) {
    const { height, width } = this.state.canvasSize;

    ctx.fillStyle = '#282c34';
    ctx.fillRect(0, 0, width, height)
    for(let i = 0; i < balls.length; i++) {
      balls[i].update()
      balls[i].draw()
    }
  }

  initCanvas(width, height) {
    const canvas = this.canvas;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      let balls = new Array(this.props.particlesCount);
      for(let i = 0; i < balls.length; i++)
        balls[i] = new Ball(ctx, 10)

      setInterval(() => this.animation(ctx, balls), 33)
    }
  }

  componentDidMount() {
    const { height, width } = this.state.canvasSize;
    if (!this.props.stop) {
      this.initCanvas(width, height);
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { height, width } = this.state.canvasSize;
    if (this.props.stop !== prevProps.stop) {
      this.initCanvas(width, height);
    }
  }

  render() {
    const { particlesCount, stop } = this.props;
    const { height, width } = this.state.canvasSize;

    return !stop ? <canvas ref={ref => this.canvas = ref} width={width} height={height} /> : <span></span>;
  }
}

CanvasAnimation.propTypes = {
  particlesCount: PropTypes.number,
  stop: PropTypes.bool,
}
