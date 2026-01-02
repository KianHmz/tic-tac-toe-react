import { useState } from "react";

export default ({ onLog, setCurrentPlayer }) => {
    const [cells, setCells] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    const [symbol, setSymbol] = useState("X");
    const [winner, setWinner] = useState(null);

    function checkWinner(board) {
        const lines = [
            // rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            const v1 = board[a[0]][a[1]];
            const v2 = board[b[0]][b[1]];
            const v3 = board[c[0]][c[1]];

            if (v1 && v1 === v2 && v2 === v3) {
                return v1;
            }
        }

        return null;
    }

    function handleClickCell(rowIndex, colIndex) {
        if (cells[rowIndex][colIndex] || winner) return;

        const updated = cells.map(row => [...row]);
        updated[rowIndex][colIndex] = symbol;
        onLog(`${symbol} marked (${rowIndex}, ${colIndex})`);

        const gameWinner = checkWinner(updated);

        if (gameWinner) {
            setWinner(gameWinner);
            onLog(`${gameWinner} wins!`);
        } else if (updated.flat().every(cell => cell !== null)) {
            setWinner("Draw");
            onLog("It's a draw!");
        } else {
            const next = symbol === "X" ? "O" : "X";
            setSymbol(next);
            setCurrentPlayer(next);
        }

        setCells(updated);
    }

    return (
        <>
            {winner && (
                <div className="game-overlay">
                    <div className="overlay-box">
                        <h1>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}</h1>
                        <button onClick={() => window.location.reload()}>
                            Play Again
                        </button>
                    </div>
                </div>
            )}

            <div className="game-board">
                {cells.map((row, rowIndex) =>
                    row.map((col, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${col ? "disabled" : ""}`}
                            onClick={() => handleClickCell(rowIndex, colIndex)}
                        >
                            <span className={`${col === "X" ? "x" : "o"}`}>{col}</span>
                        </div>
                    ))
                )}
            </div>
        </>
    );

}
