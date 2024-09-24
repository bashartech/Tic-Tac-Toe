type Players = "X" | "O" | "BOTH"| null
export default function Square({
    value,
    onClick,
    winner
}: {
    winner: Players;
    value: Players;
    onClick: () => void

}) { if(!value){
    return <button className="square" onClick={onClick} disabled={Boolean(winner)} ></button>
}
return (
<button
className={`square square_${value.toLocaleLowerCase()}`}
 disabled>{value}</button>
)
}
