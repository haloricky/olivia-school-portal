import { useState } from "react";

const COLOR = "#993556";
const DARK = "#6b1f3a";
const BG = "#FFF0F5";

const QUESTIONS = [
  { q: "What do ALL families in the world have in common?", choices: ["The same food", "Love and care for each other", "The same number of people", "The same house"], answer: "Love and care for each other", emoji: "❤️", fact: "No matter where you live, every family — big or small — shares love and looks after each other. That's what makes a family!" },
  { q: "In Japan, it is common for grandparents to live together with the whole family. What is this called?", choices: ["A solo family", "A multi-generation family", "A travel family", "A work family"], answer: "A multi-generation family", emoji: "🏠", fact: "Multi-generation families are very common in Asia! Living with grandparents means children grow up learning traditions and stories from the oldest family members." },
  { q: "Some children are raised by two mums, two dads, or just one parent. What matters most?", choices: ["Having a big house", "Having the most toys", "Feeling loved and safe", "Having a car"], answer: "Feeling loved and safe", emoji: "🌟", fact: "Families come in all shapes and sizes. The most important thing is that children feel loved, safe, and cared for — that's what family is all about." },
  { q: "What do we call the stories, food, and celebrations that a family passes down from generation to generation?", choices: ["Homework", "Traditions", "Rules", "Hobbies"], answer: "Traditions", emoji: "🎊", fact: "Traditions are like a family's special fingerprint! Your family's way of celebrating birthdays, cooking special food, or saying goodnight is unique to you." },
  { q: "In Brazil, extended families — cousins, aunts, uncles — often celebrate together. What does 'extended family' mean?", choices: ["A very tall family", "A family that travels a lot", "Relatives beyond parents and siblings", "A family of giants"], answer: "Relatives beyond parents and siblings", emoji: "👨‍👩‍👧‍👦", fact: "Extended families include grandparents, aunts, uncles, and cousins! In many Latin American countries, big family gatherings with all these relatives are a beloved tradition." },
  { q: "Why is it important to learn about families from different countries and cultures?", choices: ["So we can copy them", "To understand that all families are valid and special", "Because our family is wrong", "To know who has more money"], answer: "To understand that all families are valid and special", emoji: "🌍", fact: "Learning about different families teaches us empathy and respect. Every family has its own beautiful way of living — and all of them deserve love and respect!" },
];

export default function FamiliesGame() {
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
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 4 ? "⭐" : "❤️"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Family Expert!" : score >= 4 ? "Well done!" : "Keep learning!"}</h3>
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
              className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-sm flex items-center gap-3 transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: choice === selected ? COLOR : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}>{["A","B","C","D"][idx]}</span>
              {choice}
              {confirmed && choice === q.answer && <span className="ml-auto text-green-500">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400">✗</span>}
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
