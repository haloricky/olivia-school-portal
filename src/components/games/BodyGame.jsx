import { useState } from "react";
const QUESTIONS = [
  {
    q: "Which organ PUMPS blood around your whole body?",
    choices: ["The Brain", "The Heart", "The Lungs", "The Stomach"],
    answer: "The Heart",
    emoji: "\u2764\uFE0F",
    fact: "Your heart beats about 100,000 times every single day \u2014 that's 40 million times a year! It never takes a rest!",
    color: "#FF6B6B",
    dark: "#cc3333"
  },
  {
    q: "Which organs help you BREATHE in oxygen from the air?",
    choices: ["The Heart", "The Bones", "The Lungs", "The Eyes"],
    answer: "The Lungs",
    emoji: "\u{1FAC1}",
    fact: "You breathe about 20,000 times every day! Your two lungs can hold about the same amount of air as a football!",
    color: "#87CEEB",
    dark: "#4a8aaa"
  },
  {
    q: "Which organ is your body's COMMANDER \u2014 it thinks, remembers, and controls everything?",
    choices: ["The Heart", "The Stomach", "The Bones", "The Brain"],
    answer: "The Brain",
    emoji: "\u{1F9E0}",
    fact: "Your brain contains about 86 billion nerve cells \u2014 that's more than 10 times the number of people on Earth! It never fully switches off, even when you sleep.",
    color: "#DDA0DD",
    dark: "#8a5a8a"
  },
  {
    q: "Which organ DIGESTS the food you eat and turns it into energy?",
    choices: ["The Lungs", "The Brain", "The Stomach", "The Heart"],
    answer: "The Stomach",
    emoji: "\u{1FAC0}",
    fact: "Your stomach uses acid strong enough to dissolve metal! But don't worry \u2014 your stomach lining protects itself by replacing its surface every few days.",
    color: "#90EE90",
    dark: "#4a9a4a"
  },
  {
    q: "How many SENSES does the human body have?",
    choices: ["3 senses", "4 senses", "5 senses", "7 senses"],
    answer: "5 senses",
    emoji: "\u{1F440}",
    fact: "Sight, hearing, smell, taste, and touch \u2014 your 5 senses work together to help you understand everything around you. Some scientists believe we might have even more!",
    color: "#FFB347",
    dark: "#cc7a20"
  },
  {
    q: "What do your BONES do for your body?",
    choices: ["Pump blood", "Digest food", "Protect organs and help you stand", "Make sounds"],
    answer: "Protect organs and help you stand",
    emoji: "\u{1F9B4}",
    fact: "You have 206 bones in your body! Your smallest bone is inside your ear \u2014 it's called the stirrup and it's smaller than a grain of rice!",
    color: "#E0E0E0",
    dark: "#888"
  }
];
function BodyGame() {
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
    if (correct) setScore((s) => s + 1);
    else {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 600);
    }
    setConfirmed(true);
    setAnswers((a) => [...a, { question: q.q, chosen: selected, correct }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else {
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
        <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "\u{1F3C6}" : score >= 4 ? "\u2B50" : "\u2764\uFE0F"}</div>
        <h3 className="font-extrabold text-3xl" style={{ color: "#FF6B6B" }}>
          {score === QUESTIONS.length ? "Perfect, Olivia!" : score >= 4 ? "Great job!" : "Keep learning!"}
        </h3>
        <p className="font-bold text-gray-600 text-lg">
          You got <span style={{ color: "#FF6B6B" }}>{score}</span> out of {QUESTIONS.length} correct!
        </p>
        <div className="space-y-2 text-left">
          {answers.map((a, i) => <div
      key={i}
      className="rounded-2xl px-4 py-3 flex items-start gap-3"
      style={{ background: a.correct ? "#dcfce7" : "#fee2e2", border: `2px solid ${a.correct ? "#86efac" : "#fca5a5"}` }}
    >
              <span className="text-xl flex-shrink-0">{a.correct ? "\u2705" : "\u274C"}</span>
              <div>
                <p className="text-sm font-bold text-gray-700">{a.question}</p>
                {!a.correct && <p className="text-xs text-red-500 font-semibold mt-0.5">Correct: {QUESTIONS[i].answer}</p>}
              </div>
            </div>)}
        </div>
        <button
      onClick={handleReset}
      className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5"
      style={{ background: "#FF6B6B", boxShadow: "0 5px 0 0 #cc3333" }}
    >
          Try Again! 🔄
        </button>
      </div>;
  }
  return <div className="space-y-4" style={{ fontFamily: "Nunito, sans-serif" }}>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} .shake{animation:shake 0.4s ease;}`}</style>

      {
    /* Progress */
  }
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {QUESTIONS.map((_, i) => <div
    key={i}
    className="rounded-full transition-all"
    style={{
      width: i === current ? 24 : 12,
      height: 12,
      background: i < current ? "#22c55e" : i === current ? q.color : "#e5e7eb"
    }}
  />)}
        </div>
        <span className="font-extrabold" style={{ color: q.color }}>{current + 1}/{QUESTIONS.length}</span>
      </div>

      {
    /* Question card */
  }
      <div className="rounded-2xl p-5 text-center" style={{ background: q.color + "15", border: `3px solid ${q.color}` }}>
        <div className="text-6xl mb-3">{q.emoji}</div>
        <p className="font-extrabold text-lg leading-snug text-gray-800">{q.q}</p>
      </div>

      {
    /* Choices */
  }
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
      bg = q.color + "18";
      border = `3px solid ${q.color}`;
      textColor = q.dark;
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
      style={{ background: choice === selected ? q.color : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}
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
    /* Fact */
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

      {!confirmed ? <button
    onClick={handleConfirm}
    disabled={!selected}
    className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50"
    style={{ background: selected ? q.color : "#d1d5db", boxShadow: selected ? `0 5px 0 0 ${q.dark}` : "none" }}
  >
          Check Answer ✓
        </button> : <button
    onClick={handleNext}
    className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5"
    style={{ background: q.color, boxShadow: `0 5px 0 0 ${q.dark}` }}
  >
          {current + 1 >= QUESTIONS.length ? "See My Score \u{1F3C6}" : "Next Question \u2192"}
        </button>}
    </div>;
}
export {
  BodyGame as default
};
