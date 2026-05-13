import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import MapTab from './MapTab'
import MemoryWall from './MemoryWall'
import StarsTab from './StarsTab'

export default function OliviaView({ onBack }) {
  const [tab, setTab] = useState('map')
  const [lessons, setLessons] = useState([])

  async function refresh() {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('logged_at', { ascending: false })
    if (error) console.error(error)
    setLessons(data ?? [])
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="press-btn bg-white px-4 py-2 rounded-chunky text-primary-dark font-bold">
            ← Home
          </button>
          <h2 className="font-display text-3xl text-primary-dark">Olivia ⭐</h2>
          <span className="w-20" />
        </div>

        <div className="flex gap-2 mb-6 bg-white p-2 rounded-chunky">
          <TabBtn active={tab === 'map'} onClick={() => setTab('map')}>🗺️ My Map</TabBtn>
          <TabBtn active={tab === 'memory'} onClick={() => setTab('memory')}>💝 Memory Wall</TabBtn>
          <TabBtn active={tab === 'stars'} onClick={() => setTab('stars')}>⭐ My Stars</TabBtn>
        </div>

        {tab === 'map' && <MapTab lessons={lessons} />}
        {tab === 'memory' && <MemoryWall lessons={lessons} />}
        {tab === 'stars' && <StarsTab lessons={lessons} />}
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 rounded-chunky font-bold transition text-sm sm:text-base ${
        active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-primary-soft'
      }`}
    >
      {children}
    </button>
  )
}
