import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SUBJECTS, SUBJECT_KEYS } from '../data/subjects'
import { CURRICULUM } from '../data/curriculum'

const TARGET = 7

export default function MapTab({ lessons }) {
  const [open, setOpen] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {SUBJECT_KEYS.map((key) => {
        const s = SUBJECTS[key]
        const subjectLessons = lessons.filter((l) => l.subject === key)
        const done = subjectLessons.length
        const isOpen = open === key
        const pct = Math.min(100, (done / TARGET) * 100)

        const loggedKeys = new Set(subjectLessons.map((l) => `${l.subject}::${l.topic}`))
        const nextLesson = CURRICULUM.find(
          (c) => c.subject === key && !loggedKeys.has(`${c.subject}::${c.topic}`)
        )

        return (
          <div
            key={key}
            onClick={() => setOpen(isOpen ? null : key)}
            className="press-btn rounded-chunkier p-5 text-left cursor-pointer col-span-2 sm:col-span-1"
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
              <div className="mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                {subjectLessons.length === 0 ? (
                  <div className="text-sm text-gray-500">No lessons yet.</div>
                ) : (
                  subjectLessons
                    .slice()
                    .sort((a, b) => a.week - b.week)
                    .map((l) => (
                      <button
                        key={l.id}
                        onClick={() => navigate(`/lesson/${l.week}`)}
                        className="press-btn block w-full bg-white/80 rounded-chunky px-3 py-2 text-sm font-bold text-left"
                        style={{ color: s.color }}
                      >
                        W{l.week} · {l.topic} →
                      </button>
                    ))
                )}

                {nextLesson && (
                  <button
                    onClick={() => navigate(`/lesson/${nextLesson.week}`)}
                    className="press-btn block w-full mt-3 rounded-chunky px-3 py-3 font-display text-white text-center text-sm"
                    style={{ background: s.color, boxShadow: `0 4px 0 0 rgba(0,0,0,0.2)` }}
                  >
                    ▶ Start: W{nextLesson.week} · {nextLesson.topic}
                  </button>
                )}
              </div>
            )}
          </div>
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
