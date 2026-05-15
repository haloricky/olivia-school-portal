import { useState, useCallback } from "react";
const COLOR = "#854F0B";
const DARK = "#5c3507";
const PAIRS = [
  { id: "davinci", name: "Leonardo da Vinci", flag: "\u{1F1EE}\u{1F1F9}", fact: "Painted the Mona Lisa and The Last Supper; also designed flying machines, tanks, and robots \u2014 500 years before they existed!", color: "#e07c54" },
  { id: "michelangelo", name: "Michelangelo", flag: "\u{1F1EE}\u{1F1F9}", fact: "Painted the ceiling of the Sistine Chapel lying on his back for 4 years \u2014 it shows the creation of Adam and 300 other figures!", color: "#5a9ad4" },
  { id: "galileo", name: "Galileo Galilei", flag: "\u{1F1EE}\u{1F1F9}", fact: "Improved the telescope and proved that Earth orbits the Sun \u2014 not the other way around. He was put under house arrest for this idea!", color: "#d4a82e" },
  { id: "gutenberg", name: "Johannes Gutenberg", flag: "\u{1F1E9}\u{1F1EA}", fact: "Invented the printing press around 1440, making it possible to print books quickly. This spread knowledge across the whole world!", color: "#8bc34a" },
  { id: "shakespeare", name: "William Shakespeare", flag: "\u{1F1EC}\u{1F1E7}", fact: "Wrote 37 plays including Romeo and Juliet, Hamlet, and Macbeth \u2014 performed at the Globe Theatre in London", color: "#9c6fb5" },
  { id: "copernicus", name: "Nicolaus Copernicus", flag: "\u{1F1F5}\u{1F1F1}", fact: "First to prove that the Earth and all planets orbit the Sun (heliocentric model) \u2014 completely changing how humans understood the universe", color: "#e57373" }
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
    cards.push({ id: `${p.id}-name`, pairKey: p.id, label: `${p.flag} ${p.name}`, isName: true, flipped: false, matched: false });
    cards.push({ id: `${p.id}-fact`, pairKey: p.id, label: p.fact, isName: false, flipped: false, matched: false });
  });
  return shuffle(cards);
}
function InventorMatchGame() {
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
      <div className="text-7xl animate-bounce">{moves <= 8 ? "\u{1F3C6}" : "\u2B50"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: COLOR }}>{moves <= 8 ? "Renaissance Scholar!" : "Brilliant mind!"}</h3>
      <p className="font-bold text-gray-600 text-lg">All 6 matched in <span style={{ color: COLOR }}>{moves}</span> moves!</p>
      <div className="space-y-2 w-full text-left">
        {PAIRS.map((p) => <div key={p.id} className="rounded-xl p-3" style={{ background: p.color + "22", border: `1.5px solid ${p.color}` }}>
            <p className="font-extrabold text-sm" style={{ color: p.color }}>{p.flag} {p.name}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{p.fact}</p>
          </div>)}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>;
  return <div className="space-y-4 font-display">
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: COLOR }}>Renaissance Match</h3><p className="text-xs text-gray-400 font-bold">Match each genius to their famous achievement!</p></div>
        <div className="flex gap-4">
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Matched</p><p className="font-extrabold" style={{ color: COLOR }}>{matched}/6</p></div>
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Moves</p><p className="font-extrabold" style={{ color: COLOR }}>{moves}</p></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => {
    const pair = PAIRS.find((p) => p.id === card.pairKey);
    const isUp = card.flipped || card.matched;
    return <button
      key={card.id}
      onClick={() => handleFlip(card.id)}
      disabled={isUp || locked}
      className="rounded-2xl transition-all flex items-center justify-center text-center p-2 min-h-[80px]"
      style={{ background: isUp ? card.matched ? "#f0fff4" : pair.color + "22" : COLOR, border: card.matched ? "2.5px solid #86efac" : isUp ? `2px solid ${pair.color}` : `2px solid ${DARK}`, boxShadow: isUp ? "none" : `0 3px 0 ${DARK}`, cursor: isUp ? "default" : "pointer" }}
    >
              {isUp ? <span className="text-xs font-extrabold leading-tight" style={{ color: card.matched ? "#15803d" : pair.color }}>{card.label}</span> : <span className="text-2xl opacity-50">🎨</span>}
            </button>;
  })}
      </div>
      <p className="text-center text-xs text-gray-400 font-bold">Tap to flip — match each Renaissance genius to their contribution!</p>
    </div>;
}
export {
  InventorMatchGame as default
};
