import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import PapaView from './components/PapaView'
import OliviaView from './components/OliviaView'

export default function App() {
  const [view, setView] = useState('home')

  if (view === 'papa') return <PapaView onBack={() => setView('home')} />
  if (view === 'olivia') return <OliviaView onBack={() => setView('home')} />
  return <HomeScreen onChoose={setView} />
}
