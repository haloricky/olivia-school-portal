import { useState, useCallback } from "react";

const COLOR = "#993C1D";
const DARK = "#6b2610";

const PAIRS = [
  { id: "saman",   name: "Saman",    origin: "Aceh, Sumatra",      fact: "Lightning-fast hand claps, chest slaps, and perfectly synchronised movements — sometimes 100 dancers move as one!", color: "#e07c54" },
  { id: "kecak",   name: "Kecak",    origin: "Bali",               fact: "Performed by a circle of men chanting 'cak-cak-cak' — it tells the story of Ramayana with no musical instruments!", color: "#FF8C00" },
  { id: "pendet",  name: "Pendet",   origin: "Bali",               fact: "A sacred welcoming dance performed by women carrying flower-filled bowls as offerings to the gods", color: "#DDA0DD" },
  { id: "reog",    name: "Reog Ponorogo", origin: "East Java",     fact: "A spectacular dance featuring a giant tiger/peacock mask — some masks weigh over 50kg and are balanced on the dancer's teeth!", color: "#FF6B6B" },
  { id: "tortor",  name: "Tor-Tor",  origin: "North Sumatra (Batak)", fact: "A traditional Batak ceremonial dance where the movements of hands and feet communicate messages to ancestors", color: "#5a9ad4" },
  { id: "jaipong", name: "Jaipong",  origin: "West Java (Sundanese)", fact: "A lively, energetic dance featuring playful footwork and movements inspired by traditional Sundanese martial arts", color: "#8bc34a" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

interface Card { id: string; pairKey: string; label: string; isName: boolean; flipped: boolean; matched: boolean; }

function makeCards(): Card[] {
  const cards: Card[] = [];
  PAIRS.forEach(p => {
    cards.push({ id: `${p.id}-name`, pairKey: p.id, label: `💃 ${p.name}`, isName: true, flipped: false, matched: false });
    cards.push({ id: `${p.id}-orig`, pairKey: p.id, label: `📍 ${p.origin}`, isName: false, flipped: false, matched: false });
  });
  return shuffle(cards);
}

export default function DanceMatchGame() {
  const [cards, setCards] = useState<Card[]>(makeCards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  const matched = cards.filter(c => c.matched).length / 2;

  const checkMatch = useCallback((ids: string[], newCards: Card[]) => {
    const [a, b] = ids.map(id => newCards.find(c => c.id === id)!);
    if (a.pairKey === b.pairKey) {
      const updated = newCards.map(c => ids.includes(c.id) ? { ...c, matched: true, flipped: true } : c);
      setCards(updated); setFlipped([]); setLocked(false);
      if (updated.every(c => c.matched)) setTimeout(() => setDone(true), 400);
    } else {
      setTimeout(() => { setCards(prev => prev.map(c => ids.includes(c.id) ? { ...c, flipped: false } : c)); setFlipped([]); setLocked(false); }, 1000);
    }
  }, []);

  function handleFlip(id: string) {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flipped.includes(id)) return;
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) { setMoves(m => m + 1); setLocked(true); setTimeout(() => checkMatch(newFlipped, newCards), 300); }
  }

  function reset() { setCards(makeCards()); setFlipped([]); setLocked(false); setMoves(0); setDone(false); }

  if (done) return (
    <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{moves <= 8 ? "🏆" : "⭐"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: COLOR }}>{moves <= 8 ? "Cultural Star!" : "Well done, dancer!"}</h3>
      <p className="font-bold text-gray-600 text-lg">All 6 dances matched in <span style={{ color: COLOR }}>{moves}</span> moves!</p>
      <div className="space-y-2 w-full text-left">
        {PAIRS.map(p => (
          <div key={p.id} className="rounded-xl p-3" style={{ background: p.color + "22", border: `1.5px solid ${p.color}` }}>
            <p className="font-extrabold text-sm" style={{ color: p.color }}>💃 {p.name} — 📍 {p.origin}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{p.fact}</p>
          </div>
        ))}
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Play Again 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold" style={{ color: COLOR }}>Indonesian Dance Match</h3><p className="text-xs text-gray-400 font-bold">Match each dance to its home region!</p></div>
        <div className="flex gap-4">
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Matched</p><p className="font-extrabold" style={{ color: COLOR }}>{matched}/6</p></div>
          <div className="text-center"><p className="text-xs text-gray-400 font-bold">Moves</p><p className="font-extrabold" style={{ color: COLOR }}>{moves}</p></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cards.map(card => {
          const pair = PAIRS.find(p => p.id === card.pairKey)!;
          const isUp = card.flipped || card.matched;
          return (
            <button key={card.id} onClick={() => handleFlip(card.id)} disabled={isUp || locked}
              className="rounded-2xl transition-all flex items-center justify-center text-center p-2 min-h-[80px]"
              style={{ background: isUp ? (card.matched ? "#f0fff4" : pair.color + "22") : COLOR, border: card.matched ? "2.5px solid #86efac" : isUp ? `2px solid ${pair.color}` : `2px solid ${DARK}`, boxShadow: isUp ? "none" : `0 3px 0 ${DARK}`, cursor: isUp ? "default" : "pointer" }}>
              {isUp ? (
                <span className="text-xs font-extrabold leading-tight" style={{ color: card.matched ? "#15803d" : pair.color }}>{card.label}</span>
              ) : (
                <span className="text-2xl opacity-50">🥁</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-gray-400 font-bold">Tap to flip — match each dance name to its island of origin!</p>
    </div>
  );
}
