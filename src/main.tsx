import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game.tsx';
import Lobby from './Lobby.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<Game />} />
        <Route path='/lobby' element={<Lobby />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
