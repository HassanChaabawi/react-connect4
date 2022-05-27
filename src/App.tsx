import './App.css';
import Board from 'src/components/Board';
import React from 'react';

const App: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Connect Four</h1>
      <Board/>
    </div>
  );
}

export default App;
