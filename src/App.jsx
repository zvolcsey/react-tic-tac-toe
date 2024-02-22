import Player from "./components/Player/Player";

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        {/* TODO: Game Board */}
      </div>
      {/* TODO: Log */}
    </main>
  )
}

export default App
