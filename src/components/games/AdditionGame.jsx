import { useState, useEffect } from "react";

const COLOR = "#534AB7";
const DARK = "#2f2880";
const BG = "#F0EEFF";

const EMOJIS = ["🍎","🌟","🐸","🦋","🍭","🎈","🐙","🌈","🍩","🦄"];

function makeQuestion(round: number) {
  const maxA = Math.min(3 + Math.floor(round / 3), 9);
  const a = Math.floor(Math.random() * maxA) + 1;
  const b = Math.floor(Math.random() * (10 - a)) + 1;
  const answer = a + b;
  const emoji = EMOJIS[round % EMOJIS.length];
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const w = Math.max(1, answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1));
    if (w !== answer && w > 0 && w <= 18) wrongs.add(w);
  }
  const choices = [...wrongs, answer].sort(() => Math.random() - 0.5);
  return { a, b, answer, emoji, choices };
}

export default function AdditionGame() {
  const TOTAL = 10;
  const [round, setRound] = useState(0);
  const [q, setQ] = useState(() => makeQuestion(0));
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => { setQ(makeQuestion(round)); }, [round]);

  function handleSelect(c: number) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (selected === null) return;
    const correct = selected === q.answer;
    if (correct) { setScore(s => s + 1); setBurst(true); setTimeout(() => setBurst(false), 600); }
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
  }
  function handleNext() {
    if (round + 1 >= TOTAL) setDone(true);
    else { setRound(r => r + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setRound(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setBurst(false); }

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === TOTAL ? "🏆" : score >= 7 ? "⭐" : "🔢"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === TOTAL ? "Perfect score!" : score >= 7 ? "Brilliant!" : "Keep practising!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {TOTAL} correct!</p>
      <div className="rounded-2xl p-4" style={{ background: BG, border: `2px solid ${COLOR}` }}>
        <p className="font-extrabold text-sm" style={{ color: COLOR }}>Addition is just putting groups together — and you're getting great at it!</p>
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} .burst{animation:burst 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} @keyframes burst{0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">{Array.from({ length: TOTAL }).map((_, i) => <div key={i} className="rounded-full" style={{ width: 8, height: 8, background: i < round ? (i < score ? "#22c55e" : "#fca5a5") : i === round ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{round + 1}/{TOTAL}</span>
      </div>
      <div className={`rounded-2xl p-4 text-center ${burst ? "burst" : ""}`} style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-wrap justify-center gap-1 max-w-[100px]">{Array.from({ length: q.a }).map((_, i) => <span key={i} className="text-2xl">{q.emoji}</span>)}</div>
            <span className="font-extrabold text-2xl" style={{ color: COLOR }}>{q.a}</span>
          </div>
          <span className="font-extrabold text-4xl" style={{ color: DARK }}>+</span>
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-wrap justify-center gap-1 max-w-[100px]">{Array.from({ length: q.b }).map((_, i) => <span key={i} className="text-2xl">{q.emoji}</span>)}</div>
            <span className="font-extrabold text-2xl" style={{ color: COLOR }}>{q.b}</span>
          </div>
          <span className="font-extrabold text-4xl" style={{ color: DARK }}>=</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl">?</span>
            <span className="font-extrabold text-2xl" style={{ color: COLOR }}>?</span>
          </div>
        </div>
        <p className="font-extrabold text-base" style={{ color: DARK }}>{q.a} + {q.b} = ?</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {q.choices.map(choice => {
          const isWrong = confirmed && choice === selected && choice !== q.answer;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className={`rounded-2xl py-4 font-extrabold text-2xl text-center transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              {choice}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-2 items-center" style={{ background: selected === q.answer ? "#dcfce7" : "#fff7ed", border: `2px solid ${selected === q.answer ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{selected === q.answer ? "🌟" : "💡"}</span>
          <p className="font-extrabold text-sm" style={{ color: selected === q.answer ? "#15803d" : "#c2410c" }}>
            {selected === q.answer ? "Correct! " : `Not quite! `}{q.a} + {q.b} = <strong>{q.answer}</strong>
          </p>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={selected === null} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected !== null ? COLOR : "#d1d5db", boxShadow: selected !== null ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{round + 1 >= TOTAL ? "See My Score 🏆" : "Next Question →"}</button>
      )}
    </div>
  );
}
