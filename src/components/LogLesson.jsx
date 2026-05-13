import { useMemo, useState } from 'react'
import { CURRICULUM } from '../data/curriculum'
import { SUBJECTS } from '../data/subjects'
import { supabase } from '../lib/supabase'

const MOODS = ['😴', '😐', '🙂', '😊', '🤩']

export default function LogLesson({ lessons, onSaved }) {
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [week, setWeek] = useState(null)
  const [month, setMonth] = useState(null)
  const [notes, setNotes] = useState('')
  const [mood, setMood] = useState('')
  const [stars, setStars] = useState(1)
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState('')

  const loggedKeySet = useMemo(() => {
    return new Set(lessons.map((l) => `${l.subject}::${l.topic}`))
  }, [lessons])

  function handleSubjectChange(key) {
    setSubject(key)
    const next = CURRICULUM.find(
      (c) => c.subject === key && !loggedKeySet.has(`${c.subject}::${c.topic}`)
    )
    if (next) {
      setTopic(next.topic)
      setWeek(next.week)
      setMonth(next.month)
    } else {
      setTopic('')
      setWeek(null)
      setMonth(null)
    }
  }

  async function submit(e) {
    e.preventDefault()
    if (!subject || !topic) return
    setSaving(true)
    const { error } = await supabase.from('lessons').insert({
      subject,
      topic,
      week: week ?? 0,
      month: month ?? 0,
      notes: notes || null,
      mood: mood || null,
      stars,
    })
    setSaving(false)
    if (error) {
      alert('Could not save: ' + error.message)
      return
    }
    setFlash('Saved! 🎉')
    setSubject('')
    setTopic('')
    setWeek(null)
    setMonth(null)
    setNotes('')
    setMood('')
    setStars(1)
    setTimeout(() => setFlash(''), 2500)
    onSaved?.()
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-chunkier p-6 space-y-5">
      <div>
        <label className="block font-bold mb-2 text-gray-700">Subject</label>
        <select
          value={subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
          className="w-full p-3 rounded-chunky border-2 border-primary-soft bg-cream font-bold text-gray-700"
          required
        >
          <option value="">Pick a subject…</option>
          {Object.entries(SUBJECTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.emoji} {s.name}
            </option>
          ))}
        </select>
      </div>

      {subject && (
        <div>
          <label className="block font-bold mb-2 text-gray-700">
            Topic {week ? <span className="text-gray-400 text-sm">(week {week})</span> : null}
          </label>
          {topic ? (
            <div
              className="p-3 rounded-chunky font-bold"
              style={{ background: SUBJECTS[subject].bg, color: SUBJECTS[subject].color }}
            >
              {topic}
            </div>
          ) : (
            <div className="p-3 rounded-chunky bg-primary-soft text-primary-dark">
              All topics for this subject are logged! 🎉
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block font-bold mb-2 text-gray-700">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-chunky border-2 border-primary-soft bg-cream"
          placeholder="How did she do?"
        />
      </div>

      <div>
        <label className="block font-bold mb-2 text-gray-700">Mood</label>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`press-btn text-3xl p-3 rounded-chunky flex-1 ${
                mood === m ? 'bg-primary text-white' : 'bg-primary-soft'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-bold mb-2 text-gray-700">Stars</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStars(n)}
              className={`press-btn text-2xl py-3 rounded-chunky flex-1 font-display ${
                stars >= n ? 'bg-yellow-300' : 'bg-gray-100'
              }`}
            >
              {'⭐'.repeat(n)}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving || !topic}
        className="press-btn w-full bg-primary text-white font-display text-2xl py-4 rounded-chunky disabled:opacity-50"
        style={{ boxShadow: '0 5px 0 0 #B84A6A' }}
      >
        {saving ? 'Saving…' : 'Log Lesson 🎉'}
      </button>

      {flash && (
        <div className="text-center text-green-600 font-bold">{flash}</div>
      )}
    </form>
  )
}
