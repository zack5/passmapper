import { BrowserRouter, Routes, Route } from "react-router-dom"

import About from './pages/About'
import Map from './pages/Map'
import Stats from './pages/Stats'

import Layout from './components/Layout'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Map />} />
          <Route path="about" element={<About />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
