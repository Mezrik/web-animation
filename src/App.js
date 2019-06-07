import React from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Container, Row, Col
} from 'react-bootstrap';

import './styles/App.css';

import { FrameCounter } from './components/FrameCounter';
import { CSSanimation } from './components/animations/CSSanimation';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.particlesCount = React.createRef();

    this.state = {
      stop: true,
      particles: 100,
    }
  }

  render() {
    const { stop, particles } = this.state;

    return (
      <div className='App'>
        <Container>
          <Row>
            <Col xs={3}>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Particles count'
                  aria-label='Particles count'
                  aria-describedby='basic-addon2'
                  ref={(ref) => { this.particlesCount = ref }}
                />
                <InputGroup.Append>
                  <Button onClick={() => this.setState({ particles: parseInt(this.particlesCount.value) })} variant='secondary'>Submit</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col xs={2}>
              <Button onClick={() => this.setState({ stop: !this.state.stop })} variant='primary'>Toggle animation</Button>
            </Col>
            <Col>
              <FrameCounter />
            </Col>
          </Row>
          <CSSanimation stop={stop} particlesCount={particles} />
        </Container>
      </div>
    );
  }
}
