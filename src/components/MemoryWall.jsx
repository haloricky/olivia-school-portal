import { SUBJECTS } from '../data/subjects'

export default function MemoryWall({ lessons }) {
  if (lessons.length === 0) {
    return (
      <div className="bg-white rounded-chunkier p-8 text-center">
        <div className="text-6xl mb-3">📭</div>
        <p className="text-gray-500 font-bold">No memories yet. Let's learn something!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {lessons.map((l) => {
        const s = SUBJECTS[l.subject] ?? { emoji: '❓', color: '#999', bg: '#eee', name: l.subject }
        return (
          <div
            key={l.id}
            className="rounded-chunkier p-5"
            style={{
              background: s.bg,
              border: `3px solid ${s.color}`,
              boxShadow: `0 4px 0 0 ${s.color}`,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl mb-1">{s.emoji}</div>
                <div className="text-xs font-bold opacity-70" style={{ color: s.color }}>
                  Week {l.week} · {s.name}
                </div>
                <div className="font-display text-xl leading-tight mt-1" style={{ color: s.color }}>
                  {l.topic}
                </div>
              </div>
              <div className="text-yellow-500 font-bold whitespace-nowrap">
                {'⭐'.repeat(l.stars || 0)}
              </div>
            </div>
            {l.mood && <div className="text-2xl mt-3">{l.mood}</div>}
          </div>
        )
      })}
    </div>
  )
}
