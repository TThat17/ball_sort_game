import { useState, useEffect } from 'react';
import './MainMenu.css';

export default function MainMenu({ onStart, onViewHistory, onMultiplayer }) {
    const [username, setUsername] = useState('');
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('ballSortScores') || '[]');
        setHighScores(saved);
        const lastUser = localStorage.getItem('lastBallSortUser');
        if (lastUser) setUsername(lastUser);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('lastBallSortUser', username);
            onStart(username);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="main-menu">
            <div className="menu-container">
                <h1>Ball Sort Puzzle</h1>

                <form onSubmit={handleSubmit} className="user-form">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={15}
                        required
                        className="username-input"
                    />
                    <button type="submit" className="play-btn">Play Game</button>

                    <div className="menu-buttons">
                        <button type="button" className="menu-btn" onClick={onMultiplayer}>Multiplayer Duel</button>
                        <button type="button" className="menu-btn" onClick={onViewHistory}>Score History</button>
                    </div>
                </form>

                <div className="leaderboard">
                    <h2>Top 10 Leaders</h2>
                    {highScores.length === 0 ? (
                        <p className="no-scores">No scores yet. Be the first!</p>
                    ) : (
                        <div className="scores-list">
                            <div className="score-header">
                                <span>Rank</span>
                                <span>Player</span>
                                <span>Score</span>
                                <span>Time</span>
                            </div>
                            {highScores.map((entry, index) => (
                                <div key={index} className={`score-row ${index < 3 ? 'top-rank' : ''}`}>
                                    <span className="rank">#{index + 1}</span>
                                    <span className="player">{entry.username}</span>
                                    <span className="score">{entry.score}</span>
                                    <span className="time">{formatTime(entry.time)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
