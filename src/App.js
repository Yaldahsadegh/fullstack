function Square() {
  return <button className="square">1</button>;
}

//making the function accessible outside the file
export default function board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
} //buttons have been created with use of div to make them not to be in one single line and get our square shape
