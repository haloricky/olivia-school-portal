import { useState } from "react";
const COLOR = "#3B6D11";
const DARK = "#254808";
const BG = "#F0FBE4";
const SCENARIOS = [
  {
    problem: "You are building a tower with blocks and it keeps falling down. What is the best thing to do?",
    emoji: "\u{1F9F1}",
    choices: [
      "Give up and go do something else",
      "Think about WHY it falls \u2014 maybe try a wider base, then try again",
      "Blame the blocks for being bad",
      "Ask someone else to build it for you instead"
    ],
    answer: 1,
    reason: "Great problem-solvers observe what went wrong, make a change, and try again. A wider base makes towers more stable \u2014 this is the same principle engineers use to build real skyscrapers!"
  },
  {
    problem: "You and your best friend both want to watch different programmes at the same time. What should you do?",
    emoji: "\u{1F4FA}",
    choices: [
      "Grab the remote and watch what you want",
      "Take turns \u2014 watch one show today, the other show tomorrow",
      "Have a screaming argument until someone gives in",
      "Never watch TV together again"
    ],
    answer: 1,
    reason: "Taking turns is a fair solution where both people get what they want! This is called compromise \u2014 one of the most important skills for friendships, families, and even world leaders."
  },
  {
    problem: "You forgot to do your homework and your teacher will be upset. What is the BEST response?",
    emoji: "\u{1F4DD}",
    choices: [
      "Pretend you did it and hope the teacher doesn't notice",
      "Blame your little sibling for distracting you",
      "Tell the teacher honestly, apologise, and complete it as soon as possible",
      "Hide at home and don't go to school"
    ],
    answer: 2,
    reason: "Honesty is always the best policy! Admitting a mistake takes courage and shows character. Most teachers respect students who are honest and take responsibility far more than those who make excuses."
  },
  {
    problem: "You see a classmate sitting alone looking sad. What is the most helpful thing to do?",
    emoji: "\u{1F622}",
    choices: [
      "Ignore them \u2014 it's not your problem",
      "Laugh because it looks funny",
      "Walk over, smile, and ask if they are okay",
      "Go tell everyone in the class that they look sad"
    ],
    answer: 2,
    reason: "Small acts of kindness make a HUGE difference. Simply asking 'Are you okay?' can change someone's whole day. Empathy \u2014 understanding how others feel \u2014 is one of the most powerful human skills."
  },
  {
    problem: "You want to buy a special toy but you only have half the money needed. What is the wisest approach?",
    emoji: "\u{1F4B0}",
    choices: [
      "Cry until someone buys it for you",
      "Save your pocket money each week until you have enough",
      "Take money from somewhere without asking",
      "Forget about it \u2014 you can never have nice things"
    ],
    answer: 1,
    reason: "Saving up takes patience, but it teaches you the value of money and how to work towards a goal. When you earn something through your own effort and planning, it feels even better!"
  },
  {
    problem: "You made a drawing you were really proud of, but your friend says they don't like it. How do you handle this?",
    emoji: "\u{1F3A8}",
    choices: [
      "Throw your drawing in the bin because one person didn't like it",
      "Stop being friends with them immediately",
      "Remember that everyone has different tastes, and be proud of what YOU created",
      "Only create art that other people tell you to make"
    ],
    answer: 2,
    reason: "Confidence in your own creativity is so important! Not everyone will love the same things \u2014 and that's perfectly okay. Famous artists like Van Gogh were rejected by many people during their lifetime, but kept creating anyway. Your art matters!"
  }
];
function ScenarioSortGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState([]);
  const q = SCENARIOS[current];
  const isCorrect = selected === q.answer;
  function handleSelect(i) {
    if (!confirmed) setSelected(i);
  }
  function handleConfirm() {
    if (selected === null) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setConfirmed(true);
    setAnswers((a) => [...a, { correct }]);
  }
  function handleNext() {
    if (current + 1 >= SCENARIOS.length) setDone(true);
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
      <div className="text-7xl animate-bounce">{score === SCENARIOS.length ? "\u{1F3C6}" : score >= 4 ? "\u2B50" : "\u{1F9E0}"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === SCENARIOS.length ? "Problem Solver!" : score >= 4 ? "Super thinker!" : "Keep practising!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You solved <span style={{ color: COLOR }}>{score}</span> out of {SCENARIOS.length} problems!</p>
      <div className="grid grid-cols-3 gap-2">{answers.map((a, i) => <div key={i} className="rounded-xl py-3 text-center text-xl" style={{ background: a.correct ? "#dcfce7" : "#fee2e2" }}>{a.correct ? "\u2705" : "\u274C"}</div>)}</div>
      <div className="rounded-2xl p-4" style={{ background: BG, border: `2px solid ${COLOR}` }}>
        <p className="font-extrabold text-sm" style={{ color: COLOR }}>Remember: Good problem-solvers observe, think, try, and learn from mistakes. And they treat others with kindness along the way!</p>
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again 🔄</button>
    </div>;
  return <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">{SCENARIOS.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 22 : 10, height: 10, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{SCENARIOS.length}</span>
      </div>
      <div className={`rounded-2xl p-5 text-center ${shake ? "shake" : ""}`} style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="text-6xl mb-3">{q.emoji}</div>
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{q.problem}</p>
      </div>
      <div className="space-y-2.5">
        {q.choices.map((choice, idx) => {
    const isWrong = confirmed && idx === selected && !isCorrect;
    let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
    if (confirmed) {
      if (idx === q.answer) {
        bg = "#f0fff4";
        border = "2.5px solid #86efac";
        textColor = "#15803d";
      } else if (isWrong) {
        bg = "#fff0f0";
        border = "2.5px solid #fca5a5";
        textColor = "#dc2626";
      }
    } else if (idx === selected) {
      bg = BG;
      border = `3px solid ${COLOR}`;
      textColor = DARK;
    }
    return <button
      key={idx}
      onClick={() => handleSelect(idx)}
      disabled={confirmed}
      className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-sm flex items-center gap-3 transition-all active:translate-y-0.5`}
      style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}
    >
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: idx === selected ? COLOR : "#f3f4f6", color: idx === selected ? "#fff" : "#6b7280" }}>{["A", "B", "C", "D"][idx]}</span>
              {choice}
              {confirmed && idx === q.answer && <span className="ml-auto text-green-500">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400">✗</span>}
            </button>;
  })}
      </div>
      {confirmed && <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "\u{1F31F}" : "\u{1F4A1}"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "Great thinking!" : `Best answer: ${q.choices[q.answer]}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{q.reason}</p></div>
        </div>}
      {!confirmed ? <button onClick={handleConfirm} disabled={selected === null} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected !== null ? COLOR : "#d1d5db", boxShadow: selected !== null ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button> : <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= SCENARIOS.length ? "See My Score \u{1F3C6}" : "Next Scenario \u2192"}</button>}
    </div>;
}
export {
  ScenarioSortGame as default
};
