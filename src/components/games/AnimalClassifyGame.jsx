import { useState } from "react";

const CATEGORIES = [
  { key: "mammal",    label: "Mammal",    emoji: "🐘", color: "#854F0B", bg: "#FFF9E6", desc: "Warm-blooded, has fur/hair, feeds babies milk" },
  { key: "bird",      label: "Bird",      emoji: "🦅", color: "#185FA5", bg: "#EBF6FF", desc: "Has feathers and wings, lays eggs" },
  { key: "reptile",   label: "Reptile",   emoji: "🦎", color: "#1D9E75", bg: "#E8FBF5", desc: "Scaly skin, cold-blooded, mostly lays eggs" },
  { key: "fish",      label: "Fish",      emoji: "🐟", color: "#5178c8", bg: "#EDF2FF", desc: "Lives in water, breathes through gills, has fins" },
  { key: "amphibian", label: "Amphibian", emoji: "🐸", color: "#3B6D11", bg: "#F0FBE4", desc: "Lives in water AND on land; moist skin" },
];

const ANIMALS = [
  { name: "Elephant",   emoji: "🐘", category: "mammal",    fact: "Elephants are the largest land animals — they are warm-blooded and feed their babies milk." },
  { name: "Eagle",      emoji: "🦅", category: "bird",      fact: "Eagles are birds of prey with powerful talons. They have feathers and lay eggs in huge nests." },
  { name: "Gecko",      emoji: "🦎", category: "reptile",   fact: "Geckos are small reptiles with scaly skin. They're cold-blooded and can walk on walls!" },
  { name: "Clownfish",  emoji: "🐠", category: "fish",      fact: "Clownfish (like Nemo!) live in coral reefs. They breathe through gills and have fins." },
  { name: "Frog",       emoji: "🐸", category: "amphibian", fact: "Frogs start life in water as tadpoles, then grow legs and can live on land — true amphibians!" },
  { name: "Dolphin",    emoji: "🐬", category: "mammal",    fact: "Even though dolphins live in the sea, they are mammals — they breathe air and feed their babies milk!" },
  { name: "Penguin",    emoji: "🐧", category: "bird",      fact: "Penguins are birds that can't fly, but they are AMAZING swimmers! They have feathers and lay eggs." },
  { name: "Crocodile",  emoji: "🐊", category: "reptile",   fact: "Crocodiles are ancient reptiles — they've been on Earth for 200 million years! Scaly skin, cold-blooded." },
  { name: "Shark",      emoji: "🦈", category: "fish",      fact: "Sharks are powerful fish with rows of sharp teeth. They breathe through gills and never stop swimming!" },
  { name: "Salamander", emoji: "🦎", category: "amphibian", fact: "Salamanders look like lizards but are actually amphibians — they need moist skin and live near water." },
  { name: "Bat",        emoji: "🦇", category: "mammal",    fact: "Bats are the only mammals that can truly fly! They are warm-blooded and feed their pups milk." },
  { name: "Parrot",     emoji: "🦜", category: "bird",      fact: "Parrots are intelligent birds with bright feathers. They can mimic sounds and even human words!" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

export default function AnimalClassifyGame() {
  const [animals] = useState(() => shuffle(ANIMALS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [shake, setShake] = useState(false);

  const animal = animals[current];
  const isCorrect = answered === animal.category;
  const correctCat = CATEGORIES.find(c => c.key === animal.category)!;

  function handleAnswer(key: string) {
    if (answered) return;
    const correct = key === animal.category;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setAnswered(key);
    setResults(r => [...r, correct]);
  }
  function handleNext() {
    if (current + 1 >= animals.length) setDone(true);
    else { setCurrent(c => c + 1); setAnswered(null); }
  }
  function reset() { setCurrent(0); setAnswered(null); setScore(0); setDone(false); setResults([]); }

  if (done) return (
    <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{score === animals.length ? "🏆" : score >= 9 ? "⭐" : "🐾"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: "#1D9E75" }}>{score === animals.length ? "Animal Expert!" : score >= 9 ? "Great naturalist!" : "Keep exploring!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: "#1D9E75" }}>{score}</span> out of {animals.length}!</p>
      <div className="grid grid-cols-5 gap-1.5">{results.map((r, i) => <div key={i} className="rounded-xl flex items-center justify-center text-sm w-8 h-8" style={{ background: r ? "#dcfce7" : "#fee2e2" }}>{r ? "✅" : "❌"}</div>)}</div>
      <div className="space-y-2 w-full text-left">
        {CATEGORIES.map(cat => (
          <div key={cat.key} className="rounded-xl px-3 py-2 flex items-start gap-2" style={{ background: cat.bg, border: `1.5px solid ${cat.color}` }}>
            <span className="text-xl">{cat.emoji}</span>
            <div><p className="font-extrabold text-sm" style={{ color: cat.color }}>{cat.label}</p><p className="text-xs text-gray-500 font-semibold">{cat.desc}</p></div>
          </div>
        ))}
      </div>
      <button onClick={reset} className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5" style={{ background: "#1D9E75", boxShadow: "0 5px 0 #116047" }}>Play Again 🔄</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold text-gray-700">Animal Kingdom Sort</h3><p className="text-xs text-gray-400 font-bold">Animal {current + 1} of {animals.length}</p></div>
        <div className="flex gap-1.5">{animals.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 20 : 10, height: 10, background: i < current ? (results[i] ? "#22c55e" : "#fca5a5") : i === current ? "#1D9E75" : "#e5e7eb" }} />)}</div>
      </div>
      <div className={`rounded-3xl p-5 text-center flex flex-col items-center gap-2 ${shake ? "shake" : ""}`} style={{ background: "#FAFAFA", border: "2.5px dashed #e5e7eb" }}>
        <div className="text-7xl">{animal.emoji}</div>
        <p className="font-extrabold text-2xl text-gray-800">{animal.name}</p>
        <p className="text-xs text-gray-400 font-bold">Which animal group does this belong to?</p>
      </div>
      {!answered ? (
        <div className="grid grid-cols-1 gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => handleAnswer(cat.key)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all active:scale-95 active:translate-y-0.5"
              style={{ background: cat.bg, border: `2px solid ${cat.color}`, color: cat.color, boxShadow: `0 3px 0 ${cat.color}88` }}>
              <span className="text-2xl">{cat.emoji}</span>
              <div className="text-left">
                <p className="font-extrabold">{cat.label}</p>
                <p className="text-xs opacity-70 font-semibold">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fee2e2", border: `2px solid ${isCorrect ? "#86efac" : "#fca5a5"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#dc2626" }}>
              {isCorrect ? "✅ Correct! " : `❌ It's a ${correctCat.emoji} ${correctCat.label}!`}
            </p>
          </div>
          <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ background: correctCat.bg, border: `2px solid ${correctCat.color}` }}>
            <span className="text-lg">💡</span>
            <p className="text-sm font-extrabold" style={{ color: correctCat.color }}>{animal.fact}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-0.5" style={{ background: "#1D9E75", boxShadow: "0 4px 0 #116047" }}>
            {current + 1 >= animals.length ? "See My Score 🏆" : "Next Animal →"}
          </button>
        </div>
      )}
    </div>
  );
}
