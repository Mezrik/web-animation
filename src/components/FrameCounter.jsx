import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Badge } from 'react-bootstrap';

export class FrameCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      fps: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.stop !== prevProps.stop) {
      this.setState({
        times: [],
        fps: 0
      });
      this.refreshLoop();
    }
  }

  refreshLoop() {
    let { fps } = this.state;
    const { stop } = this.props;
    const times = [...this.state.times];

    if (!stop) window.requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;

      this.setState({ times, fps });
      this.refreshLoop();
    });
  }


  render() {
    const { times, fps } = this.state;
    return <Badge className='frames' variant='light'>FPS: {fps}</Badge>
  }
}

FrameCounter.propTypes = {
  stop: PropTypes.bool,
}
