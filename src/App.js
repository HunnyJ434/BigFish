import './App.css';
import Background from './components/Background'
import Player from './components/Player'
import { useEffect } from 'react';
import { useRef } from 'react';


function App() {
  return (
  <div className="container">
    <Background width={1300} height={600} />
    <Player width={1300} height={600} />
    <button className="newGame">Start New Game</button>
    <button className="objective">Objective</button>
    <div className="objectiveDiv">
      <p>Avoid Big Fishes, and Eat small ones to grow bigger. 
        Reach a Score of 1500 to win</p>
      <button className="objectiveBtn">OK</button>
    </div>
  </div>
  );
}

export default App;
