import { useState, useCallback } from "react";
const COLOR = "#854F0B";
const DARK = "#5c3507";
const BG = "#FFFAEC";
const PAIRS = [
  { id: "paper", name: "\u{1F4DC} Paper", desc: "Used to write books, draw pictures, and send letters", emoji: "\u{1F4DC}" },
  { id: "compass", name: "\u{1F9ED} Compass", desc: "Helps sailors find North and navigate the oceans", emoji: "\u{1F9ED}" },
  { id: "printing", name: "\u{1F5A8}\uFE0F Printing", desc: "Copies words onto pages so many people can read them", emoji: "\u{1F5A8}\uFE0F" },
  { id: "fireworks", name: "\u{1F386} Fireworks", desc: "Beautiful explosions of colour used in celebrations", emoji: "\u{1F386}" },
  { id: "silk", name: "\u{1F9F5} Silk", desc: "Smooth, shiny fabric made by silkworms \u2014 very precious", emoji: "\u{1F9F5}" },
  { id: "gunpowder", name: "\u{1F4A5} Gunpowder", desc: "Black powder that explodes \u2014 led to fireworks first!", emoji: "\u{1F4A5}" }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function makeCards() {
  const cards = [];
  PAIRS.forEach((p) => {
    cards.push({ id: `${p.id}-name`, pairKey: p.id, label: p.name, isName: true, flipped: false, matched: false });
    cards.push({ id: `${p.id}-desc`, pairKey: p.id, label: p.desc, isName: false, flipped: false, matched: false });
  });
  return shuffle(cards);
}
function InventionsGame() {
  const [cards, setCards] = useState(makeCards);
  const [flipped, setFlipped] = useState([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const matched = cards.filter((c) => c.matched).length / 2;
  const checkMatch = useCallback((ids, newCards) => {
    const [a, b] = ids.map((id) => newCards.find((c) => c.id === id));
    if (a.pairKey === b.pairKey) {
      const updated = newCards.map((c) => ids.includes(c.id) ? { ...c, matched: true, flipped: true } : c);
      setCards(updated);
      setFlipped([]);
      setLocked(false);
      if (updated.every((c) => c.matched)) setTimeout(() => setDone(true), 400);
    } else {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ids.includes(c.id) ? { ...c, flipped: false } : c));
        setFlipped([]);
        setLocked(false);
      }, 1e3);
    }
  }, []);
  function handleFlip(id) {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched || flipped.includes(id)) return;
    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      setTimeout(() => checkMatch(newFlipped, newCards), 300);
    }
  }
  function reset() {
    setCards(makeCards());
    setFlipped([]);
    setLocked(false);
    setMoves(0);
    setDone(false);
  }
  if (done) return <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{moves <= 7 ? "\u{1F3C6}" : "\u2B50"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: COLOR }}>{moves <= 7 ? "Brilliant Inventor!" : "Great memory!"}</h3>
      <p className="font-bold text-gray-600 text-lg">All 6 matched in <span style={{ color: COLOR }}>{moves}</span> moves!</p>
      <div className="grid grid-cols-2 gap-2 w-full text-left">
        {PAIRS.map((p) => <div key={p.id} className="rounded-xl px-3 py-2" style={{ background: BG, border: `1.5px solid ${COLOR}` }}>
            <p className="font-extrabold text-sm" style={{ color: COLOR }}>{p.name}</p>
            <p className="text-xs text-gray-500 font-semibold">{p.desc}</p>
          </div>)}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>;
  return <div className="space-y-4 font-display">
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: COLOR }}>Chinese Inventions Match</h3><p className="text-xs text-gray-400 font-bold">Match each invention to its description!</p></div>
        <div className="flex gap-4">
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Pairs</p><p className="font-extrabold" style={{ color: COLOR }}>{matched}/6</p></div>
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Moves</p><p className="font-extrabold" style={{ color: COLOR }}>{moves}</p></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => {
    const isUp = card.flipped || card.matched;
    return <button
      key={card.id}
      onClick={() => handleFlip(card.id)}
      disabled={isUp || locked}
      className="rounded-2xl transition-all flex items-center justify-center text-center p-2 min-h-[80px]"
      style={{ background: isUp ? card.matched ? "#f0fff4" : BG : COLOR, border: card.matched ? "2.5px solid #86efac" : isUp ? `2px solid ${COLOR}` : `2px solid ${DARK}`, boxShadow: isUp ? "none" : `0 3px 0 ${DARK}`, cursor: isUp ? "default" : "pointer" }}
    >
              {isUp ? <span className="text-xs font-extrabold leading-tight" style={{ color: card.matched ? "#15803d" : COLOR }}>{card.label}</span> : <span className="text-2xl opacity-50">🏺</span>}
            </button>;
  })}
      </div>
      <p className="text-center text-xs text-gray-400 font-bold">Tap to flip — match the invention with what it does!</p>
    </div>;
}
export {
  InventionsGame as default
};
