import { useState } from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import './index.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [username, setUsername] = useState('');

  const handleStartGame = (user) => {
    setUsername(user);
    setIsPlaying(true);
  };

  const handleLogout = () => {
    setIsPlaying(false);
    setUsername('');
  };

  return (
    <div className="app">
      {isPlaying ? (
        <Game username={username} onLogout={handleLogout} />
      ) : (
        <MainMenu onStart={handleStartGame} />
      )}
    </div>
  )
}

export default App
