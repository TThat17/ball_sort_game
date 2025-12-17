import { useState } from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import ScoreHistory from './components/ScoreHistory'
import MultiplayerSetup from './components/MultiplayerSetup'
import MultiplayerResults from './components/MultiplayerResults'
import { generateLevel } from './utils/gameUtils'
import './index.css'

function App() {
  const [view, setView] = useState('MENU'); // MENU, GAME, HISTORY, MULTI_SETUP...
  const [username, setUsername] = useState('');

  // Multiplayer State
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [multiSeed, setMultiSeed] = useState(null);
  const [p1Stats, setP1Stats] = useState(null);
  const [p2Stats, setP2Stats] = useState(null);

  const handleStartGame = (user) => {
    setUsername(user);
    setView('GAME');
  };

  const handleLogout = () => {
    setView('MENU');
    setUsername('');
  };

  const handleHome = () => {
    setView('MENU');
  };

  // Multiplayer Logic
  const handleStartDuel = (name1, name2) => {
    setP1(name1);
    setP2(name2);
    // Generate shared level
    const seed = generateLevel(6, 4);
    setMultiSeed(seed);
    setView('MULTI_P1');
  };

  const handleP1Complete = (stats) => {
    setP1Stats({ name: p1, ...stats });
    setView('MULTI_INTERSTITIAL');
  };

  const handleP2Complete = (stats) => {
    setP2Stats({ name: p2, ...stats });
    setView('MULTI_RESULTS');
  };

  return (
    <div className="app">
      {view === 'GAME' && (
        <Game username={username} onLogout={handleLogout} onHome={handleHome} />
      )}
      {view === 'MENU' && (
        <MainMenu
          onStart={handleStartGame}
          onViewHistory={() => setView('HISTORY')}
          onMultiplayer={() => setView('MULTI_SETUP')}
        />
      )}
      {view === 'HISTORY' && (
        <ScoreHistory onBack={() => setView('MENU')} />
      )}
      {view === 'MULTI_SETUP' && (
        <MultiplayerSetup onStart={handleStartDuel} onBack={() => setView('MENU')} />
      )}
      {view === 'MULTI_P1' && (
        <Game
          username={`P1: ${p1}`}
          levelSeed={multiSeed}
          onComplete={handleP1Complete}
        />
      )}
      {view === 'MULTI_INTERSTITIAL' && (
        <div className="interstitial-overlay">
          <div className="interstitial-content">
            <h2>{p1} has finished!</h2>
            <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>Pass the device to {p2}.</p>
            <button className="ready-btn" onClick={() => setView('MULTI_P2')}>
              {p2}, Start Your Turn
            </button>
          </div>
        </div>
      )}
      {view === 'MULTI_P2' && (
        <Game
          username={`P2: ${p2}`}
          levelSeed={multiSeed}
          onComplete={handleP2Complete}
        />
      )}
      {view === 'MULTI_RESULTS' && (
        <MultiplayerResults p1={p1Stats} p2={p2Stats} onHome={() => setView('MENU')} />
      )}
    </div>
  )
}

export default App
