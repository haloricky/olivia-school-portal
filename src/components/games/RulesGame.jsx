import { useState } from 'react'

const SCENARIOS = [
  { id: 1, text: "Zara waits patiently in line for her turn at the slide.", answer: "good", emoji: "🛝", explanation: "Waiting your turn is a great rule! When everyone waits, everyone gets a fair chance to play." },
  { id: 2, text: "Budi throws his empty juice box on the street.", answer: "broken", emoji: "🧃", explanation: "We should always put rubbish in the bin! Littering makes our streets dirty and can hurt animals." },
  { id: 3, text: "Olivia brushes her teeth before going to bed.", answer: "good", emoji: "🦷", explanation: "Brushing before bed protects your teeth from cavities while you sleep. Strong teeth help you eat and smile!" },
  { id: 4, text: "A car drives straight through a red traffic light.", answer: "broken", emoji: "🚦", explanation: "Red means STOP — always! Traffic rules keep drivers, cyclists, and pedestrians safe every day." },
  { id: 5, text: "Everyone shares their crayons at art class so all friends can colour.", answer: "good", emoji: "🖍️", explanation: "Sharing is caring! When we share, everyone gets to join in and no one is left out. That's real friendship." },
  { id: 6, text: "Rama pushes past everyone to be first in the lunch queue.", answer: "broken", emoji: "🏃", explanation: "Pushing is not allowed — it can hurt someone! Queuing fairly means everyone gets their lunch without rushing." },
  { id: 7, text: "Papa and Olivia both wear their seatbelts in the car.", answer: "good", emoji: "🚗", explanation: "Seatbelts save lives! In a sudden stop, a seatbelt keeps you safe in your seat. Always buckle up!" },
  { id: 8, text: "Dani takes his friend's toy without asking first.", answer: "broken", emoji: "🧸", explanation: "We should always ask before touching someone else's things. Respecting others' belongings is a golden rule of friendship!" },
]

export default function RulesGame() {
  const [current, setCurrent] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [results, setResults] = useState([])
  const [shake, setShake] = useState(false)

  const scenario = SCENARIOS[current]
  const isCorrect = answered === scenario.answer

  function handleAnswer(choice) {
    if (answered) return
    const correct = choice === scenario.answer
    if (correct) setScore(s => s + 1)
    else { setShake(true); setTimeout(() => setShake(false), 600) }
    setAnswered(choice)
    setResults(r => [...r, correct])
  }
  function handleNext() {
    if (current + 1 >= SCENARIOS.length) setDone(true)
    else { setCurrent(c => c + 1); setAnswered(null) }
  }
  function handleReset() { setCurrent(0); setAnswered(null); setScore(0); setDone(false); setResults([]) }

  if (done) {
    const perfect = score === SCENARIOS.length
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
        <div className="text-7xl animate-bounce">{perfect ? '🏆' : score >= 6 ? '⭐' : '📋'}</div>
        <h3 className="font-extrabold text-2xl" style={{ color: '#4CAF50' }}>{perfect ? 'Perfect Rule Keeper!' : score >= 6 ? 'Great job!' : 'Keep learning the rules!'}</h3>
        <p className="font-bold text-gray-600 text-lg">You spotted <span style={{ color: '#4CAF50' }}>{score}</span> out of {SCENARIOS.length} correctly!</p>
        <div className="grid grid-cols-8 gap-1.5 mt-1">{results.map((r, i) => <div key={i} className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: r ? '#dcfce7' : '#fee2e2' }}>{r ? '✅' : '❌'}</div>)}</div>
        <div className="rounded-2xl px-5 py-3 w-full" style={{ backgroundColor: '#F1F8E9', border: '2px solid #4CAF50' }}>
          <p className="text-sm font-extrabold text-green-800">{perfect ? "You're a brilliant rule-keeper, Olivia! Rules help keep everyone safe and happy." : 'Rules make the world a safer, fairer, kinder place — keep practising!'}</p>
        </div>
        <button onClick={handleReset} className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5" style={{ backgroundColor: '#4CAF50', boxShadow: '0 5px 0 #2e7d32' }}>Play Again 🔄</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} .pop-in{animation:pop-in 0.25s ease;} @keyframes pop-in{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: '#4CAF50' }}>Rules Sort</h3><p className="text-xs text-gray-400 font-bold">Round {current + 1} of {SCENARIOS.length}</p></div>
        <div className="flex gap-1.5">{SCENARIOS.map((_, i) => <div key={i} className="rounded-full transition-all" style={{ width: i === current ? 20 : 10, height: 10, backgroundColor: i < current ? (results[i] ? '#4CAF50' : '#FF7043') : i === current ? '#4CAF50' : '#e5e7eb' }} />)}</div>
      </div>
      <div className={`w-full rounded-3xl p-5 text-center flex flex-col items-center gap-3 ${shake ? 'shake' : ''}`} style={{ backgroundColor: '#FAFAFA', border: '2.5px dashed #e5e7eb' }}>
        <div className="text-6xl">{scenario.emoji}</div>
        <p className="font-extrabold text-gray-800 text-base leading-snug max-w-xs">{scenario.text}</p>
      </div>
      {!answered && <p className="text-center font-extrabold text-sm text-gray-500">Is this following a rule or breaking one?</p>}
      {!answered ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAnswer('good')} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ backgroundColor: '#f0fff4', border: '2.5px solid #4CAF50', color: '#2e7d32', boxShadow: '0 4px 0 #2e7d32' }}>
            <span className="text-4xl">✅</span><span>Good Rule!</span>
          </button>
          <button onClick={() => handleAnswer('broken')} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ backgroundColor: '#fff0f0', border: '2.5px solid #FF7043', color: '#c0391a', boxShadow: '0 4px 0 #c0391a' }}>
            <span className="text-4xl">❌</span><span>Rule Broken!</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pop-in">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2', border: `2.5px solid ${isCorrect ? '#4CAF50' : '#FF7043'}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? '#2e7d32' : '#c0391a' }}>{isCorrect ? '✅ Correct! ' : '❌ Not quite! '}{scenario.answer === 'good' ? 'This IS following a rule!' : 'This IS breaking a rule!'}</p>
          </div>
          <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ backgroundColor: '#F1F8E9', border: '2px solid #4CAF50' }}>
            <span className="text-lg">💡</span><p className="text-sm font-extrabold text-green-800">{scenario.explanation}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-0.5" style={{ backgroundColor: '#4CAF50', boxShadow: '0 4px 0 #2e7d32' }}>{current + 1 >= SCENARIOS.length ? 'See My Score 🏆' : 'Next Scenario →'}</button>
        </div>
      )}
    </div>
  )
}
