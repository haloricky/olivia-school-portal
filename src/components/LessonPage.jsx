import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LESSON_CONTENT } from '../data/lessonContent'
import { CURRICULUM } from '../data/curriculum'
import { SUBJECTS } from '../data/subjects'
import WorldMapGame from './games/WorldMapGame'
import WorldMapDisplay from './WorldMapDisplay'
import EgyptStory from './games/EgyptStory'

const FLIP_COLORS = [
  { bg: '#FF85A1', dark: '#cc5a74' },
  { bg: '#FFB347', dark: '#cc8a2e' },
  { bg: '#87CEEB', dark: '#5aa0bd' },
  { bg: '#90EE90', dark: '#5ab85a' },
  { bg: '#DDA0DD', dark: '#aa6eaa' },
  { bg: '#F4A460', dark: '#c27830' },
]

function FlipCard({ en, id, index }) {
  const [flipped, setFlipped] = useState(false)
  const c = FLIP_COLORS[index % FLIP_COLORS.length]
  return (
    <div className="cursor-pointer select-none" style={{ perspective: '600px', height: '120px' }} onClick={() => setFlipped(f => !f)}>
      <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="absolute inset-0 rounded-chunkier flex flex-col items-center justify-center gap-1" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: c.bg, boxShadow: `0 4px 0 ${c.dark}` }}>
          <span className="font-display text-2xl text-white">{en}</span>
          <span className="text-xs text-white opacity-80 font-bold">tap to flip</span>
        </div>
        <div className="absolute inset-0 rounded-chunkier flex flex-col items-center justify-center gap-1" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: '#fff', border: `3px solid ${c.bg}`, boxShadow: `0 4px 0 ${c.dark}` }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.bg }}>Bahasa Indonesia</span>
          <span className="font-display text-2xl text-gray-800">{id}</span>
        </div>
      </div>
    </div>
  )
}

function ComingSoonGame({ gameType }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="text-6xl">🎮</div>
      <h3 className="font-display text-2xl text-gray-700">Game Coming Soon!</h3>
      <p className="text-gray-500 font-bold">The <span className="text-primary">"{gameType}"</span> game is being built.<br />Stay tuned, Olivia!</p>
      <div className="text-4xl animate-bounce-slow">🚀</div>
    </div>
  )
}

export default function LessonPage() {
  const { week } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('story')

  const weekNum = Number(week)
  const content = LESSON_CONTENT[weekNum]
  const lesson = CURRICULUM.find(l => l.week === weekNum)
  const subject = lesson ? SUBJECTS[lesson.subject] : null

  if (!lesson || !subject) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">📚</div>
        <h2 className="font-display text-2xl text-primary">Lesson not found!</h2>
        <button onClick={() => navigate('/')} className="press-btn bg-primary text-white px-6 py-3 rounded-chunky font-bold">Back to Home</button>
      </div>
    )
  }

  const tabs = [
    { key: 'story', label: 'Story', emoji: '📖' },
    { key: 'learn', label: 'Learn', emoji: '🃏' },
    { key: 'play',  label: 'Play',  emoji: '🎮' },
    { key: 'print', label: 'Print', emoji: '🖨️' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF5F8' }}>
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: subject.bg }}>
        <button onClick={() => navigate(-1)} className="press-btn flex items-center gap-1 text-sm font-bold mb-4 rounded-chunky px-3 py-1.5" style={{ color: subject.color, backgroundColor: 'rgba(255,255,255,0.6)' }}>
          ← Back
        </button>
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-chunky flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: subject.color + '22' }}>
            {subject.emoji}
          </div>
          <div>
            <div className="text-xs font-display uppercase tracking-widest mb-0.5" style={{ color: subject.color }}>
              Week {weekNum} · {subject.name}
            </div>
            <h1 className="font-display text-2xl text-gray-800 leading-tight">{lesson.topic}</h1>
          </div>
        </div>
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`press-btn flex items-center gap-1.5 px-4 py-2.5 rounded-chunky font-display text-sm whitespace-nowrap flex-shrink-0 ${activeTab === tab.key ? 'text-white' : 'text-gray-500 bg-white/70'}`}
              style={activeTab === tab.key ? { backgroundColor: subject.color, boxShadow: `0 3px 0 ${subject.color}99` } : {}}
            >
              <span>{tab.emoji}</span><span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 max-w-2xl mx-auto">

        {activeTab === 'story' && (
          <div className="flex flex-col gap-4">
            <div className="rounded-chunkier p-5 bg-white border border-pink-100" style={{ boxShadow: '0 2px 0 #ffd6e7' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-display uppercase tracking-wider" style={{ color: subject.color }}>Opening Story</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-bold italic">"{content.story}"</p>
            </div>

            {content.game_type === 'continents' && (
              <div className="rounded-chunkier p-4 bg-white border border-blue-100" style={{ boxShadow: '0 2px 0 #bfdbfe' }}>
                <WorldMapDisplay />
              </div>
            )}

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl">💡</span>
              <h3 className="font-display text-lg text-gray-700">What We Learn</h3>
            </div>
            <div className="flex flex-col gap-3">
              {content.teaching.map((point, i) => (
                <div key={i} className="flex items-start gap-3 rounded-chunky px-4 py-3 bg-white border border-pink-50" style={{ boxShadow: '0 2px 0 #ffd6e7' }}>
                  <div className="w-7 h-7 rounded-chunky flex items-center justify-center text-white text-sm font-display flex-shrink-0 mt-0.5" style={{ backgroundColor: subject.color }}>{i + 1}</div>
                  <p className="text-gray-700 font-bold text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div className="rounded-chunkier p-5 mt-2 border-2" style={{ backgroundColor: '#FFF9E6', borderColor: '#FFD700' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✏️</span>
                <span className="text-xs font-display text-yellow-600 uppercase tracking-wider">Today's Activity</span>
              </div>
              <p className="text-gray-700 font-bold text-sm leading-relaxed">{content.activity}</p>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="flex flex-col gap-4">
            <div className="text-center mb-2">
              <h3 className="font-display text-xl text-gray-700">Vocabulary Flip Cards</h3>
              <p className="text-sm text-gray-400 font-bold">Tap each card to see it in Bahasa Indonesia!</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {content.vocab.map((v, i) => <FlipCard key={v.en} en={v.en} id={v.id} index={i} />)}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 font-bold">{content.vocab.length} new words this week</p>
          </div>
        )}

        {activeTab === 'play' && (
          <div className="rounded-chunkier bg-white border border-pink-100 p-4" style={{ boxShadow: '0 2px 0 #ffd6e7' }}>
            {content.game_type === 'continents' ? <WorldMapGame /> :
             content.game_type === 'egypt'      ? <EgyptStory /> :
             <ComingSoonGame gameType={content.game_type} />}
          </div>
        )}

        {activeTab === 'print' && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="w-24 h-24 rounded-chunkier bg-pink-50 flex items-center justify-center text-5xl">🖨️</div>
            <div className="text-center">
              <h3 className="font-display text-2xl text-gray-700 mb-1">Worksheet — Week {weekNum}</h3>
              <p className="text-gray-500 font-bold text-sm mb-0.5">{lesson.topic}</p>
              <p className="text-gray-400 text-xs">Month {lesson.month} worksheet PDF</p>
            </div>
            <a href={content.worksheet_url} target="_blank" rel="noopener noreferrer" className="press-btn flex items-center gap-3 px-8 py-4 rounded-chunkier font-display text-white text-xl" style={{ backgroundColor: '#FF85A1', boxShadow: '0 4px 0 #cc5a74' }}>
              <span>📥</span> Download Worksheet
            </a>
            <div className="rounded-chunkier bg-pink-50 border border-pink-100 px-5 py-4 max-w-xs text-center">
              <p className="text-xs font-display mb-1" style={{ color: '#FF85A1' }}>TODAY'S ACTIVITY</p>
              <p className="text-gray-600 text-sm font-bold">{content.activity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
