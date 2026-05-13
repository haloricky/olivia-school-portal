import { useNavigate } from 'react-router-dom'
import { SUBJECTS, SUBJECT_KEYS } from '../data/subjects'
import { supabase } from '../lib/supabase'

const TARGET_PER_SUBJECT = 7

export default function Progress({ lessons, loading, onChanged }) {
  const navigate = useNavigate()

  async function remove(e, id) {
    e.stopPropagation()
    if (!confirm('Delete this lesson?')) return
    const { error } = await supabase.from('lessons').delete().eq('id', id)
    if (error) {
      alert('Could not delete: ' + error.message)
      return
    }
    onChanged?.()
  }

  const counts = Object.fromEntries(SUBJECT_KEYS.map((k) => [k, 0]))
  for (const l of lessons) {
    if (counts[l.subject] !== undefined) counts[l.subject] += 1
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-chunkier p-5">
        <h3 className="font-display text-2xl text-primary-dark mb-4">Per-subject progress</h3>
        <div className="space-y-3">
          {SUBJECT_KEYS.map((key) => {
            const s = SUBJECTS[key]
            const done = counts[key]
            const pct = Math.min(100, (done / TARGET_PER_SUBJECT) * 100)
            return (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="font-bold" style={{ color: s.color }}>
                    {s.emoji} {s.name}
                  </span>
                  <span className="text-sm text-gray-500 font-bold">
                    {done}/{TARGET_PER_SUBJECT}
                  </span>
                </div>
                <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: s.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-chunkier p-5">
        <h3 className="font-display text-2xl text-primary-dark mb-4">All lessons</h3>
        {loading ? (
          <p className="text-gray-400">Loading…</p>
        ) : lessons.length === 0 ? (
          <p className="text-gray-400">No lessons yet.</p>
        ) : (
          <ul className="space-y-2">
            {lessons.map((l) => {
              const s = SUBJECTS[l.subject] ?? { emoji: '❓', name: l.subject, color: '#999', bg: '#eee' }
              return (
                <li
                  key={l.id}
                  onClick={() => navigate(`/lesson/${l.week}`)}
                  className="press-btn flex items-center justify-between p-3 rounded-chunky cursor-pointer"
                  style={{ background: s.bg }}
                >
                  <div className="min-w-0">
                    <div className="font-bold truncate" style={{ color: s.color }}>
                      {s.emoji} {l.topic} →
                    </div>
                    <div className="text-xs text-gray-500">
                      Week {l.week} · {l.mood ?? ''} {'⭐'.repeat(l.stars || 0)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => remove(e, l.id)}
                    className="ml-3 bg-white text-red-500 font-bold px-3 py-2 rounded-chunky text-sm"
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
