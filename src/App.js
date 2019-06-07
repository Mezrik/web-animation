import React from 'react';
import './styles/App.css';
import { FrameCounter } from './components/FrameCounter';
import { CSSanimation } from './components/animations/CSSanimation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FrameCounter />
        <CSSanimation particlesCount={2000} />
      </header>
    </div>
  );
}

export default App;
