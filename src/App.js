import React from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Container, Row, Col,
  Alert,
  Dropdown, ButtonGroup
} from 'react-bootstrap';

import './styles/App.css';

import { FrameCounter } from './components/FrameCounter';
import { CSSanimation } from './components/animations/CSSanimation';
import { GSAPanimation } from './components/animations/GSAPanimation';
import { CanvasAnimation } from './components/animations/CanvasAnimation';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.particlesCount = React.createRef();

    this.state = {
      stop: false,
      particles: 100,
      warning: null,
      animation: 0,
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

  setWarning(warning) {
    this.setState({ warning })
  }

  render() {
    const { stop, particles, warning, animation } = this.state;

    const animations = {
      0: {
        id: 0,
        name: 'CSS Animation',
        animation: <CSSanimation stop={stop} particlesCount={particles} />,
      },
      1: {
        id: 1,
        name: 'Greensock JS Animation',
        animation: <GSAPanimation stop={stop} particlesCount={particles} />,
      },
      2: {
        id: 2,
        name: 'Canvas requestAnimationFrame animation',
        animation: <CanvasAnimation stop={stop} particlesCount={particles} setWarning={(warning) => this.setWarning(warning)} />,
      },
    }

    return (
      <div className='App'>
        <Container>

          <Row className='controls'>
            <Col xs={4}>
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

            <Col>
              <ButtonGroup>
                <Dropdown as={ButtonGroup} onSelect={(key) => this.setState({ animation: key })}>
                  <Button variant='primary' onClick={() => this.setState({ stop: !this.state.stop })}>Toggle animation</Button>
                  <Dropdown.Toggle split variant='primary' id='dropdown-split-basic' />
                  <Dropdown.Menu>
                    {Object.keys(animations).map((key, i) => {
                      return <Dropdown.Item key={`select-item-${i}`} eventKey={key}>{animations[key].name}</Dropdown.Item>;
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <FrameCounter stop={stop} />
              </ButtonGroup>
            </Col>
          </Row>

          { warning && <Row><Col>
            <Alert variant='warning' onClose={this.handleDismiss.bind(this)} dismissible>
              { warning }
            </Alert>
          </Col></Row>}

          {animations[animation] && <Row>
            <Col>
              <h3>{animations[animation].name}</h3>
              {animations[animation].animation}
            </Col>
          </Row>}
          <footer>
            Created for the purpose of Specialist English exam presentation <br/>
            <b>Source code: </b>
            <a href="https://github.com/Mezrik/web-animation">https://github.com/Mezrik/web-animation</a>
          </footer>
        </Container>
      </div>
    );
  }
}
