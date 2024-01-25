import { useState } from "react";
//Square component receives the value prop from the Board component.
//value: Represents the symbol ("X", "O", or null for empty) to be displayed on the square.
//onSquareClick: Callback function to be invoked when the square is clicked.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  //// State to track whose turn it is (X or O) and the current state of the squares.
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  // defining the handleClick function inside the Board component to update the squares array.Adding argument i to the handleClick function that takes the index of the square to update
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    ////remembering the state of x and o and If the square is already filled, return early.
    //// Create a copy of the squares array to modify without mutating the original state.
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    // Set the value of the clicked square based on whose turn it is (X or O).
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //() => handleClick(0) is an arrow function
  // Render the board with 3 rows of Square components.
  // Board : a component represents the overall game board, managing the state and rendering the grid of squares.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//calculateWinner function is designed to determine if there is a winner in the Tic-Tac-Toe game based on the current state of the board. It takes the squares array as an argument, representing the current state of the game board.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //// Check each winning combination to see if any player has won.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //// Check if the squares at positions a, b, and c are all filled with the same symbol (X or O).
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  //// If no winner is found in any of the winning combinations, return null.
  return null;
}
