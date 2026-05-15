import { useState } from "react";
const NEED_COLOR = "#1D9E75";
const NEED_DARK = "#116047";
const WANT_COLOR = "#FF85A1";
const WANT_DARK = "#cc5a74";
const ITEMS = [
  { label: "Food to eat", emoji: "\u{1F35A}", category: "need", reason: "Our bodies need food every day to have energy, grow, and stay healthy!" },
  { label: "Clean water", emoji: "\u{1F4A7}", category: "need", reason: "Water keeps every cell in our body alive. We can only survive a few days without it!" },
  { label: "A home to sleep in", emoji: "\u{1F3E0}", category: "need", reason: "Shelter keeps us safe from rain, cold, and danger \u2014 it's one of our most basic needs." },
  { label: "Clothes to wear", emoji: "\u{1F455}", category: "need", reason: "Clothes protect our bodies from the weather \u2014 they're a basic need, though fashion choices are wants!" },
  { label: "A giant teddy bear", emoji: "\u{1F9F8}", category: "want", reason: "Teddy bears are lovely but we don't need them to survive. They're a fun want!" },
  { label: "New video game", emoji: "\u{1F3AE}", category: "want", reason: "Games are great fun but not a necessity \u2014 we can live happily without them." },
  { label: "Medicine when sick", emoji: "\u{1F48A}", category: "need", reason: "When we are sick, medicine helps us get better \u2014 it becomes a need at that time!" },
  { label: "Sweets and candy", emoji: "\u{1F36C}", category: "want", reason: "Sweets taste delicious but they're definitely a want \u2014 our body doesn't need sugar to survive." },
  { label: "Going to school", emoji: "\u{1F4DA}", category: "need", reason: "Education is a basic human right and need \u2014 it helps us build our future and understand the world!" },
  { label: "A new bicycle", emoji: "\u{1F6B2}", category: "want", reason: "A bike is a great toy or even transport, but it's a want \u2014 we can use other ways to get around." },
  { label: "A doctor's visit", emoji: "\u{1F3E5}", category: "need", reason: "Healthcare keeps us healthy and alive \u2014 it's an important need for everyone." },
  { label: "Ice cream every day", emoji: "\u{1F366}", category: "want", reason: "Ice cream is yummy, but eating it every day would actually harm our health \u2014 it's definitely a want!" }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function NeedsWantsGame() {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState([]);
  const [shake, setShake] = useState(false);
  const item = items[current];
  const isCorrect = answered === item.category;
  function handleAnswer(choice) {
    if (answered) return;
    const correct = choice === item.category;
    if (correct) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setAnswered(choice);
    setResults((r) => [...r, correct]);
  }
  function handleNext() {
    if (current + 1 >= items.length) setDone(true);
    else {
      setCurrent((c) => c + 1);
      setAnswered(null);
    }
  }
  function reset() {
    setCurrent(0);
    setAnswered(null);
    setScore(0);
    setDone(false);
    setResults([]);
  }
  if (done) {
    const perfect = score === items.length;
    return <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
        <div className="text-7xl animate-bounce">{perfect ? "\u{1F3C6}" : score >= 9 ? "\u2B50" : "\u{1F4B0}"}</div>
        <h3 className="font-extrabold text-2xl" style={{ color: NEED_COLOR }}>{perfect ? "Perfect Money Mind!" : score >= 9 ? "Well done!" : "Keep learning!"}</h3>
        <p className="font-bold text-gray-600 text-lg">You sorted <span style={{ color: NEED_COLOR }}>{score}</span> out of {items.length} correctly!</p>
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="rounded-2xl p-3 text-center" style={{ background: "#E8FBF5", border: `2px solid ${NEED_COLOR}` }}>
            <p className="text-2xl">✅</p>
            <p className="font-extrabold text-sm" style={{ color: NEED_COLOR }}>NEEDS</p>
            <p className="text-xs text-gray-500 font-semibold">Food, water, shelter, clothes, school, health</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background: "#FFF5F8", border: `2px solid ${WANT_COLOR}` }}>
            <p className="text-2xl">🌟</p>
            <p className="font-extrabold text-sm" style={{ color: WANT_COLOR }}>WANTS</p>
            <p className="text-xs text-gray-500 font-semibold">Toys, games, sweets, bikes, teddy bears</p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1.5">{results.map((r, i) => <div key={i} className="rounded-xl flex items-center justify-center text-base w-8 h-8" style={{ background: r ? "#dcfce7" : "#fee2e2" }}>{r ? "\u2705" : "\u274C"}</div>)}</div>
        <button onClick={reset} className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5" style={{ background: NEED_COLOR, boxShadow: `0 5px 0 ${NEED_DARK}` }}>Play Again 🔄</button>
      </div>;
  }
  return <div className="flex flex-col gap-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} .pop{animation:pop 0.25s ease;} @keyframes pop{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold text-gray-700">Needs vs Wants</h3><p className="text-xs text-gray-400 font-bold">Item {current + 1} of {items.length}</p></div>
        <div className="flex gap-1.5">{items.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 20 : 10, height: 10, background: i < current ? results[i] ? "#22c55e" : "#fca5a5" : i === current ? NEED_COLOR : "#e5e7eb" }} />)}</div>
      </div>
      <div className={`rounded-3xl p-5 text-center flex flex-col items-center gap-3 ${shake ? "shake" : ""}`} style={{ background: "#FAFAFA", border: "2.5px dashed #e5e7eb" }}>
        <div className="text-6xl">{item.emoji}</div>
        <p className="font-extrabold text-gray-800 text-lg">{item.label}</p>
      </div>
      {!answered && <p className="text-center font-extrabold text-sm text-gray-500">Is this a Need or a Want?</p>}
      {!answered ? <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAnswer("need")} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ background: "#E8FBF5", border: `2.5px solid ${NEED_COLOR}`, color: NEED_DARK, boxShadow: `0 4px 0 ${NEED_DARK}` }}>
            <span className="text-4xl">✅</span><span>NEED</span><span className="text-xs font-bold opacity-70">Can't live without it</span>
          </button>
          <button onClick={() => handleAnswer("want")} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ background: "#FFF0F5", border: `2.5px solid ${WANT_COLOR}`, color: WANT_DARK, boxShadow: `0 4px 0 ${WANT_DARK}` }}>
            <span className="text-4xl">⭐</span><span>WANT</span><span className="text-xs font-bold opacity-70">Nice to have but not essential</span>
          </button>
        </div> : <div className="flex flex-col gap-3 pop">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fee2e2", border: `2.5px solid ${isCorrect ? NEED_COLOR : "#fca5a5"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#dc2626" }}>
              {isCorrect ? "\u2705 Correct! " : "\u274C Not quite! "}
              This is a <strong>{item.category.toUpperCase()}</strong>!
            </p>
          </div>
          <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ background: "#E8FBF5", border: `2px solid ${NEED_COLOR}` }}>
            <span className="text-lg">💡</span>
            <p className="text-sm font-extrabold text-green-800">{item.reason}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-0.5" style={{ background: NEED_COLOR, boxShadow: `0 4px 0 ${NEED_DARK}` }}>
            {current + 1 >= items.length ? "See My Score \u{1F3C6}" : "Next Item \u2192"}
          </button>
        </div>}
    </div>;
}
export {
  NeedsWantsGame as default
};
