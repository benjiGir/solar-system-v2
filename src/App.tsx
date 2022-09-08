import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import SolarSystem from './pages/SolarSystem';
import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/solar-system" element={<SolarSystem />} />
      </Routes>
    </>
  )
}

export default App
