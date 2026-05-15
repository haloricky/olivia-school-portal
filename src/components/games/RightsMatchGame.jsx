import { useState } from "react";

const COLOR = "#993556";
const DARK = "#6b1f3a";
const BG = "#FFF0F5";

const PAIRS = [
  { right: "Right to Education — every child deserves to go to school and learn", duty: "Duty to study hard and help classmates learn too", emoji: "📚", color: "#1D9E75" },
  { right: "Right to Safety — every person deserves to feel safe from harm", duty: "Duty to follow rules and treat others with kindness", emoji: "🛡️", color: "#185FA5" },
  { right: "Right to Clean Water — every person needs safe water to drink", duty: "Duty to save water and not waste or pollute it", emoji: "💧", color: "#5178c8" },
  { right: "Right to Free Speech — you can share your thoughts and ideas", duty: "Duty to listen respectfully when others share theirs", emoji: "🗣️", color: "#854F0B" },
  { right: "Right to Healthcare — every person deserves medical care when sick", duty: "Duty to look after your health and not spread illness", emoji: "🏥", color: "#993556" },
  { right: "Right to a Clean Environment — everyone deserves clean air and nature", duty: "Duty to reduce rubbish, recycle, and protect our Earth", emoji: "🌿", color: "#3B6D11" },
];

const QUESTIONS = [
  { q: "Olivia has the right to go to school and learn. What is her DUTY as a student?", choices: ["To refuse homework", "To study hard and help classmates learn too", "To only learn what she likes", "To skip school when tired"], answer: 1, idx: 0 },
  { q: "Every child has the right to feel safe from harm. What DUTY does this create for us?", choices: ["To fight back if someone is mean", "To follow rules and treat others with kindness", "To only be safe ourselves", "To ignore others' problems"], answer: 1, idx: 1 },
  { q: "We all have the right to clean drinking water. What is our duty in return?", choices: ["To use as much water as we want", "To drink water every day", "To save water and not waste or pollute it", "To buy bottled water"], answer: 2, idx: 2 },
  { q: "You have the right to share your thoughts and ideas freely. What MUST you also do?", choices: ["Talk as much as you want", "Listen respectfully when others share theirs", "Only listen to adults", "Ignore other people's ideas"], answer: 1, idx: 3 },
  { q: "Rights and duties always go TOGETHER. If you have the right to a clean environment, what is your duty?", choices: ["Let others clean up", "Reduce rubbish, recycle, and protect our Earth", "Use as much plastic as you want", "Only clean your own house"], answer: 1, idx: 4 },
  { q: "What is the difference between a RIGHT and a DUTY?", choices: ["They are the same thing", "A right is something you get; a duty is something you owe to others", "A duty is something you receive", "Rights are only for adults"], answer: 1, idx: 5 },
];

const FACTS = [
  "Rights and duties are two sides of the same coin! When everyone respects each other's rights and does their duties, the world becomes a fairer, kinder place.",
  "Rules protect everyone — at school, on the road, and in our community. When we follow rules, we protect other people's rights!",
  "Only 2.5% of Earth's water is fresh water — and much of it is frozen! Every drop we save matters for future generations.",
  "Good listening is a superpower! When we truly listen to others, we understand different perspectives and make better decisions together.",
  "Every piece of rubbish you pick up, every bottle you recycle — it all adds up. One person CAN make a difference for our planet!",
  "The UN Convention on the Rights of the Child (1989) lists 54 rights for every child on Earth — including the right to play, to a name, and to be heard!",
];

export default function RightsMatchGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;
  const pair = PAIRS[q.idx];

  function handleSelect(i: number) { if (!confirmed) setSelected(i); }
  function handleConfirm() {
    if (selected === null) return;
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
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 4 ? "⭐" : "🌍"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Rights Champion!" : score >= 4 ? "Great citizen!" : "Keep learning!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {QUESTIONS.length}!</p>
      <div className="space-y-2 w-full text-left">
        {PAIRS.map((p, i) => (
          <div key={i} className="rounded-xl p-3" style={{ background: p.color + "15", border: `1.5px solid ${p.color}` }}>
            <p className="font-extrabold text-xs mb-1" style={{ color: p.color }}>{p.emoji} RIGHT: <span className="font-semibold">{p.right.split('—')[0]}</span></p>
            <p className="text-xs text-gray-600 font-semibold">⇒ DUTY: {p.duty}</p>
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
        <div className="flex gap-1.5">{QUESTIONS.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 22 : 10, height: 10, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{QUESTIONS.length}</span>
      </div>
      <div className="rounded-2xl p-5 text-center" style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="text-5xl mb-3">{pair.emoji}</div>
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{q.q}</p>
      </div>
      <div className="space-y-2.5">
        {q.choices.map((choice, idx) => {
          const isWrong = confirmed && idx === selected && !isCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (idx === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (idx === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={confirmed}
              className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-sm flex items-center gap-3 transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: idx === selected ? COLOR : "#f3f4f6", color: idx === selected ? "#fff" : "#6b7280" }}>{["A","B","C","D"][idx]}</span>
              {choice}
              {confirmed && idx === q.answer && <span className="ml-auto text-green-500">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400">✗</span>}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "🌟" : "💡"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "Correct!" : `Answer: ${q.choices[q.answer]}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{FACTS[current]}</p></div>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={selected === null} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected !== null ? COLOR : "#d1d5db", boxShadow: selected !== null ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= QUESTIONS.length ? "See My Score 🏆" : "Next Question →"}</button>
      )}
    </div>
  );
}
