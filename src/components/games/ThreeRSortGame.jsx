import { useState } from "react";
const CATEGORIES = [
  { key: "reduce", label: "Reduce", emoji: "\u{1F4C9}", color: "#1D9E75", dark: "#116047", bg: "#E8FBF5", desc: "Use LESS \u2014 buy less, use less energy, create less waste" },
  { key: "reuse", label: "Reuse", emoji: "\u267B\uFE0F", color: "#185FA5", dark: "#0e3d6e", bg: "#EBF6FF", desc: "Use things AGAIN \u2014 don't throw away what can be used again" },
  { key: "recycle", label: "Recycle", emoji: "\u{1F5C2}\uFE0F", color: "#534AB7", dark: "#2f2880", bg: "#F0EEFF", desc: "Turn old materials INTO new things \u2014 paper, glass, plastic, metal" }
];
const ITEMS = [
  { label: "Turn off lights when you leave a room", emoji: "\u{1F4A1}", category: "reduce", reason: "Using less electricity means fewer fossil fuels are burned. One small habit, multiplied by millions of people, makes a huge difference!" },
  { label: "Refill your water bottle instead of buying a new one", emoji: "\u{1F376}", category: "reuse", reason: "A reusable water bottle can replace up to 500 single-use plastic bottles per year! That's a lot of plastic kept out of the ocean." },
  { label: "Put paper in the recycling bin instead of the rubbish", emoji: "\u{1F4F0}", category: "recycle", reason: "Recycling one tonne of paper saves 17 trees! Paper can be recycled up to 7 times before the fibres become too short to reuse." },
  { label: "Walk or cycle to nearby places instead of driving", emoji: "\u{1F6B2}", category: "reduce", reason: "Cars produce CO\u2082 that heats up our planet. Walking and cycling create zero emissions \u2014 and they're great exercise too!" },
  { label: "Use your old t-shirt as a cleaning rag", emoji: "\u{1F455}", category: "reuse", reason: "Before throwing away worn-out clothes, think: can it become something else? Old t-shirts make fantastic cleaning cloths!" },
  { label: "Put glass jars in the recycling bin", emoji: "\u{1FAD9}", category: "recycle", reason: "Glass can be recycled endlessly without losing quality! Recycling glass saves up to 30% of the energy needed to make new glass." },
  { label: "Take a shorter shower to use less water", emoji: "\u{1F6BF}", category: "reduce", reason: "A 2-minute shorter shower saves 10 litres of water! Over a year, that's 3,650 litres saved \u2014 enough to fill a small swimming pool." },
  { label: "Use a cloth shopping bag instead of plastic bags", emoji: "\u{1F45C}", category: "reuse", reason: "One reusable cloth bag can replace over 1,000 plastic bags in its lifetime. Plastic bags can take 1,000 years to decompose!" },
  { label: "Separate aluminium cans from general rubbish", emoji: "\u{1F96B}", category: "recycle", reason: "Recycling aluminium uses 95% LESS energy than making new aluminium from raw materials. And it can be recycled over and over!" },
  { label: "Eat all the food on your plate \u2014 waste nothing", emoji: "\u{1F37D}\uFE0F", category: "reduce", reason: "Food waste creates methane gas in landfills \u2014 a powerful greenhouse gas. Eating what you take is one of the easiest ways to help the planet!" },
  { label: "Donate old books to a library or school", emoji: "\u{1F4DA}", category: "reuse", reason: "Books can be read by dozens of people! Donating means your books go on bringing joy and knowledge instead of sitting in the rubbish bin." },
  { label: "Put plastic bottles in the recycling bin", emoji: "\u{1F9F4}", category: "recycle", reason: "Plastic bottles can be recycled into new bottles, clothing, or even park benches! Always check the recycling symbol on the bottom." }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function ThreeRSortGame() {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState([]);
  const [shake, setShake] = useState(false);
  const item = items[current];
  const isCorrect = answered === item.category;
  const correctCat = CATEGORIES.find((c) => c.key === item.category);
  function handleAnswer(key) {
    if (answered) return;
    const correct = key === item.category;
    if (correct) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setAnswered(key);
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
  if (done) return <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{score === items.length ? "\u{1F3C6}" : score >= 9 ? "\u2B50" : "\u{1F30D}"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: "#1D9E75" }}>{score === items.length ? "Eco Champion!" : score >= 9 ? "Planet Hero!" : "Keep saving Earth!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: "#1D9E75" }}>{score}</span> out of {items.length}!</p>
      <div className="grid grid-cols-4 gap-1.5">{results.map((r, i) => <div key={i} className="rounded-xl flex items-center justify-center text-sm py-2" style={{ background: r ? "#dcfce7" : "#fee2e2" }}>{r ? "\u2705" : "\u274C"}</div>)}</div>
      <div className="space-y-2 w-full text-left">
        {CATEGORIES.map((cat) => <div key={cat.key} className="rounded-xl px-3 py-2 flex items-start gap-2" style={{ background: cat.bg, border: `1.5px solid ${cat.color}` }}>
            <span className="text-2xl">{cat.emoji}</span>
            <div><p className="font-extrabold text-sm" style={{ color: cat.color }}>{cat.label}</p><p className="text-xs text-gray-500 font-semibold">{cat.desc}</p></div>
          </div>)}
      </div>
      <button onClick={reset} className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5" style={{ background: "#1D9E75", boxShadow: "0 5px 0 #116047" }}>Play Again 🔄</button>
    </div>;
  return <div className="flex flex-col gap-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} .pop{animation:pop 0.25s ease;} @keyframes pop{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold text-gray-700">Reduce, Reuse, Recycle!</h3><p className="text-xs text-gray-400 font-bold">Action {current + 1} of {items.length}</p></div>
        <div className="flex gap-1">{items.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 18 : 8, height: 8, background: i < current ? results[i] ? "#22c55e" : "#fca5a5" : i === current ? "#1D9E75" : "#e5e7eb" }} />)}</div>
      </div>
      <div className={`rounded-3xl p-5 text-center flex flex-col items-center gap-3 ${shake ? "shake" : ""}`} style={{ background: "#FAFAFA", border: "2.5px dashed #e5e7eb" }}>
        <div className="text-6xl">{item.emoji}</div>
        <p className="font-extrabold text-gray-800 text-base leading-snug max-w-xs">{item.label}</p>
        <p className="text-xs text-gray-400 font-bold">Is this Reduce, Reuse, or Recycle?</p>
      </div>
      {!answered ? <div className="grid grid-cols-1 gap-2.5">
          {CATEGORIES.map((cat) => <button
    key={cat.key}
    onClick={() => handleAnswer(cat.key)}
    className="flex items-center gap-4 px-5 py-4 rounded-2xl font-extrabold text-base transition-all active:scale-95 active:translate-y-0.5"
    style={{ background: cat.bg, border: `2.5px solid ${cat.color}`, color: cat.dark, boxShadow: `0 4px 0 ${cat.dark}` }}
  >
              <span className="text-3xl">{cat.emoji}</span>
              <div className="text-left">
                <p className="font-extrabold text-lg" style={{ color: cat.color }}>{cat.label}</p>
                <p className="text-xs font-semibold opacity-70">{cat.desc}</p>
              </div>
            </button>)}
        </div> : <div className="flex flex-col gap-3 pop">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fee2e2", border: `2.5px solid ${isCorrect ? correctCat.color : "#fca5a5"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#dc2626" }}>
              {isCorrect ? `\u2705 Correct! That's ${correctCat.emoji} ${correctCat.label}!` : `\u274C That's ${correctCat.emoji} ${correctCat.label}!`}
            </p>
          </div>
          <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ background: correctCat.bg, border: `2px solid ${correctCat.color}` }}>
            <span className="text-lg">💡</span>
            <p className="text-sm font-extrabold" style={{ color: correctCat.dark }}>{item.reason}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-0.5" style={{ background: "#1D9E75", boxShadow: "0 4px 0 #116047" }}>
            {current + 1 >= items.length ? "See My Score \u{1F3C6}" : "Next Action \u2192"}
          </button>
        </div>}
    </div>;
}
export {
  ThreeRSortGame as default
};
