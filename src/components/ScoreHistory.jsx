import { useState, useEffect } from 'react';
import './ScoreHistory.css';

export default function ScoreHistory({ onBack }) {
    const [history, setHistory] = useState([]);
    const [filterUser, setFilterUser] = useState('');

    useEffect(() => {
        // We were saving top 10 to 'ballSortScores'.
        // To support full history, we should have probably saved all to a different key or the same.
        // The previous implementation was: localStorage.setItem('ballSortScores', JSON.stringify(saved.slice(0, 10)));
        // This implies we lost history > 10.
        // I should fix the Game.jsx saving logic to save to a 'ballSortHistory' as well, or just keep all in 'ballSortScores' and slice for display in leaderboard.
        // IMPORTANT: I need to update Game.jsx to save full history first? 
        // For now, let's just read what we have, but I'll update Game.jsx in next step to save to 'ballSortHistory'.

        // For this component, let's assume 'ballSortHistory' exists, or fall back to 'ballSortScores'.
        const fullHistory = JSON.parse(localStorage.getItem('ballSortHistory') || localStorage.getItem('ballSortScores') || '[]');
        setHistory(fullHistory);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (isoString) => {
        if (!isoString) return '-';
        return new Date(isoString).toLocaleString();
    };

    const filteredHistory = filterUser
        ? history.filter(h => h.username.toLowerCase().includes(filterUser.toLowerCase()))
        : history;

    // Sort by date desc
    const sortedHistory = [...filteredHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="history-container">
            <h1>Score History</h1>
            <div className="history-controls">
                <input
                    type="text"
                    placeholder="Filter by username"
                    value={filterUser}
                    onChange={e => setFilterUser(e.target.value)}
                    className="filter-input"
                />
                <button className="back-btn" onClick={onBack}>Back</button>
            </div>

            <div className="history-list">
                <div className="history-header">
                    <span>Date</span>
                    <span>Player</span>
                    <span>Score</span>
                    <span>Time</span>
                </div>
                <div className="history-scroll-area">
                    {sortedHistory.length === 0 ? (
                        <div className="no-history">No games recorded yet.</div>
                    ) : (
                        sortedHistory.map((entry, index) => (
                            <div key={index} className="history-row">
                                <span>{formatDate(entry.date)}</span>
                                <span>{entry.username}</span>
                                <span className="score">{entry.score}</span>
                                <span className="time">{formatTime(entry.time)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
