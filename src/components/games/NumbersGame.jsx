import { useState } from 'react'

const ITEMS = [
  { emoji: '⭐', name: 'stars' },
  { emoji: '🍎', name: 'apples' },
  { emoji: '🌸', name: 'flowers' },
  { emoji: '🐝', name: 'bees' },
  { emoji: '🦋', name: 'butterflies' },
  { emoji: '🍪', name: 'cookies' },
  { emoji: '🐸', name: 'frogs' },
  { emoji: '🌈', name: 'rainbows' },
]

function generateRound() {
  const count = Math.floor(Math.random() * 9) + 2
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  return { count, item }
}

export default function NumbersGame() {
  const [round, setRound] = useState(() => generateRound())
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [shake, setShake] = useState(false)

  const handleAnswer = (n) => {
    if (result) return
    setSelected(n)
    if (n === round.count) {
      setResult('correct')
      setScore(s => s + 1)
      setTotal(t => t + 1)
    } else {
      setResult('wrong')
      setTotal(t => t + 1)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const nextRound = () => { setRound(generateRound()); setSelected(null); setResult(null) }
  const reset = () => { setScore(0); setTotal(0); nextRound() }

  return (
    <div className="flex flex-col gap-4 items-center font-display">
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        .shake { animation: shake 0.4s ease; }
        @keyframes pop-in { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        .pop-in { animation: pop-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: '#4a90d9' }}>Count &amp; Tap!</h3>
        <div className="flex items-center gap-3 justify-center">
          <span className="text-xs font-bold text-gray-400">Score:</span>
          <span className="text-sm font-extrabold" style={{ color: '#4a90d9' }}>{score} / {total}</span>
        </div>
      </div>

      <div className="rounded-2xl px-5 py-3 text-center" style={{ backgroundColor: '#EBF5FF', border: '2px solid #87CEEB' }}>
        <p className="font-extrabold text-gray-700 text-base">
          How many <span className="text-2xl">{round.item.emoji}</span> {round.item.name} can you count?
        </p>
      </div>

      <div className={`relative w-full rounded-2xl p-4 flex flex-wrap justify-center gap-2 ${shake ? 'shake' : ''}`}
        style={{ minHeight: 120, backgroundColor: result === 'correct' ? '#f0fff4' : result === 'wrong' ? '#fff0f0' : '#fafafa', border: '2px dashed #e5e7eb', transition: 'background 0.3s' }}>
        {result === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-5xl pop-in">🎉</span>
          </div>
        )}
        {Array.from({ length: round.count }).map((_, i) => (
          <span key={i} className="text-3xl select-none" style={{ lineHeight: 1.2 }}>{round.item.emoji}</span>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2 w-full">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
          <button key={n} onClick={() => handleAnswer(n)} disabled={!!result}
            className="rounded-2xl font-extrabold text-lg transition-all active:translate-y-0.5 disabled:cursor-not-allowed"
            style={{ paddingTop: 10, paddingBottom: 10,
              backgroundColor: selected === n && result === 'correct' ? '#90EE90' : selected === n && result === 'wrong' ? '#FFB3B3' : n === round.count && result === 'wrong' ? '#90EE90' : '#fff',
              border: selected === n ? '2.5px solid #4a90d9' : '2px solid #e5e7eb',
              color: selected === n ? '#4a90d9' : '#555',
              boxShadow: result ? 'none' : '0 2px 0 #d0d0d0' }}>
            {n}
          </button>
        ))}
      </div>

      {result === 'correct' && (
        <div className="rounded-2xl px-5 py-3 text-center pop-in" style={{ backgroundColor: '#d4edda', border: '2px solid #90EE90' }}>
          <p className="font-extrabold text-green-700 text-base">✅ Yes! There are {round.count} {round.item.name}! Amazing counting, Olivia!</p>
        </div>
      )}
      {result === 'wrong' && (
        <div className="rounded-2xl px-5 py-3 text-center" style={{ backgroundColor: '#fff0f0', border: '2px solid #FFB3B3' }}>
          <p className="font-extrabold text-red-600 text-base">Almost! Try counting again — the answer is {round.count}! 🌟</p>
        </div>
      )}

      <div className="flex gap-3">
        {result && (
          <button onClick={nextRound} className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-white transition-all active:translate-y-0.5"
            style={{ backgroundColor: '#4a90d9', boxShadow: '0 3px 0 #2a6aaa' }}>
            Next Round →
          </button>
        )}
        {total > 0 && (
          <button onClick={reset} className="flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold transition-all active:translate-y-0.5"
            style={{ backgroundColor: '#f3f4f6', color: '#666', boxShadow: '0 3px 0 #d0d0d0' }}>
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
