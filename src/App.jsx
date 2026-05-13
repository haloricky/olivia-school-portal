import { Routes, Route, Navigate } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import PapaView from './components/PapaView'
import OliviaView from './components/OliviaView'
import LessonPage from './components/LessonPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/papa" element={<PapaView />} />
      <Route path="/olivia" element={<OliviaView />} />
      <Route path="/lesson/:week" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
