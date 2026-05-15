import { useState } from "react";
const COLOR = "#185FA5";
const DARK = "#0e3d6e";
const BG = "#EBF6FF";
const STEPS = [
  { key: "evaporation", label: "Evaporation", emoji: "\u2600\uFE0F", color: "#FF8C00", desc: "The sun heats water in oceans, lakes, and rivers \u2014 turning it into water vapour (invisible steam) that rises up into the sky." },
  { key: "condensation", label: "Condensation", emoji: "\u2601\uFE0F", color: "#87CEEB", desc: "High in the sky, water vapour cools down and turns back into tiny water droplets \u2014 forming clouds and fog." },
  { key: "precipitation", label: "Precipitation", emoji: "\u{1F327}\uFE0F", color: "#4a90d9", desc: "When clouds become too heavy with water, the droplets fall back to Earth as rain, snow, hail, or sleet." },
  { key: "collection", label: "Collection", emoji: "\u{1F30A}", color: "#1D9E75", desc: "Rain water flows into rivers, lakes, and oceans \u2014 and soaks into the ground. Then the sun heats it up again and the cycle starts over!" }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function WaterCycleGame() {
  const [options] = useState(() => shuffle([...STEPS]));
  const [placed, setPlaced] = useState([null, null, null, null]);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const usedKeys = placed.filter(Boolean).map((p) => p.key);
  const allFilled = placed.every(Boolean);
  function handleOptionTap(key) {
    if (checked) return;
    if (usedKeys.includes(key)) {
      const idx = placed.findIndex((p) => p?.key === key);
      const newPlaced = [...placed];
      newPlaced[idx] = null;
      setPlaced(newPlaced);
      setSelected(null);
    } else {
      setSelected(key);
    }
  }
  function handleSlotTap(idx) {
    if (checked) return;
    if (placed[idx]) {
      const newPlaced = [...placed];
      newPlaced[idx] = null;
      setPlaced(newPlaced);
    } else if (selected) {
      const step = STEPS.find((s) => s.key === selected);
      const newPlaced = [...placed];
      newPlaced[idx] = step;
      setPlaced(newPlaced);
      setSelected(null);
    }
  }
  function handleCheck() {
    if (allFilled) setChecked(true);
  }
  const isCorrect = placed.every((p, i) => p?.key === STEPS[i].key);
  function handleReveal() {
    setDone(true);
  }
  function reset() {
    setPlaced([null, null, null, null]);
    setSelected(null);
    setChecked(false);
    setDone(false);
  }
  return <div className="space-y-4 font-display">
      <div className="text-center">
        <h3 className="font-extrabold text-base" style={{ color: COLOR }}>Water Cycle Sequence</h3>
        <p className="text-xs text-gray-400 font-bold">Tap a step below, then tap its position 1→4 to place it!</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => {
    const p = placed[i];
    const isRight = checked && p?.key === STEPS[i].key;
    const isWrong = checked && p && p.key !== STEPS[i].key;
    return <button
      key={i}
      onClick={() => handleSlotTap(i)}
      disabled={checked}
      className="rounded-2xl flex flex-col items-center justify-center gap-1 min-h-[80px] transition-all active:scale-95 border-2 border-dashed"
      style={{
        background: p ? isRight ? "#dcfce7" : isWrong ? "#fee2e2" : p.color + "22" : selected ? BG : "#f9f9f9",
        borderColor: p ? isRight ? "#86efac" : isWrong ? "#fca5a5" : p.color : selected ? COLOR : "#d1d5db"
      }}
    >
              <span className="text-xs font-extrabold" style={{ color: COLOR }}>{i + 1}</span>
              {p ? <>
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="text-xs font-extrabold text-center leading-tight px-1" style={{ color: p.color }}>{p.label}</span>
                  {isRight && <span className="text-green-500 text-sm">✓</span>}
                  {isWrong && <span className="text-red-400 text-sm">✗</span>}
                </> : <span className="text-xs text-gray-300 font-bold">tap to place</span>}
            </button>;
  })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {options.map((step) => {
    const isUsed = usedKeys.includes(step.key);
    const isActive = selected === step.key;
    return <button
      key={step.key}
      onClick={() => handleOptionTap(step.key)}
      disabled={checked}
      className="rounded-2xl px-3 py-3 flex items-center gap-2 transition-all active:scale-95"
      style={{ background: isUsed ? "#f3f4f6" : isActive ? step.color + "33" : "white", border: isActive ? `2.5px solid ${step.color}` : "2px solid #e5e7eb", opacity: isUsed ? 0.4 : 1, boxShadow: checked ? "none" : "0 2px 0 #d0d0d0" }}
    >
              <span className="text-2xl">{step.emoji}</span>
              <span className="text-xs font-extrabold" style={{ color: step.color }}>{step.label}</span>
            </button>;
  })}
      </div>

      {!checked && <button onClick={handleCheck} disabled={!allFilled} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: allFilled ? COLOR : "#d1d5db", boxShadow: allFilled ? `0 5px 0 ${DARK}` : "none" }}>Check My Order ✓</button>}

      {checked && !done && <div className="space-y-3">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>
              {isCorrect ? "\u{1F31F} Perfect order!" : "\u{1F4A1} Not quite \u2014 let's see the correct order!"}
            </p>
          </div>
          <button onClick={handleReveal} className="w-full font-extrabold text-lg text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>
            {isCorrect ? "Learn more \u2192" : "See correct order \u2192"}
          </button>
        </div>}

      {done && <div className="space-y-3">
          {STEPS.map((step, i) => <div key={step.key} className="rounded-2xl p-3 flex items-start gap-3" style={{ background: step.color + "18", border: `2px solid ${step.color}` }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0" style={{ background: step.color }}>{i + 1}</div>
              <div>
                <p className="font-extrabold text-sm flex items-center gap-1" style={{ color: step.color }}><span>{step.emoji}</span> {step.label}</p>
                <p className="text-xs text-gray-600 font-semibold mt-0.5">{step.desc}</p>
              </div>
            </div>)}
          <button onClick={reset} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
        </div>}
    </div>;
}
export {
  WaterCycleGame as default
};
