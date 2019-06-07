import React from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Container, Row, Col,
  Alert,
} from 'react-bootstrap';

import './styles/App.css';

import { FrameCounter } from './components/FrameCounter';
import { CSSanimation } from './components/animations/CSSanimation';
import { GSAPanimation } from './components/animations/GSAPanimation';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.particlesCount = React.createRef();

    this.state = {
      stop: true,
      particles: 100,
      warning: null,
    }
  }

  setParticles(value) {
    value = parseInt(value);

    value <= 10000 ?
      this.setState({ particles: value }) :
      this.setState({ warning: 'More than 10 000 particles will most likely crash your browser.'})
  }

  handleDismiss() {
    this.setState({
      warning: null,
    });
  }

  render() {
    const { stop, particles, warning } = this.state;

    return (
      <div className='App'>
        <Container>
          <Row className='controls'>
            <Col xs={3}>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Particles count'
                  aria-label='Particles count'
                  aria-describedby='basic-addon2'
                  ref={(ref) => { this.particlesCount = ref }}
                />
                <InputGroup.Append>
                  <Button onClick={() => this.setParticles(this.particlesCount.value)} variant='secondary'>Submit</Button>
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
          { warning && <Row><Col>
            <Alert variant='warning' onClose={this.handleDismiss.bind(this)} dismissible>
              { warning }
            </Alert>
          </Col></Row>}
          <GSAPanimation stop={stop} particlesCount={particles} />
        </Container>
      </div>
    );
  }
}
