import './App.css';
import GameBoard from 'src/components/GameBoard';
import React from 'react';

const App: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Connect Four</h1>
      <GameBoard/>
    </div>
  );
}

export default App;
