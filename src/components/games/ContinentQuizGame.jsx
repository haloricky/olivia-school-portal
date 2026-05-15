import { useState } from "react";

const COLOR = "#1D9E75";
const DARK = "#116047";
const BG = "#E8FBF5";

const QUESTIONS = [
  { q: "Which is the LARGEST continent in the world?", choices: ["Africa", "Asia", "Europe", "South America"], answer: "Asia", emoji: "🌏", fact: "Asia is enormous — it covers about 30% of Earth's land area and is home to over 4.5 billion people! That's more than half the people on the whole planet." },
  { q: "Which continent is completely covered in ice and snow, and has NO permanent human residents?", choices: ["Arctic", "Antarctica", "Greenland", "North America"], answer: "Antarctica", emoji: "🧊", fact: "Antarctica is the coldest, driest, and windiest continent on Earth. Scientists visit to study it, but no one actually lives there permanently!" },
  { q: "Which continent is shaped like a triangle and has the Amazon rainforest — the world's largest jungle?", choices: ["Africa", "Asia", "South America", "Australia"], answer: "South America", emoji: "🌿", fact: "The Amazon Rainforest covers most of northern South America and produces about 20% of the world's oxygen. That's why it's called 'the lungs of the Earth'!" },
  { q: "Which is the SMALLEST continent — also a country all by itself?", choices: ["Europe", "Australia", "Antarctica", "South America"], answer: "Australia", emoji: "🦘", fact: "Australia is both a continent and a country! It's home to unique animals found nowhere else on Earth — like kangaroos, koalas, and the platypus." },
  { q: "Which continent has the most countries — 54 in total?", choices: ["Asia", "Europe", "Africa", "South America"], answer: "Africa", emoji: "🌍", fact: "Africa has 54 countries and over 2,000 different languages! It is the second-largest continent, and is incredibly diverse in its people, landscapes, and wildlife." },
  { q: "How many continents are there in total on planet Earth?", choices: ["5", "6", "7", "8"], answer: "7", emoji: "🌎", fact: "The 7 continents are: Africa, Antarctica, Asia, Australia, Europe, North America, and South America. Remember them by the song: 'Seven Continents of the world!'" },
];

export default function ContinentQuizGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; question: string }[]>([]);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;

  function handleSelect(c: string) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
    setAnswers(a => [...a, { correct, question: q.q }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setAnswers([]); }

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 4 ? "⭐" : "🌍"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Continent Expert!" : score >= 4 ? "Well done!" : "Keep exploring!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {QUESTIONS.length}!</p>
      <div className="space-y-2 text-left">
        {answers.map((a, i) => (
          <div key={i} className="rounded-2xl px-4 py-3 flex items-start gap-3" style={{ background: a.correct ? "#dcfce7" : "#fee2e2", border: `2px solid ${a.correct ? "#86efac" : "#fca5a5"}` }}>
            <span className="text-xl">{a.correct ? "✅" : "❌"}</span>
            <div><p className="text-sm font-bold text-gray-700">{a.question}</p>{!a.correct && <p className="text-xs text-red-500 font-semibold mt-0.5">Correct: {QUESTIONS[i].answer}</p>}</div>
          </div>
        ))}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again! 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">{QUESTIONS.map((_, i) => <div key={i} className="rounded-full transition-all" style={{ width: i === current ? 24 : 12, height: 12, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{QUESTIONS.length}</span>
      </div>
      <div className="rounded-2xl p-5 text-center" style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="text-6xl mb-3">{q.emoji}</div>
        <p className="font-extrabold text-lg leading-snug" style={{ color: DARK }}>{q.q}</p>
      </div>
      <div className="space-y-2.5">
        {q.choices.map((choice, idx) => {
          const isWrong = confirmed && choice === selected && !isCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-base flex items-center gap-3 transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0" style={{ background: choice === selected ? COLOR : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}>{["A","B","C","D"][idx]}</span>
              {choice}
              {confirmed && choice === q.answer && <span className="ml-auto text-green-500 text-xl">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400 text-xl">✗</span>}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "🌟" : "💡"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "Correct!" : `Answer: ${q.answer}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{q.fact}</p></div>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={!selected} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected ? COLOR : "#d1d5db", boxShadow: selected ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= QUESTIONS.length ? "See My Score 🏆" : "Next Question →"}</button>
      )}
    </div>
  );
}
