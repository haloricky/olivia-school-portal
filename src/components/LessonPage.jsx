import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LESSON_CONTENT } from '../data/lessonContent'
import { CURRICULUM } from '../data/curriculum'
import { SUBJECT_BY_KEY } from '../data/subjects'
import WorldMapGame from './games/WorldMapGame'
import WorldMapDisplay from './WorldMapDisplay'
import EgyptStory from './games/EgyptStory'
import BodyStory from './games/BodyStory'

function FlipCard({ en, id, index }) {
  const [flipped, setFlipped] = useState(false)
  const colors = [
    { bg: '#FF85A1', dark: '#cc5a74' },
    { bg: '#FFB347', dark: '#cc8a2e' },
    { bg: '#87CEEB', dark: '#5aa0bd' },
    { bg: '#90EE90', dark: '#5ab85a' },
    { bg: '#DDA0DD', dark: '#aa6eaa' },
    { bg: '#F4A460', dark: '#c27830' },
  ]
  const c = colors[index % colors.length]

  return (
    <div className="cursor-pointer select-none" style={{ perspective: '600px', height: '120px' }}
      onClick={() => setFlipped(f => !f)}>
      <div className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
          style={{ backfaceVisibility: 'hidden', backgroundColor: c.bg, boxShadow: `0 4px 0 ${c.dark}` }}>
          <span className="text-2xl font-extrabold text-white drop-shadow font-display">{en}</span>
          <span className="text-xs text-white/80 font-semibold font-display">tap to flip</span>
        </div>
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: '#fff',
            border: `3px solid ${c.bg}`, boxShadow: `0 4px 0 ${c.dark}` }}>
          <span className="text-xs font-bold uppercase tracking-wider font-display" style={{ color: c.bg }}>Bahasa Indonesia</span>
          <span className="text-2xl font-extrabold text-gray-800 font-display">{id}</span>
        </div>
      </div>
    </div>
  )
}

function ComingSoonGame({ gameType }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="text-6xl">🎮</div>
      <h3 className="text-xl font-extrabold text-gray-700 font-display">Game Coming Soon!</h3>
      <p className="text-gray-500 text-sm font-display">
        The <span className="font-bold text-primary">"{gameType}"</span> game is being built.
        <br />Stay tuned, Olivia!
      </p>
      <div className="text-4xl animate-bounce">🚀</div>
    </div>
  )
}

export default function LessonPage() {
  const { week: weekStr } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('story')

  const week = parseInt(weekStr ?? '1', 10)
  const content = LESSON_CONTENT[week]
  const lesson = CURRICULUM.find(l => l.week === week)
  const subject = lesson ? SUBJECT_BY_KEY[lesson.subjectKey] : null

  if (!content || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-display">
        <div className="text-6xl">📚</div>
        <h2 className="text-2xl font-extrabold text-primary">Lesson not found!</h2>
        <button onClick={() => navigate('/')} className="press-btn px-6 py-3 rounded-chunky font-display font-bold text-white bg-primary">
          Back to Home
        </button>
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
    <div className="min-h-screen bg-cream font-display">
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: subject?.bg ?? '#FFF5F8' }}>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-bold mb-4 rounded-xl px-3 py-1.5 transition-all active:scale-95"
          style={{ color: subject?.color ?? '#FF85A1', backgroundColor: 'rgba(255,255,255,0.6)' }}>
          ← Back
        </button>
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: (subject?.color ?? '#FF85A1') + '22' }}>
            {subject?.emoji ?? '📚'}
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest mb-0.5" style={{ color: subject?.color ?? '#FF85A1' }}>
              Week {week} · {subject?.name ?? 'Lesson'}
            </div>
            <h1 className="text-xl font-extrabold text-gray-800 leading-tight">{lesson.topic}</h1>
          </div>
        </div>
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-sm whitespace-nowrap transition-all active:translate-y-0.5 flex-shrink-0 ${
                activeTab === tab.key ? 'text-white shadow-md' : 'text-gray-500 bg-white/70 hover:bg-white'
              }`}
              style={activeTab === tab.key ? { backgroundColor: subject?.color ?? '#FF85A1', boxShadow: `0 3px 0 ${subject?.color ?? '#FF85A1'}99` } : {}}>
              <span>{tab.emoji}</span><span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 max-w-2xl mx-auto">
        {activeTab === 'story' && (
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl p-5 bg-white shadow-sm border border-pink-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <span className="text-sm font-extrabold text-primary uppercase tracking-wider">Opening Story</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-semibold italic">"{content.story}"</p>
            </div>
            {content.game_type === 'continents' && (
              <div className="rounded-3xl p-4 bg-white shadow-sm border border-blue-100">
                <WorldMapDisplay />
              </div>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl">💡</span>
              <h3 className="font-extrabold text-gray-700 text-base">What We Learn</h3>
            </div>
            <div className="flex flex-col gap-3">
              {content.teaching.map((point, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl px-4 py-3 bg-white shadow-sm border border-pink-50">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: subject?.color ?? '#FF85A1' }}>{i + 1}</div>
                  <p className="text-gray-700 font-semibold text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl p-5 mt-2 border-2" style={{ backgroundColor: '#FFF9E6', borderColor: '#FFD700' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✏️</span>
                <span className="text-sm font-extrabold text-yellow-600 uppercase tracking-wider">Today's Activity</span>
              </div>
              <p className="text-gray-700 font-semibold text-sm leading-relaxed">{content.activity}</p>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="flex flex-col gap-4">
            <div className="text-center mb-2">
              <h3 className="text-lg font-extrabold text-gray-700">Vocabulary Flip Cards</h3>
              <p className="text-sm text-gray-400 font-semibold">Tap each card to see it in Bahasa Indonesia!</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {content.vocab.map((v, i) => <FlipCard key={v.en} en={v.en} id={v.id} index={i} />)}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 font-semibold">{content.vocab.length} new words this week</p>
          </div>
        )}

        {activeTab === 'play' && (
          <div className="rounded-3xl bg-white shadow-sm border border-pink-100 p-4">
            {content.game_type === 'continents' ? <WorldMapGame />
              : content.game_type === 'egypt' ? <EgyptStory />
              : content.game_type === 'body' ? <BodyStory />
              : <ComingSoonGame gameType={content.game_type} />}
          </div>
        )}

        {activeTab === 'print' && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="w-24 h-24 rounded-3xl bg-pink-50 flex items-center justify-center text-5xl">🖨️</div>
            <div className="text-center">
              <h3 className="text-xl font-extrabold text-gray-700 mb-2">Worksheet — Week {week}</h3>
              <p className="text-gray-500 text-sm font-semibold mb-1">{lesson.topic}</p>
              <p className="text-gray-400 text-xs">Month {lesson.month} worksheet PDF</p>
            </div>
            <a href={content.worksheet_url} target="_blank" rel="noopener noreferrer"
              className="press-btn flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-white text-lg"
              style={{ backgroundColor: '#FF85A1', boxShadow: '0 4px 0 #cc5a74' }}>
              <span>📥</span> Download Worksheet
            </a>
            <div className="rounded-2xl bg-pink-50 border border-pink-100 px-5 py-4 max-w-xs text-center">
              <p className="text-xs text-primary font-bold mb-1">TODAY'S ACTIVITY</p>
              <p className="text-gray-600 text-sm font-semibold">{content.activity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
