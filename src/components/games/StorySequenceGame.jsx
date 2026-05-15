import { useState } from "react";
const COLOR = "#993C1D";
const DARK = "#6b2610";
const BG = "#FFF3EC";
const TALES = [
  {
    title: "Malin Kundang (Indonesia)",
    emoji: "\u26F5",
    steps: [
      { order: 1, text: "A poor boy named Malin Kundang lives with his mother on the coast of Sumatra. They are very poor but happy." },
      { order: 2, text: "Malin travels to sea and becomes a successful, wealthy merchant. He gets married and becomes proud and arrogant." },
      { order: 3, text: "Malin returns home with his rich wife but feels ashamed of his poor mother and refuses to recognise her." },
      { order: 4, text: "Heartbroken, his mother curses him. Malin's ship is turned to stone \u2014 a famous rock formation on the coast of West Sumatra." }
    ],
    moral: "Never forget your roots and always honour your parents \u2014 no matter how successful you become."
  },
  {
    title: "Cinderella (Europe)",
    emoji: "\u{1F460}",
    steps: [
      { order: 1, text: "Cinderella lives with her cruel stepmother and stepsisters who make her do all the housework." },
      { order: 2, text: "A royal ball is announced, but Cinderella cannot go. Her fairy godmother appears and transforms her with a beautiful dress." },
      { order: 3, text: "Cinderella dances with the prince all night, but must leave before midnight when the magic will break." },
      { order: 4, text: "She loses her glass slipper fleeing. The prince searches the kingdom \u2014 it fits only Cinderella, and they live happily." }
    ],
    moral: "Kindness and goodness are rewarded. Hard work and inner beauty matter more than wealth."
  },
  {
    title: "Kancil and the Crocodiles (Indonesia)",
    emoji: "\u{1F98A}",
    steps: [
      { order: 1, text: "Kancil the clever mouse-deer is hungry and wants to cross the river to reach ripe fruit on the other side." },
      { order: 2, text: "The river is full of crocodiles. Kancil thinks of a clever plan \u2014 he tells the crocodiles the King wants to count them." },
      { order: 3, text: "The crocodiles line up in a straight row across the river. Kancil hops from back to back, counting as he crosses." },
      { order: 4, text: "Reaching the other side, Kancil laughs and tells the crocodiles he tricked them. He enjoys his delicious fruit!" }
    ],
    moral: "Intelligence and wit can solve problems that strength alone cannot."
  }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function StorySequenceGame() {
  const [taleIdx, setTaleIdx] = useState(0);
  const [options, setOptions] = useState(() => shuffle(TALES[0].steps));
  const [placed, setPlaced] = useState([null, null, null, null]);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const tale = TALES[taleIdx];
  const usedOrders = placed.filter(Boolean).map((p) => p.order);
  const allFilled = placed.every(Boolean);
  const isCorrect = placed.every((p, i) => p?.order === i + 1);
  function handleOptionTap(order) {
    if (checked) return;
    if (usedOrders.includes(order)) {
      const idx = placed.findIndex((p) => p?.order === order);
      const next = [...placed];
      next[idx] = null;
      setPlaced(next);
      setSelected(null);
    } else {
      setSelected(selected === order ? null : order);
    }
  }
  function handleSlotTap(idx) {
    if (checked) return;
    if (placed[idx]) {
      const next = [...placed];
      next[idx] = null;
      setPlaced(next);
    } else if (selected !== null) {
      const step = tale.steps.find((s) => s.order === selected);
      const next = [...placed];
      next[idx] = step;
      setPlaced(next);
      setSelected(null);
    }
  }
  function handleCheck() {
    if (allFilled) {
      if (isCorrect) setScore((s) => s + 1);
      setChecked(true);
    }
  }
  function handleNext() {
    if (taleIdx + 1 >= TALES.length) {
      setDone(true);
      return;
    }
    const nextIdx = taleIdx + 1;
    setTaleIdx(nextIdx);
    setOptions(shuffle(TALES[nextIdx].steps));
    setPlaced([null, null, null, null]);
    setSelected(null);
    setChecked(false);
  }
  function reset() {
    setTaleIdx(0);
    setOptions(shuffle(TALES[0].steps));
    setPlaced([null, null, null, null]);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setDone(false);
  }
  if (done) return <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === TALES.length ? "\u{1F3C6}" : score >= 2 ? "\u2B50" : "\u{1F4D6}"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === TALES.length ? "Storyteller!" : score >= 2 ? "Great work!" : "Keep reading!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You sequenced <span style={{ color: COLOR }}>{score}</span> out of {TALES.length} stories correctly!</p>
      <div className="space-y-3 text-left">
        {TALES.map((t) => <div key={t.title} className="rounded-2xl p-4" style={{ background: BG, border: `2px solid ${COLOR}` }}>
            <p className="font-extrabold text-base" style={{ color: COLOR }}>{t.emoji} {t.title}</p>
            <p className="text-xs text-gray-600 font-bold mt-1">💡 Moral: {t.moral}</p>
          </div>)}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>;
  return <div className="space-y-3 font-display">
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: COLOR }}>{tale.emoji} {tale.title}</h3><p className="text-xs text-gray-400 font-bold">Story {taleIdx + 1} of {TALES.length}</p></div>
        <div className="flex gap-2">{TALES.map((_, i) => <div key={i} className="rounded-full" style={{ width: 12, height: 12, background: i < taleIdx ? "#22c55e" : i === taleIdx ? COLOR : "#e5e7eb" }} />)}</div>
      </div>
      <p className="text-xs text-gray-400 font-bold text-center">Tap a story card, then tap a slot (1→4) to put the story in order!</p>

      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => {
    const p = placed[i];
    const correct = checked && p?.order === i + 1;
    const wrong = checked && p && p.order !== i + 1;
    return <button
      key={i}
      onClick={() => handleSlotTap(i)}
      disabled={checked}
      className="rounded-2xl min-h-[80px] p-2 flex flex-col items-start gap-1 transition-all active:scale-95 border-2 border-dashed text-left"
      style={{ background: p ? correct ? "#dcfce7" : wrong ? "#fee2e2" : BG : selected !== null ? "#fff7f0" : "#f9f9f9", borderColor: p ? correct ? "#86efac" : wrong ? "#fca5a5" : COLOR : selected !== null ? COLOR : "#d1d5db" }}
    >
              <span className="text-xs font-extrabold" style={{ color: COLOR }}>{i + 1}</span>
              {p ? <>
                  <p className="text-xs font-semibold text-gray-700 leading-snug">{p.text.substring(0, 60)}...</p>
                  {correct && <span className="text-green-500 text-xs">✓ Correct!</span>}
                  {wrong && <span className="text-red-400 text-xs">✗ Wrong order</span>}
                </> : <span className="text-xs text-gray-300 font-bold">tap to place</span>}
            </button>;
  })}
      </div>

      <div className="space-y-2">
        {options.map((step) => {
    const isUsed = usedOrders.includes(step.order);
    const isActive = selected === step.order;
    return <button
      key={step.order}
      onClick={() => handleOptionTap(step.order)}
      disabled={checked}
      className="w-full rounded-xl px-3 py-2 text-left transition-all active:scale-95"
      style={{ background: isUsed ? "#f3f4f6" : isActive ? BG : "white", border: isActive ? `2.5px solid ${COLOR}` : "2px solid #e5e7eb", opacity: isUsed ? 0.4 : 1, boxShadow: checked ? "none" : "0 2px 0 #d0d0d0" }}
    >
              <p className="text-xs font-semibold text-gray-700 leading-snug">{step.text}</p>
            </button>;
  })}
      </div>

      {!checked ? <button onClick={handleCheck} disabled={!allFilled} className="w-full font-extrabold text-lg text-white py-3.5 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: allFilled ? COLOR : "#d1d5db", boxShadow: allFilled ? `0 5px 0 ${DARK}` : "none" }}>Check Story Order ✓</button> : <div className="space-y-2">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
            <p className="font-extrabold text-base" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "\u{1F31F} Perfect!" : "\u{1F4A1} The correct order was 1\u21922\u21923\u21924!"}</p>
            <p className="text-xs text-gray-600 font-bold mt-1">💡 Moral: {tale.moral}</p>
          </div>
          <button onClick={handleNext} className="w-full font-extrabold text-lg text-white py-3.5 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>
            {taleIdx + 1 >= TALES.length ? "See My Score \u{1F3C6}" : "Next Story \u2192"}
          </button>
        </div>}
    </div>;
}
export {
  StorySequenceGame as default
};
