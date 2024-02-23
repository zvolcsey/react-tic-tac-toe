import "./Log.css";

export default function Log({ turns }) {
  const listItems = turns.map((turn, idx) => (
    <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>
  ));

  return (
    <ol id="log">
      {listItems}
    </ol>
  );
}