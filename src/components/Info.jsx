import { useState } from "react";

export default ({ currentPlayer }) => {

    const [players, setPlayers] = useState([
        { 'name': 'Player1', 'symbol': 'X', 'isEditing': false },
        { 'name': 'Player2', 'symbol': 'O', 'isEditing': false }
    ]);

    function toggleEdit(index, isEditing) {
        const updatedPlayers = [...players];
        updatedPlayers[index].isEditing = isEditing;
        setPlayers(updatedPlayers);
    }

    function handleKeyDown(e, index) {
        if (e.key === 'Enter')
            toggleEdit(index, false);
    }

    function handleNameChange(index, newName) {
        const updatedPlayers = [...players];
        updatedPlayers[index].name = newName;
        setPlayers(updatedPlayers);
    }

    return (
        <div className="game-info">
            <div className="players">
                {players.map((player, index) => (
                    <div key={index}
                        className={`player-info ${currentPlayer === player.symbol ? "active-player" : ""}`}>
                        {players[index].isEditing ?
                            <input type="text"
                                className="player-name"
                                value={player.name}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onChange={(e) => handleNameChange(index, e.target.value)} />
                            :
                            <span className="player-name"
                                onClick={() => { toggleEdit(index, true) }}>
                                {player.name}
                            </span>
                        }
                        <div className="player-symbol">{player.symbol}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}