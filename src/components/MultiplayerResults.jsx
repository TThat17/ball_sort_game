import './Multiplayer.css';

export default function MultiplayerResults({ p1, p2, onHome }) {
    // Determine winner
    // Score = 1000 - time*2 - moves*5
    // Actually we can just compare scores directly passed in.

    const p1Score = p1.score;
    const p2Score = p2.score;

    let winner = null;
    if (p1Score > p2Score) winner = p1.name;
    else if (p2Score > p1Score) winner = p2.name;
    else winner = "Draw";

    return (
        <div className="multiplayer-results">
            <div className="results-container">
                <h1>Duel Results</h1>

                <div className="winner-display">
                    {winner === "Draw" ? (
                        <h2>It's a Draw!</h2>
                    ) : (
                        <h2>Winner: {winner}!</h2>
                    )}
                </div>

                <div className="players-split-view">
                    {/* Player 1 Card */}
                    <div className={`player-result-card ${winner === p1.name ? 'winner-card' : ''}`}>
                        <h3>{p1.name}</h3>
                        <div className="card-stat">
                            <span className="label">Score</span>
                            <span className="value">{p1.score}</span>
                        </div>
                        <div className="card-stat">
                            <span className="label">Time</span>
                            <span className="value">{p1.time}s</span>
                        </div>
                        <div className="card-stat">
                            <span className="label">Moves</span>
                            <span className="value">{p1.moves}</span>
                        </div>
                    </div>

                    <div className="vs-divider">VS</div>

                    {/* Player 2 Card */}
                    <div className={`player-result-card ${winner === p2.name ? 'winner-card' : ''}`}>
                        <h3>{p2.name}</h3>
                        <div className="card-stat">
                            <span className="label">Score</span>
                            <span className="value">{p2.score}</span>
                        </div>
                        <div className="card-stat">
                            <span className="label">Time</span>
                            <span className="value">{p2.time}s</span>
                        </div>
                        <div className="card-stat">
                            <span className="label">Moves</span>
                            <span className="value">{p2.moves}</span>
                        </div>
                    </div>
                </div>

                <button className="secondary-btn" onClick={onHome} style={{ marginTop: '2rem' }}>Back to Menu</button>
            </div>
        </div>
    );
}
