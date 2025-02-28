import { BrowserRouter, Routes, Route } from "react-router-dom"

import About from './pages/About'
import CardDetail from './pages/CardDetail'
import CardHolder from './pages/CardHolder'
import Map from './pages/Map'
import NotFound from './pages/NotFound'
import Stats from './pages/Stats'

import { CardsProvider } from './components/CardsContext'
import { NavigationProvider } from './components/NavigationContext'
import Layout from './components/Layout'

import './App.css'

// TODO: 
// - Back to map maintains zoom
// - map icons to svg
// - Add about page
// - something is weird about map back button; reconcile with settings back
// - favicon

export default function App() {
  return (
    <CardsProvider>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route element={<CardHolder />} >
                <Route index element={<Map />} />
                <Route path=":id" element={<CardDetail />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="stats" element={<Stats />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NavigationProvider>
    </CardsProvider>
  )
}