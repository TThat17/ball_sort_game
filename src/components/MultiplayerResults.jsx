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

                <div className="comparison-table">
                    <div className="row header">
                        <span></span>
                        <span>{p1.name}</span>
                        <span>{p2.name}</span>
                    </div>
                    <div className="row">
                        <span>Score</span>
                        <span className={p1Score > p2Score ? 'win-val' : ''}>{p1Score}</span>
                        <span className={p2Score > p1Score ? 'win-val' : ''}>{p2Score}</span>
                    </div>
                    <div className="row">
                        <span>Time</span>
                        <span>{p1.time}s</span>
                        <span>{p2.time}s</span>
                    </div>
                    <div className="row">
                        <span>Moves</span>
                        <span>{p1.moves}</span>
                        <span>{p2.moves}</span>
                    </div>
                </div>

                <button className="secondary-btn" onClick={onHome} style={{ marginTop: '2rem' }}>Back to Menu</button>
            </div>
        </div>
    );
}
