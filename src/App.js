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

function Board({ xIsNext, squares, onPlay }) {
  //// State to track whose turn it is (X or O) and the current state of the squares.

  // defining the handleClick function inside the Board component to update the squares array.Adding argument i to the handleClick function that takes the index of the square to update
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //slice(): to create a new copy of the squares array after every move.
    ////remembering the state of x and o and If the square is already filled, return early.
    //// Create a copy of the squares array to modify without mutating the original state.
    const nextSquares = squares.slice();
    // Set the value of the clicked square based on whose turn it is (X or O).
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
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

//history: An array that stores the state of the game after each move.
//currentMove: Represents the index of the current move in the game history.
//xIsNext: A boolean indicating whether it is "X"'s turn based on the current move.

export default function Game() {
  // State to track game history, the current move, and whose turn it is.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Function to handle a play (updating the game state after a move).

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    //// Set the current move to the last index of the updated history
    setCurrentMove(nextHistory.length - 1);
  }

  // Function to jump to a specific move in the game history.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Map the game history to a list of buttons representing each move.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    // Render the game board and move history.
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
