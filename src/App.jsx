import { useState } from 'react';
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from './components/Log/Log';
import GameOver from './components/GameOver/GameOver';
import { PLAYERS } from './utils/constants';
import { 
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner
} from './utils/utils';

export default function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {
          (winner || hasDraw) && 
          <GameOver 
            winner={winner} 
            onRestart={handleRestart} 
          />
        }
        <GameBoard 
          onSelectSquare={(rowIndex, colIndex) => handleSelectSquare(rowIndex, colIndex)}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}
