import { useState } from "react";

const COLOR = "#185FA5";
const DARK = "#0e3d6e";
const BG = "#EBF6FF";

const PARTS = [
  {
    key: "roots", label: "Roots", emoji: "🌱",
    description: "Underground fingers that suck up water and minerals from the soil",
    question: "Which part soaks up water and minerals from the soil?",
    choices: ["Roots", "Stem", "Leaf", "Flower"],
    highlight: "bottom",
    fact: "A single plant can have millions of tiny root hairs! They spread out like a net underground to collect as much water as possible.",
  },
  {
    key: "stem", label: "Stem", emoji: "🪵",
    description: "The plant's backbone — carries water up from the roots to the leaves",
    question: "Which part carries water from the roots up to the leaves?",
    choices: ["Flower", "Roots", "Stem", "Leaf"],
    highlight: "middle",
    fact: "If you put a white flower in coloured water, you can watch the stem carry the colour up into the petals! Try it with a white carnation.",
  },
  {
    key: "leaf", label: "Leaf", emoji: "🍃",
    description: "The plant's solar panel — catches sunlight to make food",
    question: "Which part captures sunlight to make the plant's food?",
    choices: ["Stem", "Roots", "Flower", "Leaf"],
    highlight: "left",
    fact: "Leaves are full of green stuff called chlorophyll. It's what makes plants green AND what catches sunlight to cook up food for the plant!",
  },
  {
    key: "flower", label: "Flower", emoji: "🌸",
    description: "The colourful part that attracts bees and butterflies to spread pollen",
    question: "Which part attracts bees and butterflies to help the plant grow seeds?",
    choices: ["Leaf", "Flower", "Roots", "Stem"],
    highlight: "top",
    fact: "Bees visit flowers to collect nectar (a sweet liquid) and accidentally carry pollen on their fuzzy bodies to other flowers — making new seeds!",
  },
  {
    key: "photosynthesis", label: "Photosynthesis", emoji: "☀️",
    description: "The plant's recipe: sunlight + water + air = food + oxygen for us to breathe!",
    question: "What is the name of the process plants use to make their own food from sunlight?",
    choices: ["Photosynthesis", "Hibernation", "Evaporation", "Respiration"],
    highlight: "all",
    fact: "Without photosynthesis there would be no life on Earth! Plants produce all the oxygen we breathe as a by-product of cooking their food.",
  },
];

export default function PlantGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const part = PARTS[current];
  const isCorrect = selected === part.label || selected === "Photosynthesis";

  function handleSelect(c: string) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === part.choices[PARTS[current].choices.indexOf(part.label !== "Photosynthesis" ? part.label : "Photosynthesis")];
    const actualCorrect = part.choices.find((_, i) => i === 0) === selected
      ? part.choices[0] === part.label || part.choices[0] === "Photosynthesis"
      : selected === part.label || selected === "Photosynthesis";
    const trueCorrect = selected === part.label || (part.key === "photosynthesis" && selected === "Photosynthesis");
    if (trueCorrect) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
  }
  function handleNext() {
    if (current + 1 >= PARTS.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); }

  const correctAnswer = part.key === "photosynthesis" ? "Photosynthesis" : part.label;
  const isSelectedCorrect = selected === correctAnswer;

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === PARTS.length ? "🏆" : score >= 3 ? "🌿" : "🌱"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === PARTS.length ? "Plant Expert!" : "Well done!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {PARTS.length}!</p>
      <div className="rounded-2xl p-4 text-left space-y-2" style={{ background: BG, border: `2px solid ${COLOR}` }}>
        {PARTS.map(p => (
          <div key={p.key} className="flex items-start gap-2">
            <span className="text-xl">{p.emoji}</span>
            <div><p className="font-extrabold text-sm" style={{ color: COLOR }}>{p.key === "photosynthesis" ? "Photosynthesis" : p.label}</p><p className="text-xs text-gray-500 font-semibold">{p.description}</p></div>
          </div>
        ))}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again! 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">{PARTS.map((_, i) => <div key={i} className="rounded-full transition-all" style={{ width: i === current ? 24 : 12, height: 12, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{PARTS.length}</span>
      </div>
      <div className="rounded-2xl p-4 text-center" style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="text-5xl mb-2">{part.emoji}</div>
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{part.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {part.choices.map((choice, idx) => {
          const isWrong = confirmed && choice === selected && !isSelectedCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === correctAnswer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className={`rounded-2xl px-3 py-4 font-extrabold text-sm flex flex-col items-center gap-1 text-center transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              <span className="text-2xl">{["🌱","🪵","🍃","🌸","☀️"][idx] ?? "🌿"}</span>
              {choice}
              {confirmed && choice === correctAnswer && <span className="text-green-500">✓</span>}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isSelectedCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isSelectedCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isSelectedCorrect ? "🌟" : "💡"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isSelectedCorrect ? "#15803d" : "#c2410c" }}>{isSelectedCorrect ? "Correct!" : `Answer: ${correctAnswer}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{part.fact}</p></div>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={!selected} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected ? COLOR : "#d1d5db", boxShadow: selected ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= PARTS.length ? "See My Score 🏆" : "Next Part →"}</button>
      )}
    </div>
  );
}
