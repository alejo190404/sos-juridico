import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage.jsx'
import LandingPage from './pages/LandingPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/noticias/:slug" element={<DetailPage section="noticias" />} />
      </Routes>
    </BrowserRouter>
  )
}
