import { useState } from "react";
const QUESTIONS = [
  {
    q: "Who was the king of ancient Egypt, believed to be a living god?",
    choices: ["A Pharaoh", "A President", "A Knight", "A Scientist"],
    answer: "A Pharaoh",
    emoji: "\u{1F451}",
    fact: "Pharaohs wore a double crown \u2014 white for Upper Egypt and red for Lower Egypt. They were so powerful that everyone bowed before them!"
  },
  {
    q: "What were the Egyptian pyramids built for?",
    choices: ["Schools", "Food stores", "Royal tombs", "Shopping markets"],
    answer: "Royal tombs",
    emoji: "\u{1F53A}",
    fact: "The Great Pyramid of Giza is one of the Seven Wonders of the Ancient World! It was built with over 2 million stone blocks \u2014 all by hand!"
  },
  {
    q: "What is Hieroglyphics?",
    choices: ["A type of food", "A picture writing system", "A river in Egypt", "A type of pyramid"],
    answer: "A picture writing system",
    emoji: "\u{1F4DC}",
    fact: "Ancient Egyptians wrote using over 700 different picture symbols! Scholars couldn't read them for 1,500 years until the Rosetta Stone was found."
  },
  {
    q: "Which great river gave life and water to all of Egypt?",
    choices: ["The Amazon", "The Thames", "The Nile", "The Congo"],
    answer: "The Nile",
    emoji: "\u{1F30A}",
    fact: "The Nile is the longest river in the world! Every year it flooded its banks, leaving rich dark soil perfect for growing wheat and barley."
  },
  {
    q: "What is the name for a preserved Egyptian body wrapped in cloth?",
    choices: ["A Statue", "A Mummy", "A Doll", "A Fossil"],
    answer: "A Mummy",
    emoji: "\u{1FAAC}",
    fact: "Egyptians believed the body needed to be preserved so the person could live forever in the afterlife! The process took 70 days!"
  },
  {
    q: "What huge stone creature has a lion's body and a human head?",
    choices: ["A Pyramid", "A Mummy", "The Sphinx", "A Camel"],
    answer: "The Sphinx",
    emoji: "\u{1F981}",
    fact: "The Great Sphinx of Giza is 73 metres long \u2014 as long as a whole city block! It has guarded the pyramids for over 4,500 years."
  }
];
const SUBJECT_COLOR = "#854F0B";
const SUBJECT_BG = "#FFFAEC";
function EgyptGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [answers, setAnswers] = useState([]);
  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;
  function handleSelect(choice) {
    if (confirmed) return;
    setSelected(choice);
  }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) {
      setScore((s) => s + 1);
    } else {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 600);
    }
    setConfirmed(true);
    setAnswers((a) => [...a, { question: q.q, chosen: selected, correct }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }
  function handleReset() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setDone(false);
    setAnswers([]);
    setWrongShake(false);
  }
  if (done) {
    return <div className="text-center space-y-5 py-4" style={{ fontFamily: "Nunito, sans-serif" }}>
        <div className="text-7xl animate-bounce">
          {score === QUESTIONS.length ? "\u{1F3C6}" : score >= 4 ? "\u2B50" : "\u{1F4D6}"}
        </div>
        <h3 className="font-extrabold text-3xl" style={{ color: SUBJECT_COLOR }}>
          {score === QUESTIONS.length ? "Perfect, Olivia!" : score >= 4 ? "Well done!" : "Keep exploring!"}
        </h3>
        <p className="font-bold text-gray-600 text-lg">
          You got <span style={{ color: SUBJECT_COLOR }}>{score}</span> out of {QUESTIONS.length} correct!
        </p>
        <div className="space-y-2 text-left mt-2">
          {answers.map((a, i) => <div
      key={i}
      className="rounded-2xl px-4 py-3 flex items-start gap-3"
      style={{ background: a.correct ? "#dcfce7" : "#fee2e2", border: `2px solid ${a.correct ? "#86efac" : "#fca5a5"}` }}
    >
              <span className="text-xl flex-shrink-0">{a.correct ? "\u2705" : "\u274C"}</span>
              <div>
                <p className="text-sm font-bold text-gray-700">{a.question}</p>
                {!a.correct && <p className="text-xs text-red-500 font-semibold mt-0.5">
                    You answered: {a.chosen} · Correct: {QUESTIONS[i].answer}
                  </p>}
              </div>
            </div>)}
        </div>
        <button
      onClick={handleReset}
      className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl mt-2 transition-all active:translate-y-0.5"
      style={{ background: SUBJECT_COLOR, boxShadow: "0 5px 0 0 #5c3507" }}
    >
          Try Again! 🔄
        </button>
      </div>;
  }
  return <div className="space-y-4" style={{ fontFamily: "Nunito, sans-serif" }}>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} } .shake{animation:shake 0.4s ease;}`}</style>

      {
    /* Header */
  }
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {QUESTIONS.map((_, i) => <div
    key={i}
    className="w-3 h-3 rounded-full transition-all"
    style={{
      background: i < current ? "#22c55e" : i === current ? SUBJECT_COLOR : "#e5e7eb",
      transform: i === current ? "scale(1.3)" : "scale(1)"
    }}
  />)}
        </div>
        <span className="font-extrabold text-base" style={{ color: SUBJECT_COLOR }}>{current + 1}/{QUESTIONS.length}</span>
      </div>

      {
    /* Question card */
  }
      <div className="rounded-2xl p-5" style={{ background: SUBJECT_BG, border: `3px solid ${SUBJECT_COLOR}` }}>
        <div className="text-5xl text-center mb-3">{q.emoji}</div>
        <p className="font-extrabold text-lg sm:text-xl text-center leading-snug" style={{ color: SUBJECT_COLOR }}>{q.q}</p>
      </div>

      {
    /* Choices */
  }
      <div className="space-y-2.5">
        {q.choices.map((choice, idx) => {
    let bg = "white";
    let border = `2px solid ${SUBJECT_COLOR}44`;
    let textColor = "#3a2a32";
    const isWrong = confirmed && choice === selected && !isCorrect;
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
      bg = "#FFFAEC";
      border = `3px solid ${SUBJECT_COLOR}`;
      textColor = SUBJECT_COLOR;
    }
    return <button
      key={choice}
      onClick={() => handleSelect(choice)}
      disabled={confirmed}
      className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-base flex items-center gap-3 transition-all active:translate-y-0.5 disabled:cursor-not-allowed ${isWrong && wrongShake ? "shake" : ""}`}
      style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}
    >
              <span
      className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0"
      style={{ background: choice === selected ? SUBJECT_COLOR : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}
    >
                {["A", "B", "C", "D"][idx]}
              </span>
              {choice}
              {confirmed && choice === q.answer && <span className="ml-auto text-green-500 text-xl">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400 text-xl">✗</span>}
            </button>;
  })}
      </div>

      {
    /* Fact reveal */
  }
      {confirmed && <div
    className="rounded-2xl px-4 py-3 flex gap-3 items-start"
    style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}
  >
          <span className="text-2xl flex-shrink-0">{isCorrect ? "\u{1F31F}" : "\u{1F4A1}"}</span>
          <div>
            <p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>
              {isCorrect ? "Correct!" : `Answer: ${q.answer}`}
            </p>
            <p className="text-sm text-gray-600 mt-0.5 font-bold">{q.fact}</p>
          </div>
        </div>}

      {
    /* Action button */
  }
      {!confirmed ? <button
    onClick={handleConfirm}
    disabled={!selected}
    className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50"
    style={{ background: selected ? SUBJECT_COLOR : "#d1d5db", boxShadow: selected ? "0 5px 0 0 #5c3507" : "none" }}
  >
          Check Answer ✓
        </button> : <button
    onClick={handleNext}
    className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5"
    style={{ background: SUBJECT_COLOR, boxShadow: "0 5px 0 0 #5c3507" }}
  >
          {current + 1 >= QUESTIONS.length ? "See My Score \u{1F3C6}" : "Next Question \u2192"}
        </button>}
    </div>;
}
export {
  EgyptGame as default
};
