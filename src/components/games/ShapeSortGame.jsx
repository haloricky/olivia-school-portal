import { useState } from "react";

const COLOR = "#534AB7";
const DARK = "#2f2880";
const BG = "#F0EEFF";

const QUESTIONS = [
  { q: "This shape has 3 sides and 3 corners. What is it?", choices: ["Square", "Triangle", "Pentagon", "Rectangle"], answer: "Triangle", svg: <polygon points="60,10 10,90 110,90" fill="#FF85A1" stroke="#cc5a74" strokeWidth="4"/>, sides: 3, fact: "A triangle has 3 sides and 3 corners (called vertices). Triangles are super strong shapes — that's why bridges and roofs are built with them!" },
  { q: "This shape has 4 equal sides and 4 equal corners. All sides are the same length!", choices: ["Rectangle", "Rhombus", "Square", "Pentagon"], answer: "Square", svg: <rect x="15" y="15" width="90" height="90" rx="6" fill="#87CEEB" stroke="#5aa0bd" strokeWidth="4"/>, sides: 4, fact: "A square has 4 equal sides and 4 right-angle corners. If you stretch a square longer on one side, you get a rectangle!" },
  { q: "This shape has 4 sides — but two sides are longer than the other two!", choices: ["Triangle", "Circle", "Rectangle", "Hexagon"], answer: "Rectangle", svg: <rect x="10" y="28" width="100" height="64" rx="6" fill="#90EE90" stroke="#5ab85a" strokeWidth="4"/>, sides: 4, fact: "A rectangle has 4 sides with 2 pairs of equal lengths. Doors, books, and phone screens are all rectangles!" },
  { q: "This shape has NO sides and NO corners. It is perfectly round!", choices: ["Oval", "Circle", "Hexagon", "Octagon"], answer: "Circle", svg: <circle cx="60" cy="55" r="44" fill="#FFD700" stroke="#b8960a" strokeWidth="4"/>, sides: 0, fact: "A circle has no straight sides or corners at all. Wheels, clocks, and coins are circles. The distance around a circle is called its circumference!" },
  { q: "This shape has 6 sides — bees use it to build their honeycombs!", choices: ["Octagon", "Pentagon", "Heptagon", "Hexagon"], answer: "Hexagon", svg: <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" fill="#DDA0DD" stroke="#aa6eaa" strokeWidth="4"/>, sides: 6, fact: "A hexagon has 6 equal sides! Honeybees build their honeycombs in hexagons because it's the most efficient shape — it uses the least wax and wastes no space." },
  { q: "This shape has 5 sides. Some people draw it as a star with 5 points!", choices: ["Triangle", "Hexagon", "Pentagon", "Octagon"], answer: "Pentagon", svg: <polygon points="60,8 104,40 88,90 32,90 16,40" fill="#FF8C00" stroke="#b85e00" strokeWidth="4"/>, sides: 5, fact: "A pentagon has 5 sides! The famous US military building in Washington DC is called 'The Pentagon' because it is built in this shape." },
  { q: "STOP! This shape has 8 sides — you can see it on road signs every day!", choices: ["Hexagon", "Circle", "Pentagon", "Octagon"], answer: "Octagon", svg: <polygon points="40,10 80,10 110,40 110,80 80,110 40,110 10,80 10,40" fill="#FF6B6B" stroke="#c04a4a" strokeWidth="4"/>, sides: 8, fact: "An octagon has 8 sides! STOP signs are octagons everywhere in the world. 'Oct' means 8 — like October (which was the 8th month in the old Roman calendar)!" },
  { q: "How many sides does a TRIANGLE have?", choices: ["2", "4", "3", "5"], answer: "3", svg: <polygon points="60,10 10,90 110,90" fill="#FF85A1" stroke="#cc5a74" strokeWidth="4"/>, sides: 3, fact: "Tri means THREE! Triangle = 3 angles = 3 sides. You can remember: TRIcycle has 3 wheels, TRIpod has 3 legs — TRIangle has 3 sides!" },
];

export default function ShapeSortGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;

  function handleSelect(c: string) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
    setAnswers(a => [...a, { correct }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setAnswers([]); }

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 6 ? "⭐" : "🔷"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Shape Master!" : score >= 6 ? "Brilliant!" : "Keep practising!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {QUESTIONS.length}!</p>
      <div className="grid grid-cols-4 gap-2">{answers.map((a, i) => <div key={i} className="rounded-xl flex items-center justify-center text-sm py-2" style={{ background: a.correct ? "#dcfce7" : "#fee2e2" }}>{a.correct ? "✅" : "❌"}</div>)}</div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again! 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">{QUESTIONS.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 22 : 10, height: 10, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{QUESTIONS.length}</span>
      </div>
      <div className="rounded-2xl p-4 text-center" style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <svg viewBox="0 0 120 120" width="110" height="110" className="mx-auto mb-2">{q.svg}</svg>
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{q.q}</p>
        {q.sides > 0 && <p className="text-xs text-gray-400 font-bold mt-1">Sides: {q.sides}</p>}
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {q.choices.map(choice => {
          const isWrong = confirmed && choice === selected && !isCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className={`rounded-2xl px-4 py-4 font-extrabold text-base text-center transition-all active:translate-y-0.5 flex items-center justify-center gap-2 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              {choice}
              {confirmed && choice === q.answer && <span className="text-green-500">✓</span>}
              {confirmed && isWrong && <span className="text-red-400">✗</span>}
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
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= QUESTIONS.length ? "See My Score 🏆" : "Next Shape →"}</button>
      )}
    </div>
  );
}
