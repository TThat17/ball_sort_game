import { useState } from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import ScoreHistory from './components/ScoreHistory'
import './index.css'

function App() {
  const [view, setView] = useState('MENU'); // MENU, GAME, HISTORY, MULTI_SETUP...
  const [username, setUsername] = useState('');

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

  return (
    <div className="app">
      {view === 'GAME' && (
        <Game username={username} onLogout={handleLogout} onHome={handleHome} />
      )}
      {view === 'MENU' && (
        <MainMenu
          onStart={handleStartGame}
          onViewHistory={() => setView('HISTORY')}
          onMultiplayer={() => setView('MULTI_SETUP')} // Logic coming soon
        />
      )}
      {view === 'HISTORY' && (
        <ScoreHistory onBack={() => setView('MENU')} />
      )}
      {view === 'MULTI_SETUP' && (
        <div style={{ color: 'white' }}>Multiplayer Setup (Coming Soon) <button onClick={() => setView('MENU')}>Back</button></div>
      )}
    </div>
  )
}

export default App
