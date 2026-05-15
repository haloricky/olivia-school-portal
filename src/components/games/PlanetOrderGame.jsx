import { useState } from "react";

const COLOR = "#185FA5";
const DARK = "#0e3d6e";
const BG = "#EBF6FF";

const PLANETS = [
  { key: "mercury", name: "Mercury", emoji: "⚫", color: "#9E9E9E", desc: "Closest to the Sun — tiny, grey, and extremely hot in the day, freezing at night" },
  { key: "venus",   name: "Venus",   emoji: "🟡", color: "#FFD700", desc: "The hottest planet — covered in thick clouds that trap heat like a giant greenhouse" },
  { key: "earth",   name: "Earth",   emoji: "🌍", color: "#1D9E75", desc: "Our home! The only known planet with liquid water, air to breathe, and life" },
  { key: "mars",    name: "Mars",    emoji: "🔴", color: "#E53935", desc: "The Red Planet — covered in red dust and iron oxide. Scientists are planning to send humans here!" },
  { key: "jupiter", name: "Jupiter", emoji: "🟠", color: "#FF8C00", desc: "The largest planet — so big that 1,300 Earths could fit inside it! Has a giant storm called the Great Red Spot" },
  { key: "saturn",  name: "Saturn",  emoji: "🪐", color: "#C4A35A", desc: "Famous for its beautiful rings made of ice and rock. Saturn is so light it would float on water!" },
  { key: "uranus",  name: "Uranus",  emoji: "🔵", color: "#5aa0bd", desc: "An ice giant that spins on its side! It takes 84 Earth years to orbit the Sun once" },
  { key: "neptune", name: "Neptune", emoji: "💙", color: "#3F51B5", desc: "The furthest planet — so far that sunlight takes 4 hours to reach it. Winds reach 2,100 km/h!" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

export default function PlanetOrderGame() {
  const [options] = useState(() => shuffle([...PLANETS]));
  const [placed, setPlaced] = useState<(typeof PLANETS[0] | null)[]>(Array(8).fill(null));
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const usedKeys = placed.filter(Boolean).map(p => p!.key);
  const allFilled = placed.every(Boolean);

  function handleOptionTap(key: string) {
    if (checked) return;
    if (usedKeys.includes(key)) {
      const idx = placed.findIndex(p => p?.key === key);
      const next = [...placed]; next[idx] = null; setPlaced(next);
      setSelected(null);
    } else {
      setSelected(selected === key ? null : key);
    }
  }

  function handleSlotTap(idx: number) {
    if (checked) return;
    if (placed[idx]) {
      const next = [...placed]; next[idx] = null; setPlaced(next);
    } else if (selected) {
      const planet = PLANETS.find(p => p.key === selected)!;
      const next = [...placed]; next[idx] = planet; setPlaced(next);
      setSelected(null);
    }
  }

  function handleCheck() { if (allFilled) setChecked(true); }
  const isCorrect = placed.every((p, i) => p?.key === PLANETS[i].key);
  function reset() { setPlaced(Array(8).fill(null)); setSelected(null); setChecked(false); setDone(false); }

  return (
    <div className="space-y-3 font-display">
      <div className="text-center">
        <h3 className="font-extrabold text-base" style={{ color: COLOR }}>Order the Planets!</h3>
        <p className="text-xs text-gray-400 font-bold">Tap a planet, then tap slot 1–8 to place it from closest to furthest from the Sun ☀️</p>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => {
          const p = placed[i];
          const correct = checked && p?.key === PLANETS[i].key;
          const wrong = checked && p && p.key !== PLANETS[i].key;
          return (
            <button key={i} onClick={() => handleSlotTap(i)} disabled={checked}
              className="rounded-2xl flex flex-col items-center justify-center gap-0.5 min-h-[72px] transition-all active:scale-95 border-2 border-dashed"
              style={{ background: p ? (correct ? "#dcfce7" : wrong ? "#fee2e2" : p.color + "22") : selected ? BG : "#f9f9f9", borderColor: p ? (correct ? "#86efac" : wrong ? "#fca5a5" : p.color) : selected ? COLOR : "#d1d5db" }}>
              <span className="text-[10px] font-extrabold" style={{ color: COLOR }}>{i + 1}</span>
              {p ? (
                <>
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-[9px] font-extrabold text-center px-0.5 leading-tight" style={{ color: p.color }}>{p.name}</span>
                  {correct && <span className="text-green-500 text-xs">✓</span>}
                  {wrong && <span className="text-red-400 text-xs">✗</span>}
                </>
              ) : <span className="text-[9px] text-gray-300 font-bold">tap</span>}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {options.map(planet => {
          const isUsed = usedKeys.includes(planet.key);
          const isActive = selected === planet.key;
          return (
            <button key={planet.key} onClick={() => handleOptionTap(planet.key)} disabled={checked}
              className="rounded-2xl px-2 py-2.5 flex flex-col items-center gap-1 transition-all active:scale-95"
              style={{ background: isUsed ? "#f3f4f6" : isActive ? planet.color + "33" : "white", border: isActive ? `2.5px solid ${planet.color}` : "2px solid #e5e7eb", opacity: isUsed ? 0.35 : 1, boxShadow: checked ? "none" : "0 2px 0 #d0d0d0" }}>
              <span className="text-xl">{planet.emoji}</span>
              <span className="text-[9px] font-extrabold" style={{ color: planet.color }}>{planet.name}</span>
            </button>
          );
        })}
      </div>

      {!checked && (
        <button onClick={handleCheck} disabled={!allFilled} className="w-full font-extrabold text-lg text-white py-3.5 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: allFilled ? COLOR : "#d1d5db", boxShadow: allFilled ? `0 5px 0 ${DARK}` : "none" }}>Check My Order ✓</button>
      )}

      {checked && !done && (
        <div className="space-y-2">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>
              {isCorrect ? "🌟 Perfect order!" : "💡 Not quite! Let's see the correct order!"}
            </p>
          </div>
          <button onClick={() => setDone(true)} className="w-full font-extrabold text-lg text-white py-3.5 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>
            {isCorrect ? "Learn more →" : "See all planets →"}
          </button>
        </div>
      )}

      {done && (
        <div className="space-y-2">
          {PLANETS.map((p, i) => (
            <div key={p.key} className="rounded-2xl p-3 flex items-start gap-3" style={{ background: p.color + "18", border: `2px solid ${p.color}` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0" style={{ background: p.color }}>{i + 1}</div>
              <div>
                <p className="font-extrabold text-sm flex items-center gap-1" style={{ color: p.color }}><span>{p.emoji}</span> {p.name}</p>
                <p className="text-xs text-gray-600 font-semibold mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
          <button onClick={reset} className="w-full font-extrabold text-lg text-white py-3.5 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}
