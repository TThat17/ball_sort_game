import { useState, useEffect } from 'react';
import Vial from './Vial';
import { generateLevel, checkWin } from '../utils/gameUtils';
import './Game.css';

export default function Game({ username, onLogout, onHome }) {
    const [vials, setVials] = useState([]);
    const [selectedVialIndex, setSelectedVialIndex] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    // Stats
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Initialize Level
    useEffect(() => {
        startNewGame();
    }, []);

    // Timer
    useEffect(() => {
        let interval = null;
        if (isActive && !gameWon) {
            interval = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, gameWon, time]);

    const startNewGame = () => {
        const newVials = generateLevel(6, 4); // 6 vials, 4 colors
        setVials(newVials);
        setSelectedVialIndex(null);
        setGameWon(false);
        setMoves(0);
        setTime(0);
        setScore(0);
        setIsActive(true);
    };

    const handleVialClick = (index) => {
        if (isAnimating || gameWon) return;

        if (selectedVialIndex === null) {
            // Select source
            if (vials[index].length > 0) {
                setSelectedVialIndex(index);
            }
        } else {
            // Move attempt
            if (selectedVialIndex === index) {
                // Deselect
                setSelectedVialIndex(null);
            } else {
                handleMove(selectedVialIndex, index);
            }
        }
    };

    const handleMove = (fromIndex, toIndex) => {
        const sourceVial = [...vials[fromIndex]];
        const targetVial = [...vials[toIndex]];

        const ballToMove = sourceVial[sourceVial.length - 1];

        // Validation
        // 1. Target full? (Max 4)
        if (targetVial.length >= 4) {
            // Invalid (maybe shake animation?)
            setSelectedVialIndex(null);
            return;
        }

        // 2. Color match?
        if (targetVial.length > 0) {
            const targetTopBall = targetVial[targetVial.length - 1];
            if (targetTopBall !== ballToMove) {
                // Invalid
                setSelectedVialIndex(null);
                return;
            }
        }

        // Valid Move
        // Perform update
        const newVials = [...vials];
        newVials[fromIndex] = sourceVial.slice(0, -1);
        newVials[toIndex] = [...targetVial, ballToMove];

        setVials(newVials);
        setSelectedVialIndex(null);
        setMoves(m => m + 1);

        // Check Win
        if (checkWin(newVials)) {
            setGameWon(true);
            setIsActive(false);
            // calculateScore(moves + 1, time); // moves + 1 because state isn't updated yet? actually current moves + 1
            // Better: use updated values in effect or just calc here
            const finalScore = Math.max(0, 1000 - time * 2 - (moves + 1) * 5);
            setScore(finalScore);
            saveScore(finalScore, time);
        }
    };

    const saveScore = (finalScore, finalTime) => {
        const entry = {
            username: username || 'Anonymous',
            score: finalScore,
            time: finalTime,
            date: new Date().toISOString()
        };
        const saved = JSON.parse(localStorage.getItem('ballSortScores') || '[]');
        saved.push(entry);
        saved.sort((a, b) => b.score - a.score);
        localStorage.setItem('ballSortScores', JSON.stringify(saved.slice(0, 10))); // Top 10
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')} `;
    };

    return (
        <div className="game-container">
            <div className="hud">
                <div className="stat-box">Time: {formatTime(time)}</div>
                <div className="stat-box">Moves: {moves}</div>
                <div className="stat-box user-display">{username}</div>
            </div>

            {gameWon && (
                <div className="win-overlay">
                    <div className="win-modal">
                        <h2>Level Completed!</h2>
                        <div className="final-stats">
                            <p>Score: {score}</p>
                            <p>Time: {formatTime(time)}</p>
                        </div>
                        <div className="win-actions">
                            <button className="restart-btn" onClick={startNewGame}>Play Again</button>
                            <button className="secondary-btn" onClick={onHome}>Home</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="vials-area">
                {vials.map((balls, index) => (
                    <Vial
                        key={index}
                        balls={balls}
                        isSelected={selectedVialIndex === index}
                        onClick={() => handleVialClick(index)}
                    />
                ))}
            </div>
            <div className="controls">
                <button className="restart-btn" onClick={startNewGame}>Restart</button>
                <button className="secondary-btn" onClick={onHome}>Home</button>
                {onLogout && <button className="logout-btn" onClick={onLogout}>Logout</button>}
            </div>
        </div>
    );
}
