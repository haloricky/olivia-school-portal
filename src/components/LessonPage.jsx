import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CURRICULUM } from '../data/curriculum'
import { SUBJECTS } from '../data/subjects'
import { LESSON_CONTENT } from '../data/lessonContent'
import ContinentsGame from './games/ContinentsGame'
import EgyptGame from './games/EgyptGame'

export default function LessonPage() {
  const { week } = useParams()
  const navigate = useNavigate()
  const weekNum = Number(week)
  const [tab, setTab] = useState('story')

  const lesson = CURRICULUM.find((c) => c.week === weekNum)
  const content = LESSON_CONTENT[weekNum]
  const subject = lesson ? SUBJECTS[lesson.subject] : null

  if (!lesson) {
    return (
      <div className="min-h-screen bg-cream p-6 flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">😅</div>
        <p className="font-bold text-gray-600 mb-6">No lesson found for week {week}.</p>
        <button onClick={() => navigate('/olivia')} className="press-btn bg-primary text-white px-6 py-3 rounded-chunky font-bold">
          ← Back to map
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <Header lesson={lesson} subject={subject} onBack={() => navigate(-1)} />

        <div className="flex gap-2 mb-6 bg-white p-2 rounded-chunky overflow-x-auto">
          <TabBtn active={tab === 'story'} onClick={() => setTab('story')}>📖 Story</TabBtn>
          <TabBtn active={tab === 'learn'} onClick={() => setTab('learn')}>🔤 Learn</TabBtn>
          <TabBtn active={tab === 'play'} onClick={() => setTab('play')}>🎮 Play</TabBtn>
          <TabBtn active={tab === 'print'} onClick={() => setTab('print')}>🖨️ Print</TabBtn>
        </div>

        {!content ? (
          <ContentComingSoon subject={subject} />
        ) : (
          <>
            {tab === 'story' && <StoryTab content={content} subject={subject} />}
            {tab === 'learn' && <LearnTab content={content} subject={subject} />}
            {tab === 'play' && <PlayTab content={content} subject={subject} />}
            {tab === 'print' && <PrintTab content={content} lesson={lesson} subject={subject} />}
          </>
        )}
      </div>
    </div>
  )
}

function Header({ lesson, subject, onBack }) {
  return (
    <div className="mb-6">
      <button onClick={onBack} className="press-btn bg-white px-4 py-2 rounded-chunky text-primary-dark font-bold mb-4">
        ← Back
      </button>
      <div
        className="rounded-chunkier p-5"
        style={{
          background: subject.bg,
          border: `3px solid ${subject.color}`,
          boxShadow: `0 4px 0 0 ${subject.color}`,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{subject.emoji}</span>
          <div>
            <div className="text-xs font-bold opacity-70" style={{ color: subject.color }}>
              Week {lesson.week} · Month {lesson.month} · {subject.name}
            </div>
            <h2 className="font-display text-2xl leading-tight mt-1" style={{ color: subject.color }}>
              {lesson.topic}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-3 rounded-chunky font-bold transition text-sm whitespace-nowrap ${
        active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-primary-soft'
      }`}
    >
      {children}
    </button>
  )
}

function ContentComingSoon({ subject }) {
  return (
    <div className="bg-white rounded-chunkier p-8 text-center">
      <div className="text-6xl mb-3">🚧</div>
      <p className="font-display text-2xl mb-2" style={{ color: subject.color }}>
        Lesson content coming soon
      </p>
      <p className="text-gray-500">Papa is still preparing this week's story and games!</p>
    </div>
  )
}

function StoryTab({ content, subject }) {
  return (
    <div className="space-y-6">
      <div
        className="rounded-chunkier p-6"
        style={{ background: '#FFE5EE', border: '3px solid #FF85A1' }}
      >
        <div className="text-xs font-bold text-primary-dark uppercase tracking-wide mb-3">
          📖 Papa reads this out loud
        </div>
        <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-gray-700">
          "{content.story}"
        </p>
      </div>

      <div>
        <h3 className="font-display text-xl text-primary-dark mb-3">What we'll learn</h3>
        <ol className="space-y-2">
          {content.teaching.map((t, i) => (
            <li
              key={i}
              className="rounded-chunky p-4 flex gap-3 items-start"
              style={{ background: subject.bg, border: `2px solid ${subject.color}` }}
            >
              <span
                className="font-display text-lg shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: subject.color }}
              >
                {i + 1}
              </span>
              <span className="font-bold pt-1" style={{ color: subject.color }}>
                {t}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {content.activity && (
        <div className="bg-white rounded-chunkier p-5">
          <h3 className="font-display text-xl text-primary-dark mb-2">🎨 Today's activity</h3>
          <p className="text-gray-700 leading-relaxed">{content.activity}</p>
        </div>
      )}
    </div>
  )
}

function LearnTab({ content, subject }) {
  return (
    <div>
      <p className="text-center text-gray-500 mb-4 font-bold">Tap a card to flip it! 🔄</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {content.vocab.map((v, i) => (
          <FlipCard key={i} en={v.en} id={v.id} subject={subject} />
        ))}
      </div>
    </div>
  )
}

function FlipCard({ en, id, subject }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="flip-card press-btn rounded-chunkier h-32 sm:h-36 relative"
      style={{ perspective: '800px' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <div
          className="absolute inset-0 rounded-chunkier flex flex-col items-center justify-center p-3"
          style={{
            background: '#fff',
            border: `3px solid ${subject.color}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="text-xs font-bold uppercase opacity-50" style={{ color: subject.color }}>
            English
          </div>
          <div className="font-display text-2xl mt-1" style={{ color: subject.color }}>
            {en}
          </div>
        </div>
        <div
          className="absolute inset-0 rounded-chunkier flex flex-col items-center justify-center p-3"
          style={{
            background: subject.color,
            color: '#fff',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="text-xs font-bold uppercase opacity-80">Bahasa</div>
          <div className="font-display text-2xl mt-1 text-center leading-tight">{id}</div>
        </div>
      </div>
    </button>
  )
}

function PlayTab({ content, subject }) {
  if (content.game_type === 'continents') {
    return <ContinentsGame subject={subject} />
  }
  if (content.game_type === 'egypt') {
    return <EgyptGame />
  }
  return (
    <div className="bg-white rounded-chunkier p-8 text-center">
      <div className="text-6xl mb-3">🚀</div>
      <p className="font-display text-2xl mb-2" style={{ color: subject.color }}>
        Coming soon!
      </p>
      <p className="text-gray-500 font-bold">
        Game type: <span style={{ color: subject.color }}>{content.game_type}</span>
      </p>
      <p className="text-gray-500 mt-2 text-sm">A fun mini-game for this lesson is on the way.</p>
    </div>
  )
}

function PrintTab({ content, lesson, subject }) {
  if (!content.worksheet_url) {
    return (
      <div className="bg-white rounded-chunkier p-8 text-center">
        <div className="text-6xl mb-3">📄</div>
        <p className="font-bold text-gray-500">Worksheet coming soon for this lesson.</p>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-chunkier p-6 text-center space-y-4">
      <div className="text-6xl">📄</div>
      <h3 className="font-display text-2xl" style={{ color: subject.color }}>
        This week's worksheet
      </h3>
      <p className="text-gray-500">
        Month {lesson.month} · Week {lesson.week} · {subject.name}
      </p>
      <a
        href={content.worksheet_url}
        target="_blank"
        rel="noopener noreferrer"
        className="press-btn inline-block font-display text-xl text-white py-4 px-8 rounded-chunky"
        style={{ background: subject.color, boxShadow: `0 5px 0 0 ${subject.color}99` }}
      >
        🖨️ Download worksheet
      </a>
      <p className="text-xs text-gray-400 pt-2">Opens in a new tab — print on A4.</p>
    </div>
  )
}
