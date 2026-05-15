import { useState } from "react";
const COLOR = "#993556";
const DARK = "#6b1f3a";
const BG = "#FFF0F5";
const QUESTIONS = [
  { q: "What do we call the leader who is chosen by the people to run a whole country \u2014 like the leader of the USA or Indonesia?", choices: ["Mayor", "King", "President", "Prime Minister"], answer: "President", emoji: "\u{1F3DB}\uFE0F", fact: "A President is elected (chosen by votes) by the citizens to lead the country. Indonesia's President (Presiden) leads the government, the armed forces, and represents Indonesia to the world." },
  { q: "In countries like the UK and Australia, the elected head of government is called what?", choices: ["President", "Prime Minister", "Chancellor", "Emperor"], answer: "Prime Minister", emoji: "\u{1F1EC}\u{1F1E7}", fact: "A Prime Minister is the head of government in parliamentary countries. The UK, Australia, Canada, India, and Malaysia all have Prime Ministers. They are chosen by the parliament, not a direct public vote." },
  { q: "Some countries have a royal family whose role is passed down through generations. What do we call the male ruler?", choices: ["President", "Mayor", "King", "Governor"], answer: "King", emoji: "\u{1F451}", fact: "A King (or Queen) rules a monarchy \u2014 a country where power is inherited by royal families. Today most kings and queens are 'constitutional' \u2014 they are symbolic leaders, and a Prime Minister actually runs the government." },
  { q: "Who runs a city \u2014 like the leader of Jakarta, Surabaya, or New York City?", choices: ["Governor", "Mayor", "Admiral", "Senator"], answer: "Mayor", emoji: "\u{1F3D9}\uFE0F", fact: "A Mayor runs a city or large town. Jakarta's leader is called a Governor (Gubernur) because Jakarta is a special capital region. Most Indonesian cities have a Mayor (Wali Kota)." },
  { q: "Nelson Mandela spent 27 years in prison fighting for equal rights for all South Africans. He became a great leader known for what important quality?", choices: ["Being the richest man in Africa", "Forgiveness and bringing people together", "Starting wars with other countries", "Building the most buildings"], answer: "Forgiveness and bringing people together", emoji: "\u270A", fact: "Nelson Mandela became South Africa's first black President in 1994. Despite 27 years of unjust imprisonment, he chose forgiveness instead of revenge \u2014 making him one of the most admired leaders in history." },
  { q: "What is the most important quality a good leader should have?", choices: ["Being the loudest person in the room", "Looking after only their own family", "Being honest, fair, and caring about all people", "Having the most expensive clothes"], answer: "Being honest, fair, and caring about all people", emoji: "\u2B50", fact: "Great leaders throughout history \u2014 like Nelson Mandela, Soekarno, Mahatma Gandhi \u2014 led with honesty, courage, and care for ALL people, not just themselves. And Olivia, you can be a leader too!" }
];
function LeaderMatchGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState([]);
  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;
  function handleSelect(c) {
    if (!confirmed) setSelected(c);
  }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setConfirmed(true);
    setAnswers((a) => [...a, { correct, question: q.q }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }
  function reset() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setDone(false);
    setAnswers([]);
  }
  if (done) return <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "\u{1F3C6}" : score >= 4 ? "\u2B50" : "\u{1F30D}"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Future Leader!" : score >= 4 ? "Well done!" : "Keep learning!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {QUESTIONS.length}!</p>
      <div className="space-y-2 text-left">
        {answers.map((a, i) => <div key={i} className="rounded-2xl px-4 py-3 flex items-start gap-3" style={{ background: a.correct ? "#dcfce7" : "#fee2e2", border: `2px solid ${a.correct ? "#86efac" : "#fca5a5"}` }}>
            <span className="text-xl">{a.correct ? "\u2705" : "\u274C"}</span>
            <div><p className="text-sm font-bold text-gray-700">{a.question}</p>{!a.correct && <p className="text-xs text-red-500 font-semibold mt-0.5">Correct: {QUESTIONS[i].answer}</p>}</div>
          </div>)}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again! 🔄</button>
    </div>;
  return <div className="space-y-4 font-display">
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
    if (confirmed) {
      if (choice === q.answer) {
        bg = "#f0fff4";
        border = "2.5px solid #86efac";
        textColor = "#15803d";
      } else if (isWrong) {
        bg = "#fff0f0";
        border = "2.5px solid #fca5a5";
        textColor = "#dc2626";
      }
    } else if (choice === selected) {
      bg = BG;
      border = `3px solid ${COLOR}`;
      textColor = DARK;
    }
    return <button
      key={choice}
      onClick={() => handleSelect(choice)}
      disabled={confirmed}
      className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-sm flex items-center gap-3 transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
      style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}
    >
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: choice === selected ? COLOR : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}>{["A", "B", "C", "D"][idx]}</span>
              {choice}
              {confirmed && choice === q.answer && <span className="ml-auto text-green-500">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400">✗</span>}
            </button>;
  })}
      </div>
      {confirmed && <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "\u{1F31F}" : "\u{1F4A1}"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "Correct!" : `Answer: ${q.answer}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{q.fact}</p></div>
        </div>}
      {!confirmed ? <button onClick={handleConfirm} disabled={!selected} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected ? COLOR : "#d1d5db", boxShadow: selected ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button> : <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= QUESTIONS.length ? "See My Score \u{1F3C6}" : "Next Question \u2192"}</button>}
    </div>;
}
export {
  LeaderMatchGame as default
};
