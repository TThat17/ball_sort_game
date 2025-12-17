import { useState } from 'react';
import './Multiplayer.css';

export default function MultiplayerSetup({ onStart, onBack }) {
    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (p1.trim() && p2.trim()) {
            onStart(p1.trim(), p2.trim());
        }
    };

    return (
        <div className="multiplayer-setup">
            <div className="setup-container">
                <h1>Duel Setup</h1>
                <form onSubmit={handleSubmit} className="setup-form">
                    <div className="player-input-group">
                        <label>Player 1</label>
                        <input
                            type="text"
                            value={p1}
                            onChange={e => setP1(e.target.value)}
                            placeholder="Name"
                            required
                            maxLength={15}
                        />
                    </div>
                    <div className="player-input-group">
                        <label>Player 2</label>
                        <input
                            type="text"
                            value={p2}
                            onChange={e => setP2(e.target.value)}
                            placeholder="Name"
                            required
                            maxLength={15}
                        />
                    </div>
                    <button type="submit" className="start-duel-btn">Start Duel</button>
                    <button type="button" className="back-btn" onClick={onBack}>Back</button>
                </form>
            </div>
        </div>
    );
}
