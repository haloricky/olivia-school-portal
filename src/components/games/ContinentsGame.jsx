import { useMemo, useState } from 'react'

const CONTINENTS = [
  { key: 'asia',     name: 'Asia',          color: '#8B5CF6' },
  { key: 'africa',   name: 'Afrika',        color: '#F59E0B' },
  { key: 'namerica', name: 'Amerika Utara', color: '#F97316' },
  { key: 'samerica', name: 'Amerika Selatan', color: '#22C55E' },
  { key: 'europe',   name: 'Eropa',         color: '#EC4899' },
  { key: 'australia',name: 'Australia',     color: '#FB7185' },
  { key: 'antarctica', name: 'Antartika',   color: '#7DD3FC' },
]

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ContinentsGame() {
  const initialLabels = useMemo(() => shuffle(CONTINENTS), [])
  const [labels] = useState(initialLabels)
  const [matched, setMatched] = useState({}) // { continentKey: labelKey }
  const [selected, setSelected] = useState(null) // labelKey
  const [wrong, setWrong] = useState(null) // continentKey that just got a wrong drop
  const [resetKey, setResetKey] = useState(0)

  const matchedLabels = new Set(Object.values(matched))
  const score = Object.keys(matched).length
  const done = score === CONTINENTS.length

  function attempt(continentKey, labelKey) {
    if (!labelKey) return
    if (matched[continentKey]) return
    if (matchedLabels.has(labelKey)) return
    if (continentKey === labelKey) {
      setMatched((m) => ({ ...m, [continentKey]: labelKey }))
      setSelected(null)
    } else {
      setWrong(continentKey)
      setTimeout(() => setWrong(null), 500)
      setSelected(null)
    }
  }

  function reset() {
    setMatched({})
    setSelected(null)
    setWrong(null)
    setResetKey((k) => k + 1)
  }

  if (done) {
    return <Celebration onPlayAgain={reset} />
  }

  return (
    <div key={resetKey}>
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-gray-600 text-sm sm:text-base">
          Tap a label, then tap its continent. Or drag!
        </p>
        <div className="font-display text-xl text-primary">{score}/7</div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase text-gray-400 mb-1">Labels</div>
          {labels.map((c) => {
            const used = matchedLabels.has(c.key)
            const isSelected = selected === c.key
            return (
              <button
                key={c.key}
                disabled={used}
                draggable={!used}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', c.key)
                  setSelected(c.key)
                }}
                onClick={() => {
                  if (used) return
                  setSelected((s) => (s === c.key ? null : c.key))
                }}
                className={`press-btn w-full py-3 px-3 rounded-chunky font-bold text-sm sm:text-base text-left transition ${
                  used ? 'bg-gray-100 text-gray-300 opacity-40 cursor-not-allowed' : 'bg-white'
                } ${isSelected ? 'ring-4 ring-primary' : ''}`}
              >
                {used ? '✓ ' : '🏷️ '}
                {c.name}
              </button>
            )
          })}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase text-gray-400 mb-1">Continents</div>
          {CONTINENTS.map((c) => {
            const isMatched = !!matched[c.key]
            const isWrong = wrong === c.key
            return (
              <div
                key={c.key}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  const labelKey = e.dataTransfer.getData('text/plain')
                  attempt(c.key, labelKey)
                }}
                onClick={() => attempt(c.key, selected)}
                className={`rounded-chunky py-4 px-3 font-display text-base text-white text-center cursor-pointer transition ${
                  isWrong ? 'animate-shake' : ''
                }`}
                style={{
                  background: isMatched ? '#22C55E' : c.color,
                  boxShadow: `0 4px 0 0 rgba(0,0,0,0.2)`,
                  opacity: isMatched ? 0.9 : 1,
                }}
              >
                {isMatched ? `✓ ${c.name}` : '?'}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={reset}
        className="press-btn mt-6 bg-white text-gray-600 font-bold px-4 py-2 rounded-chunky text-sm"
      >
        🔄 Reset
      </button>
    </div>
  )
}

function Celebration({ onPlayAgain }) {
  return (
    <div className="relative bg-white rounded-chunkier p-8 text-center overflow-hidden">
      <ConfettiRain />
      <div className="relative z-10">
        <div className="text-8xl mb-4 animate-bounce-slow">🎉</div>
        <h3 className="font-display text-3xl text-primary mb-2">You got all 7 continents!</h3>
        <p className="text-gray-500 mb-6">You're a geography champion, Olivia ⭐</p>
        <button
          onClick={onPlayAgain}
          className="press-btn bg-primary text-white font-display text-xl py-3 px-6 rounded-chunky"
          style={{ boxShadow: '0 5px 0 0 #B84A6A' }}
        >
          Play again 🔄
        </button>
      </div>
    </div>
  )
}

function ConfettiRain() {
  const pieces = useMemo(() => {
    const emojis = ['🎉', '⭐', '🌟', '💖', '🎊', '🌈']
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl confetti-fall"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
