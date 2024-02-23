import { useState } from 'react';
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from './components/Log/Log';

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    // Update the GameTurn in immutable way
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: activePlayer }
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
