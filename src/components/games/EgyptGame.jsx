import { useState } from 'react'

const QUESTIONS = [
  {
    q: 'Siapa raja Mesir kuno yang dianggap seperti dewa?',
    choices: ['Firaun', 'Presiden', 'Pangeran'],
    answer: 'Firaun',
    emoji: '👑',
    fact: 'Firaun adalah pemimpin tertinggi Mesir kuno!',
  },
  {
    q: 'Untuk apa piramida dibangun?',
    choices: ['Rumah tinggal', 'Gudang makanan', 'Makam untuk Firaun'],
    answer: 'Makam untuk Firaun',
    emoji: '🔺',
    fact: 'Piramida Giza adalah salah satu keajaiban dunia kuno!',
  },
  {
    q: 'Apa itu hieroglif?',
    choices: ['Sistem tulisan pakai gambar', 'Makanan khas Mesir', 'Nama sungai di Mesir'],
    answer: 'Sistem tulisan pakai gambar',
    emoji: '📜',
    fact: 'Orang Mesir menulis dengan lebih dari 700 simbol berbeda!',
  },
  {
    q: 'Sungai apa yang memberi kehidupan bagi Mesir kuno?',
    choices: ['Amazon', 'Nil', 'Gangga'],
    answer: 'Nil',
    emoji: '🌊',
    fact: 'Sungai Nil adalah sungai terpanjang di dunia!',
  },
  {
    q: 'Apa nama mayat yang diawetkan oleh orang Mesir kuno?',
    choices: ['Mumi', 'Boneka', 'Patung'],
    answer: 'Mumi',
    emoji: '🪬',
    fact: 'Orang Mesir percaya tubuh harus dijaga untuk kehidupan setelah mati!',
  },
]

const SUBJECT_COLOR = '#854F0B'
const SUBJECT_BG = '#FFFAEC'

export default function EgyptGame() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [wrongShake, setWrongShake] = useState(false)
  const [answers, setAnswers] = useState([])

  const q = QUESTIONS[current]
  const isCorrect = selected === q.answer

  function handleSelect(choice) {
    if (confirmed) return
    setSelected(choice)
  }

  function handleConfirm() {
    if (!selected) return
    const correct = selected === q.answer
    if (correct) {
      setScore((s) => s + 1)
    } else {
      setWrongShake(true)
      setTimeout(() => setWrongShake(false), 600)
    }
    setConfirmed(true)
    setAnswers((a) => [...a, { question: q.q, chosen: selected, correct }])
  }

  function handleNext() {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setConfirmed(false)
    }
  }

  function handleReset() {
    setCurrent(0)
    setSelected(null)
    setConfirmed(false)
    setScore(0)
    setDone(false)
    setAnswers([])
    setWrongShake(false)
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="text-7xl animate-bounce-slow">
          {score === QUESTIONS.length ? '🏆' : score >= 3 ? '⭐' : '📖'}
        </div>
        <h3 className="font-display text-3xl" style={{ color: SUBJECT_COLOR }}>
          {score === QUESTIONS.length
            ? 'Sempurna, Olivia!'
            : score >= 3
            ? 'Bagus sekali!'
            : 'Terus belajar!'}
        </h3>
        <p className="font-bold text-gray-600 text-lg">
          Kamu benar {score} dari {QUESTIONS.length} pertanyaan
        </p>

        <div className="space-y-2 text-left mt-2">
          {answers.map((a, i) => (
            <div
              key={i}
              className="rounded-chunky px-4 py-3 flex items-start gap-3"
              style={{
                background: a.correct ? '#dcfce7' : '#fee2e2',
                border: `2px solid ${a.correct ? '#86efac' : '#fca5a5'}`,
              }}
            >
              <span className="text-xl flex-shrink-0">{a.correct ? '✅' : '❌'}</span>
              <div>
                <p className="text-sm font-bold text-gray-700">{a.question}</p>
                {!a.correct && (
                  <p className="text-xs text-red-500 font-semibold mt-0.5">
                    Kamu jawab: {a.chosen} · Benar: {QUESTIONS[i].answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="press-btn font-display text-xl text-white py-4 px-8 rounded-chunky mt-2"
          style={{ background: SUBJECT_COLOR, boxShadow: `0 5px 0 0 #5c3507` }}
        >
          Coba Lagi! 🔄
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Progress dots */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background:
                  i < current
                    ? '#22c55e'
                    : i === current
                    ? SUBJECT_COLOR
                    : '#e5e7eb',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <span className="font-display text-lg" style={{ color: SUBJECT_COLOR }}>
          {current + 1}/{QUESTIONS.length}
        </span>
      </div>

      {/* Question card */}
      <div
        className="rounded-chunkier p-6"
        style={{ background: SUBJECT_BG, border: `3px solid ${SUBJECT_COLOR}` }}
      >
        <div className="text-5xl text-center mb-4">{q.emoji}</div>
        <p className="font-display text-xl sm:text-2xl text-center leading-snug" style={{ color: SUBJECT_COLOR }}>
          {q.q}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {q.choices.map((choice) => {
          let bg = 'bg-white'
          let border = `2px solid ${SUBJECT_COLOR}44`
          let textColor = '#3a2a32'
          let extraClass = ''

          if (confirmed) {
            if (choice === q.answer) {
              bg = 'bg-green-50'
              border = '2px solid #86efac'
              textColor = '#15803d'
            } else if (choice === selected && !isCorrect) {
              bg = 'bg-red-50'
              border = '2px solid #fca5a5'
              textColor = '#dc2626'
              extraClass = wrongShake ? 'animate-shake' : ''
            }
          } else if (choice === selected) {
            bg = ''
            border = `3px solid ${SUBJECT_COLOR}`
            textColor = SUBJECT_COLOR
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={confirmed}
              className={`press-btn w-full rounded-chunky px-5 py-4 text-left font-bold text-base sm:text-lg flex items-center gap-3 transition ${bg} ${extraClass}`}
              style={{ border, color: textColor, boxShadow: confirmed ? 'none' : undefined }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-display flex-shrink-0"
                style={{
                  background: choice === selected ? SUBJECT_COLOR : '#f3f4f6',
                  color: choice === selected ? '#fff' : '#6b7280',
                }}
              >
                {['A', 'B', 'C'][q.choices.indexOf(choice)]}
              </span>
              {choice}
              {confirmed && choice === q.answer && (
                <span className="ml-auto text-green-500 text-xl">✓</span>
              )}
              {confirmed && choice === selected && !isCorrect && (
                <span className="ml-auto text-red-400 text-xl">✗</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Fact reveal on confirm */}
      {confirmed && (
        <div
          className="rounded-chunky px-4 py-3 flex gap-3 items-start"
          style={{
            background: isCorrect ? '#dcfce7' : '#fff7ed',
            border: `2px solid ${isCorrect ? '#86efac' : '#fdba74'}`,
          }}
        >
          <span className="text-2xl flex-shrink-0">{isCorrect ? '🌟' : '💡'}</span>
          <div>
            <p className="font-bold text-sm" style={{ color: isCorrect ? '#15803d' : '#c2410c' }}>
              {isCorrect ? 'Benar!' : `Jawabannya: ${q.answer}`}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">{q.fact}</p>
          </div>
        </div>
      )}

      {/* Confirm / Next button */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="press-btn w-full font-display text-xl text-white py-4 rounded-chunky transition"
          style={{
            background: selected ? SUBJECT_COLOR : '#d1d5db',
            boxShadow: selected ? `0 5px 0 0 #5c3507` : 'none',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          Cek Jawaban ✓
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="press-btn w-full font-display text-xl text-white py-4 rounded-chunky"
          style={{ background: SUBJECT_COLOR, boxShadow: `0 5px 0 0 #5c3507` }}
        >
          {current + 1 >= QUESTIONS.length ? 'Lihat Hasil 🏆' : 'Soal Berikutnya →'}
        </button>
      )}
    </div>
  )
}
