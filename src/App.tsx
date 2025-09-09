import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Research from './Pages/Research.tsx'

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/recherche" element={<Research />} />
      </Routes>
    </Router>
  )
}

export default App
