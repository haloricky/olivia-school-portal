import { useState, useCallback } from "react";

const COLOR = "#993C1D";
const DARK = "#6b2610";
const BG = "#FFF3EC";

const INSTRUMENTS = [
  {
    id: "gamelan",
    name: "Gamelan",
    region: "Java & Bali",
    desc: "Bronze gong orchestra — the heartbeat of Javanese & Balinese ceremonies",
    sound: "Ding... dong... ding dong!",
    emoji: "🔔",
    color: "#C8A000",
  },
  {
    id: "angklung",
    name: "Angklung",
    region: "West Java (Sunda)",
    desc: "Bamboo shaker instrument — each one plays a single note, so everyone plays together",
    sound: "Rattle-rattle-shake!",
    emoji: "🎋",
    color: "#4CAF50",
  },
  {
    id: "kendang",
    name: "Kendang",
    region: "Java & Bali",
    desc: "Double-headed drum — keeps the rhythm in dances and gamelan performances",
    sound: "Dung! Tak! Dung dung tak!",
    emoji: "🥁",
    color: "#993C1D",
  },
  {
    id: "sasando",
    name: "Sasando",
    region: "East Nusa Tenggara",
    desc: "A unique stringed instrument made from a palm leaf and bamboo — plays like a harp",
    sound: "Plink plink... plonk...",
    emoji: "🎵",
    color: "#185FA5",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

interface Card { id: string; pairKey: string; label: string; isName: boolean; flipped: boolean; matched: boolean; }

function makeCards(): Card[] {
  const cards: Card[] = [];
  INSTRUMENTS.forEach(inst => {
    cards.push({ id: `${inst.id}-name`, pairKey: inst.id, label: inst.name, isName: true, flipped: false, matched: false });
    cards.push({ id: `${inst.id}-desc`, pairKey: inst.id, label: inst.region, isName: false, flipped: false, matched: false });
  });
  return shuffle(cards);
}

export default function InstrumentsGame() {
  const [cards, setCards] = useState<Card[]>(makeCards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const matched = cards.filter(c => c.matched).length / 2;

  const checkMatch = useCallback((ids: string[], newCards: Card[]) => {
    const [a, b] = ids.map(id => newCards.find(c => c.id === id)!);
    if (a.pairKey === b.pairKey) {
      const updated = newCards.map(c => ids.includes(c.id) ? { ...c, matched: true, flipped: true } : c);
      setCards(updated); setFlipped([]); setLocked(false); setSelected(null);
      if (updated.every(c => c.matched)) setTimeout(() => setDone(true), 400);
    } else {
      setTimeout(() => { setCards(prev => prev.map(c => ids.includes(c.id) ? { ...c, flipped: false } : c)); setFlipped([]); setLocked(false); setSelected(null); }, 1000);
    }
  }, []);

  function handleFlip(id: string) {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flipped.includes(id)) return;
    setSelected(id);
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) { setMoves(m => m + 1); setLocked(true); setTimeout(() => checkMatch(newFlipped, newCards), 300); }
  }

  function reset() { setCards(makeCards()); setFlipped([]); setLocked(false); setMoves(0); setDone(false); setSelected(null); }

  if (done) return (
    <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{moves <= 5 ? "🏆" : "⭐"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: COLOR }}>{moves <= 5 ? "Music Expert!" : "Great memory!"}</h3>
      <p className="font-bold text-gray-600 text-lg">All 4 matched in <span style={{ color: COLOR }}>{moves}</span> moves!</p>
      <div className="space-y-3 w-full text-left">
        {INSTRUMENTS.map(inst => (
          <div key={inst.id} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: BG, border: `2px solid ${inst.color}` }}>
            <span className="text-3xl flex-shrink-0">{inst.emoji}</span>
            <div>
              <p className="font-extrabold" style={{ color: inst.color }}>{inst.name} — {inst.region}</p>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">{inst.desc}</p>
              <p className="text-xs italic text-gray-400 mt-1">"{inst.sound}"</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: COLOR }}>Instruments Memory Match</h3><p className="text-xs text-gray-400 font-bold">Match each instrument to its region!</p></div>
        <div className="flex gap-4">
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Pairs</p><p className="font-extrabold" style={{ color: COLOR }}>{matched}/4</p></div>
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Moves</p><p className="font-extrabold" style={{ color: COLOR }}>{moves}</p></div>
        </div>
      </div>
      {matched > 0 && (
        <div className="flex gap-2 flex-wrap">
          {INSTRUMENTS.filter(inst => cards.find(c => c.pairKey === inst.id && c.matched)).map(inst => (
            <div key={inst.id} className="rounded-xl px-2.5 py-1 text-xs font-extrabold flex items-center gap-1" style={{ background: BG, color: inst.color, border: `1.5px solid ${inst.color}` }}>
              {inst.emoji} {inst.name}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => {
          const inst = INSTRUMENTS.find(i => i.id === card.pairKey)!;
          const isUp = card.flipped || card.matched;
          const isActive = selected === card.id;
          return (
            <button key={card.id} onClick={() => handleFlip(card.id)} disabled={isUp || locked}
              className="rounded-2xl transition-all flex flex-col items-center justify-center p-2 min-h-[90px] gap-1"
              style={{
                background: isUp ? (card.matched ? "#f0fff4" : BG) : COLOR,
                border: card.matched ? "2.5px solid #86efac" : isUp ? `2px solid ${inst.color}` : isActive ? "3px solid #fff" : `2px solid ${DARK}`,
                boxShadow: isUp ? "none" : `0 3px 0 ${DARK}`,
                cursor: isUp ? "default" : "pointer",
              }}>
              {isUp ? (
                <>
                  <span className="text-2xl">{card.isName ? inst.emoji : "📍"}</span>
                  <span className="text-xs font-extrabold text-center leading-tight" style={{ color: card.matched ? "#15803d" : inst.color }}>{card.label}</span>
                </>
              ) : (
                <span className="text-2xl opacity-40">🎵</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-gray-400 font-bold">Tap instrument name, then tap its region to match them!</p>
    </div>
  );
}
