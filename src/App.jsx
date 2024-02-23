import { useState } from 'react';
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from './components/Log/Log';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    // Update the array of game turns
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    
    // Update the GameTurn in immutable way
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer }
        , ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player 
            initialName="Player 2" 
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard 
          onSelectSquare={(rowIndex, colIndex) => handleSelectSquare(rowIndex, colIndex)}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
