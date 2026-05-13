import { useState } from 'react'
import { SUBJECTS, SUBJECT_KEYS } from '../data/subjects'

const TARGET = 7

export default function MapTab({ lessons }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {SUBJECT_KEYS.map((key) => {
        const s = SUBJECTS[key]
        const subjectLessons = lessons.filter((l) => l.subject === key)
        const done = subjectLessons.length
        const isOpen = open === key
        const pct = Math.min(100, (done / TARGET) * 100)
        return (
          <button
            key={key}
            onClick={() => setOpen(isOpen ? null : key)}
            className="press-btn rounded-chunkier p-5 text-left col-span-2 sm:col-span-1"
            style={{
              background: s.bg,
              border: `3px solid ${s.color}`,
              boxShadow: `0 4px 0 0 ${s.color}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{s.emoji}</span>
              <div className="flex-1">
                <div className="font-display text-lg leading-tight" style={{ color: s.color }}>
                  {s.name}
                </div>
                <div className="text-xs font-bold" style={{ color: s.color }}>
                  {done}/{TARGET} done
                </div>
              </div>
              <CircleProgress pct={pct} color={s.color} />
            </div>

            {isOpen && (
              <div className="mt-4 space-y-2">
                {subjectLessons.length === 0 ? (
                  <div className="text-sm text-gray-500">No lessons yet.</div>
                ) : (
                  subjectLessons
                    .slice()
                    .sort((a, b) => a.week - b.week)
                    .map((l) => (
                      <div
                        key={l.id}
                        className="bg-white/70 rounded-chunky px-3 py-2 text-sm font-bold"
                        style={{ color: s.color }}
                      >
                        W{l.week} · {l.topic}
                      </div>
                    ))
                )}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

function CircleProgress({ pct, color }) {
  const r = 16
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  return (
    <svg width="42" height="42" viewBox="0 0 42 42">
      <circle cx="21" cy="21" r={r} fill="none" stroke="#fff" strokeWidth="4" />
      <circle
        cx="21"
        cy="21"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 21 21)"
      />
    </svg>
  )
}
