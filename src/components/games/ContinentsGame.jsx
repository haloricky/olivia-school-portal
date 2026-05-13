import { useState, useRef, useCallback, useMemo } from 'react'

const CONTINENTS = [
  { name: 'Asia',           color: '#FF85A1', emoji: '🗾', fact: 'Benua terbesar di dunia!' },
  { name: 'Afrika',         color: '#FFB347', emoji: '🌍', fact: 'Rumah singa dan gajah!' },
  { name: 'Eropa',          color: '#87CEEB', emoji: '🏰', fact: 'Banyak istana dan sejarah!' },
  { name: 'Amerika Utara',  color: '#90EE90', emoji: '🦅', fact: 'Rumah elang botak!' },
  { name: 'Amerika Selatan',color: '#DDA0DD', emoji: '🦜', fact: 'Hutan Amazon ada di sini!' },
  { name: 'Australia',      color: '#F4A460', emoji: '🦘', fact: 'Rumah kanguru!' },
  { name: 'Antartika',      color: '#7DD3FC', emoji: '🐧', fact: 'Tempat paling dingin di bumi!' },
]

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#FF85A1','#FFD700','#87CEEB','#90EE90','#DDA0DD','#FFB347'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 8,
      duration: 1.5 + Math.random() * 2,
      delay: Math.random() * 0.5,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-fall"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ContinentsGame() {
  const [placed, setPlaced] = useState({})
  const [dropStates, setDropStates] = useState({})
  const [shakingLabel, setShakingLabel] = useState(null)
  const [won, setWon] = useState(false)
  const draggedRef = useRef(null)

  const correctCount = Object.entries(placed).filter(([box, label]) => box === label).length

  const handleDragStart = useCallback((name) => {
    draggedRef.current = name
  }, [])

  const handleDrop = useCallback((targetName) => {
    const dragged = draggedRef.current
    if (!dragged) return

    if (dragged === targetName) {
      setPlaced((prev) => {
        const next = { ...prev, [targetName]: dragged }
        const newCorrect = Object.keys(next).filter((k) => next[k] === k).length
        if (newCorrect === CONTINENTS.length) {
          setTimeout(() => setWon(true), 400)
        }
        return next
      })
      setDropStates((prev) => ({ ...prev, [targetName]: 'correct' }))
    } else {
      setDropStates((prev) => ({ ...prev, [targetName]: 'wrong' }))
      setShakingLabel(dragged)
      setTimeout(() => {
        setDropStates((prev) => ({ ...prev, [targetName]: 'idle' }))
        setShakingLabel(null)
      }, 600)
    }
    draggedRef.current = null
  }, [])

  const correctlyPlaced = new Set(
    Object.entries(placed).filter(([box, label]) => box === label).map(([, label]) => label)
  )
  const availableLabels = CONTINENTS.filter((c) => !correctlyPlaced.has(c.name))

  function handleReset() {
    setPlaced({})
    setDropStates({})
    setShakingLabel(null)
    setWon(false)
  }

  if (won) {
    return (
      <>
        <Confetti />
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-5 text-center p-4 relative z-10">
          <div className="text-7xl animate-bounce-slow">🎉</div>
          <h2 className="font-display text-3xl text-primary">Amazing, Olivia!</h2>
          <p className="text-gray-600 font-bold">Kamu tahu semua 7 benua! Luar biasa!</p>
          <div className="grid grid-cols-2 gap-2 mt-1 w-full max-w-sm">
            {CONTINENTS.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 rounded-chunky px-3 py-2 font-bold text-sm text-left"
                style={{ backgroundColor: c.color + '33' }}
              >
                <span className="text-lg">{c.emoji}</span>
                <div>
                  <div className="font-display text-sm leading-tight">{c.name}</div>
                  <div className="text-xs font-normal text-gray-600">{c.fact}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="press-btn mt-2 px-8 py-3 rounded-chunky font-display text-white text-lg"
            style={{ background: '#FF85A1', boxShadow: '0 4px 0 #cc5a74' }}
          >
            Main Lagi! 🔄
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="text-center">
        <h3 className="font-display text-xl text-primary mb-0.5">Drag & Drop Benua!</h3>
        <p className="text-sm text-gray-500 font-bold">Seret nama benua ke kotak yang benar</p>
        <div className="flex justify-center gap-1 mt-2">
          {CONTINENTS.map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                backgroundColor: i < correctCount ? '#4ade80' : '#e5e7eb',
                color: i < correctCount ? 'white' : '#9ca3af',
              }}
            >
              {i < correctCount ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-display text-gray-400 text-center uppercase">Nama Benua</p>
          {availableLabels.map((c) => (
            <div
              key={c.name}
              draggable
              onDragStart={() => handleDragStart(c.name)}
              className={`cursor-grab active:cursor-grabbing select-none rounded-chunky px-3 py-2.5 font-bold text-center text-sm border-2 transition-all ${
                shakingLabel === c.name ? 'animate-shake' : ''
              }`}
              style={{
                backgroundColor: c.color + '22',
                borderColor: c.color,
                color: '#333',
              }}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.name}
            </div>
          ))}
          {availableLabels.length === 0 && (
            <p className="text-center text-gray-400 py-4 text-sm font-bold">Semua sudah ditempatkan!</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-display text-gray-400 text-center uppercase">Target Kotak</p>
          {CONTINENTS.map((c) => {
            const isCorrect = placed[c.name] === c.name
            const state = dropStates[c.name] ?? 'idle'
            return (
              <div
                key={c.name}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(c.name)}
                className={`rounded-chunky px-3 py-2.5 border-2 border-dashed text-center font-bold text-sm min-h-[48px] flex items-center justify-center transition-all ${
                  isCorrect
                    ? 'border-green-400 bg-green-50'
                    : state === 'wrong'
                    ? 'border-red-400 bg-red-50 animate-shake'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {isCorrect ? (
                  <span className="flex items-center gap-1.5 text-green-600 font-display">
                    <span>{c.emoji}</span> {c.name} <span>✓</span>
                  </span>
                ) : state === 'wrong' ? (
                  <span className="text-red-400 font-bold text-xs">Coba lagi! ✗</span>
                ) : (
                  <span className="text-gray-400 text-xs font-bold">
                    Taruh{' '}
                    <span className="font-display" style={{ color: c.color }}>
                      {c.name}
                    </span>{' '}
                    di sini
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleReset}
        className="press-btn bg-white text-gray-500 font-bold px-4 py-2 rounded-chunky text-sm self-start"
      >
        🔄 Reset
      </button>
    </div>
  )
}
