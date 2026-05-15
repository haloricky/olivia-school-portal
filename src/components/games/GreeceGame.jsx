import { useState } from "react";

const COLOR = "#854F0B";
const DARK = "#5c3507";
const BG = "#FFFAEC";

const QUESTIONS = [
  { q: "Ancient Greece invented a special system of government where ordinary citizens vote and make decisions together. What is it called?", choices: ["Monarchy", "Democracy", "Dictatorship", "Oligarchy"], answer: "Democracy", emoji: "🏛️", fact: "Democracy was invented in Athens around 500 BC. The word comes from Greek: 'demos' (people) + 'kratos' (power). Many countries use it today, including Indonesia!" },
  { q: "Which famous sporting event did ancient Greece create — now held every 4 years around the world?", choices: ["World Cup", "The Olympics", "The Marathon", "The Gladiator Games"], answer: "The Olympics", emoji: "🏅", fact: "The original Olympic Games were held in Olympia, Greece, beginning in 776 BC! Athletes competed in running, wrestling, and chariot racing — all to honour the god Zeus." },
  { q: "Who was the king of all the Greek gods, believed to live on Mount Olympus?", choices: ["Apollo", "Poseidon", "Hermes", "Zeus"], answer: "Zeus", emoji: "⚡", fact: "Zeus was the king of the gods and controlled lightning and thunder. The Greeks believed the 12 Olympian gods controlled everything — from the sea to love to wisdom!" },
  { q: "Which brilliant ancient Greek thinker is known as the 'Father of Philosophy' and asked questions like 'What is justice?'", choices: ["Aristotle", "Plato", "Socrates", "Alexander"], answer: "Socrates", emoji: "🤔", fact: "Socrates taught by asking questions — never giving direct answers! This is called the 'Socratic method'. He is still studied in schools and universities today." },
  { q: "Ancient Greece built beautiful temples with tall stone pillars. Which famous temple still stands on a hill in Athens?", choices: ["The Colosseum", "The Parthenon", "The Sphinx", "The Pantheon"], answer: "The Parthenon", emoji: "🏟️", fact: "The Parthenon was built 2,500 years ago on the Acropolis hill in Athens. It was a temple to the goddess Athena — goddess of wisdom and the protector of Athens!" },
  { q: "Ancient Greeks loved telling exciting stories about heroes, monsters, and gods. What do we call these stories?", choices: ["Fairy tales", "Myths", "History books", "Recipes"], answer: "Myths", emoji: "🐉", fact: "Greek myths featured heroes like Hercules fighting monsters, Odysseus sailing home, and Perseus defeating Medusa the snake-haired gorgon. These stories are still told today!" },
];

export default function GreeceGame() {
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
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 4 ? "⭐" : "🏛️"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Ancient Scholar!" : score >= 4 ? "Well done!" : "Keep exploring!"}</h3>
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
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{q.q}</p>
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
