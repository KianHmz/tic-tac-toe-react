import './App.css'
import Info from './components/Info'
import Board from './components/Board'
import Log from './components/Log'
import { useState } from 'react'

export default function App() {

  const [logs, setLogs] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  function addLog(entry) {
    setLogs((prev) => [...prev, entry]);
  }

  return (
    <>
      <div className="container">
        <Info currentPlayer={currentPlayer} />
        <Board onLog={addLog} setCurrentPlayer={setCurrentPlayer} />
        <Log logs={logs} />
      </div>
    </>
  )
}