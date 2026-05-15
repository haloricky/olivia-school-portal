import { useState } from "react";
const COLOR = "#1D9E75";
const DARK = "#116047";
const QUESTIONS = [
  { q: "Which type of climate has heavy rain and hot temperatures ALL YEAR \u2014 like in Indonesia?", choices: ["Polar", "Desert", "Tropical", "Temperate"], answer: "Tropical", emoji: "\u{1F334}", fact: "Tropical climates stay warm all year with lots of rain! Indonesia, Brazil, and parts of Africa are tropical. Most of the world's rainforests are found here." },
  { q: "Which climate type gets FOUR seasons \u2014 spring, summer, autumn, and winter?", choices: ["Tropical", "Desert", "Polar", "Temperate"], answer: "Temperate", emoji: "\u{1F342}", fact: "Temperate climates have four distinct seasons. Countries like the UK, France, and Japan have temperate climates \u2014 warm summers and cold (but not extreme) winters." },
  { q: "In which climate is it SNOWY and extremely cold almost all year round?", choices: ["Desert", "Tropical", "Temperate", "Polar"], answer: "Polar", emoji: "\u{1F9CA}", fact: "Polar climates near the North and South Poles are the coldest on Earth. Very few plants or animals can survive there \u2014 but polar bears and penguins have adapted!" },
  { q: "Which climate gets VERY LITTLE rain and is extremely hot and dry during the day?", choices: ["Polar", "Tropical", "Temperate", "Desert"], answer: "Desert", emoji: "\u{1F3DC}\uFE0F", fact: "Deserts get less than 25cm of rain per year! The Sahara Desert in Africa is the world's biggest hot desert. The Arabian Desert is also a vast, dry desert." },
  { q: "What do we call the regular pattern of temperature and rainfall a region gets over many years?", choices: ["Weather", "Climate", "A storm", "A season"], answer: "Climate", emoji: "\u{1F30D}", fact: "Climate is the long-term average weather of a place. Weather changes day to day ('it's raining today'), but climate is the overall pattern ('this city is usually dry')." },
  { q: "What causes the seasons \u2014 why is it hot in summer and cold in winter?", choices: ["The moon moves closer", "Earth tilts as it orbits the sun", "The sun gets bigger", "Clouds block the sun"], answer: "Earth tilts as it orbits the sun", emoji: "\u{1F31E}", fact: "Earth is tilted at 23.5\xB0. When your part of Earth is tilted TOWARD the sun, it's summer. When tilted AWAY, it's winter. This is why seasons are opposite in the north and south hemispheres!" }
];
function WeatherSortGame() {
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
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "\u{1F3C6}" : score >= 4 ? "\u2B50" : "\u{1F324}\uFE0F"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Climate Expert!" : score >= 4 ? "Great work!" : "Keep exploring!"}</h3>
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
      <div className="rounded-2xl p-5 text-center" style={{ background: "#E8FBF5", border: `3px solid ${COLOR}` }}>
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
      bg = "#E8FBF5";
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
  WeatherSortGame as default
};
