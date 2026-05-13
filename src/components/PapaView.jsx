import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import LogLesson from './LogLesson'
import Progress from './Progress'

export default function PapaView() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('log')
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('logged_at', { ascending: false })
    if (error) console.error(error)
    setLessons(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="press-btn bg-white px-4 py-2 rounded-chunky text-primary-dark font-bold">
            ← Home
          </button>
          <h2 className="font-display text-3xl text-primary-dark">Papa</h2>
          <span className="w-20" />
        </div>

        <div className="flex gap-2 mb-6 bg-white p-2 rounded-chunky">
          <TabBtn active={tab === 'log'} onClick={() => setTab('log')}>📝 Log a Lesson</TabBtn>
          <TabBtn active={tab === 'progress'} onClick={() => setTab('progress')}>📊 Progress</TabBtn>
        </div>

        {tab === 'log' && <LogLesson lessons={lessons} onSaved={refresh} />}
        {tab === 'progress' && <Progress lessons={lessons} loading={loading} onChanged={refresh} />}
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 rounded-chunky font-bold transition ${
        active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-primary-soft'
      }`}
    >
      {children}
    </button>
  )
}
