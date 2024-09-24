import { useEffect, useState } from "react";
import Square from "@/components/Square";
type Players = "X" | "O" | "BOTH"| null


function calculateWinner(squares: Players[]) {
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
    for (let i = 0; i< lines.length; i++){
        const [a, b, c] = lines[i];
        if(

            squares[a] &&
            squares[a] === squares[b] && 
            squares[a] === squares[c] 
        ){
            return squares[a]
        }
        }
        return null
    }

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayers, setCurrentPlayers] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, SetWinner] = useState<Players>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    SetWinner(null);
    setCurrentPlayers(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }

  function setSquareValue(index:number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayers;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayers(currentPlayers === "X" ? "O" : "X");
  }
  
  useEffect(()=>{
    const w = calculateWinner(squares);
    if(w){
        SetWinner(w)
    }
    if(!w && !squares.filter((Square) => !Square).length){
        SetWinner("BOTH")
    }
  })


  return (
    <>
      <div>
        {!winner && <p>Hey {currentPlayers} its your turn </p>}
        {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
        {winner && winner === "BOTH" &&  <p>Congratulations you're both winners</p>}

        <div className="grid">
          {Array(9)
            .fill(null)
            .map((_, i) => {
              return (
                <Square
                  winner={winner}
                  key={i}
                  onClick={() => setSquareValue(i)}
                  value={squares[i]}
                />
              );
            })}
        </div>
      </div>
      <div className="btn">
      <button className="reset" onClick={reset}>
        Reset
      </button>
      </div>
    </>
  );
}
