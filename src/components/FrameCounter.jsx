import React from 'react';
import { Button, ButtonToolbar, Badge } from 'react-bootstrap';

export class FrameCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      fps: 0,
      measuring: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.measuring !== prevState.measuring)
      this.refreshLoop();
  }

  refreshLoop() {
    let { fps, measuring } = this.state;
    const times = [...this.state.times];

    if (measuring) window.requestAnimationFrame(() => {
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

  toggleMeasuring() {
    this.setState({
      times: [],
      fps: 0,
      measuring: !this.state.measuring,
    });
  }

  render() {
    const { times, fps } = this.state;

    return <ButtonToolbar>
        <Button variant='secondary' onClick={this.toggleMeasuring.bind(this)}>Toggle fps</Button>
        <Badge className='frames' variant='light'>{fps}</Badge>
      </ButtonToolbar>
  }
}
