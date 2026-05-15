import { useState, useCallback } from "react";
const PATTERNS = [
  {
    id: "cirebon",
    name: "Cirebon",
    label: "Cirebon Clouds",
    bg: "#E8F4F8",
    color: "#4a90c0",
    render: (size) => <svg width={size} height={size} viewBox="0 0 80 80">
        <rect width="80" height="80" fill="#E8F4F8" />
        {[{ cx: 20, cy: 20 }, { cx: 55, cy: 25 }, { cx: 15, cy: 55 }, { cx: 60, cy: 60 }, { cx: 38, cy: 40 }].map((p, i) => <g key={i}>
            <circle cx={p.cx} cy={p.cy} r={10} fill="none" stroke="#4a90c0" strokeWidth="2" />
            <circle cx={p.cx} cy={p.cy} r={5} fill="#4a90c0" opacity={0.3} />
          </g>)}
        <path d="M5,40 Q20,30 35,40 Q50,50 65,40" stroke="#4a90c0" strokeWidth="1.5" fill="none" opacity={0.5} />
      </svg>
  },
  {
    id: "jogja",
    name: "Yogyakarta",
    label: "Jogja Parang",
    bg: "#FDF5E6",
    color: "#8B6914",
    render: (size) => <svg width={size} height={size} viewBox="0 0 80 80">
        <rect width="80" height="80" fill="#FDF5E6" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <g key={i}>
            <path d={`M ${-10 + i * 20} 0 L ${10 + i * 20} 80`} stroke="#8B6914" strokeWidth="3" opacity={0.7} />
            <path d={`M ${-10 + i * 20} 0 L ${-5 + i * 20} 80`} stroke="#DAA520" strokeWidth="1" opacity={0.5} />
          </g>)}
        {[0, 1, 2, 3].map((i) => <rect key={i} x={5 + i * 18} y={15 + i % 2 * 25} width={8} height={8} fill="#8B6914" opacity={0.6} rx="2" transform={`rotate(45 ${9 + i * 18} ${19 + i % 2 * 25})`} />)}
      </svg>
  },
  {
    id: "pekalongan",
    name: "Pekalongan",
    label: "Pekalongan Flowers",
    bg: "#FFF9F0",
    color: "#FF6B35",
    render: (size) => <svg width={size} height={size} viewBox="0 0 80 80">
        <rect width="80" height="80" fill="#FFF9F0" />
        {[{ x: 15, y: 15, c: "#FF6B35" }, { x: 55, y: 15, c: "#FFD700" }, { x: 15, y: 55, c: "#90EE90" }, { x: 55, y: 55, c: "#FF85A1" }, { x: 35, y: 35, c: "#DDA0DD" }].map((f, i) => <g key={i}>
            {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx={f.x + Math.cos(angle * Math.PI / 180) * 7} cy={f.y + Math.sin(angle * Math.PI / 180) * 7} rx={5} ry={3} fill={f.c} opacity={0.85} transform={`rotate(${angle} ${f.x + Math.cos(angle * Math.PI / 180) * 7} ${f.y + Math.sin(angle * Math.PI / 180) * 7})`} />)}
            <circle cx={f.x} cy={f.y} r={4} fill={f.c} />
          </g>)}
      </svg>
  },
  {
    id: "solo",
    name: "Solo",
    label: "Solo Kawung",
    bg: "#FFFDE7",
    color: "#C8A000",
    render: (size) => <svg width={size} height={size} viewBox="0 0 80 80">
        <rect width="80" height="80" fill="#FFFDE7" />
        {[[20, 20], [60, 20], [20, 60], [60, 60], [40, 40]].map(([cx, cy], i) => <g key={i}>
            <ellipse cx={cx - 8} cy={cy} rx={7} ry={4} fill="none" stroke="#C8A000" strokeWidth="1.5" />
            <ellipse cx={cx + 8} cy={cy} rx={7} ry={4} fill="none" stroke="#C8A000" strokeWidth="1.5" />
            <ellipse cx={cx} cy={cy - 8} rx={4} ry={7} fill="none" stroke="#C8A000" strokeWidth="1.5" />
            <ellipse cx={cx} cy={cy + 8} rx={4} ry={7} fill="none" stroke="#C8A000" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r={3} fill="#C8A000" opacity={0.6} />
          </g>)}
      </svg>
  }
];
function createCards() {
  const cards = [];
  PATTERNS.forEach((p, idx) => {
    cards.push({ id: `${p.id}-a`, patternIdx: idx, pairKey: p.id, flipped: false, matched: false });
    cards.push({ id: `${p.id}-b`, patternIdx: idx, pairKey: p.id, flipped: false, matched: false });
  });
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
function BatikGame() {
  const [cards, setCards] = useState(createCards);
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [locked, setLocked] = useState(false);
  const matchedCount = cards.filter((c) => c.matched).length / 2;
  const checkMatch = useCallback((ids, newCards) => {
    const [a, b] = ids.map((id) => newCards.find((c) => c.id === id));
    if (a.pairKey === b.pairKey) {
      const updated = newCards.map((c) => ids.includes(c.id) ? { ...c, matched: true, flipped: true } : c);
      setCards(updated);
      setFlippedIds([]);
      setLocked(false);
      if (updated.every((c) => c.matched)) setTimeout(() => setDone(true), 400);
    } else {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ids.includes(c.id) ? { ...c, flipped: false } : c));
        setFlippedIds([]);
        setLocked(false);
      }, 1e3);
    }
  }, []);
  const handleFlip = (id) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (flippedIds.includes(id)) return;
    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      setTimeout(() => checkMatch(newFlipped, newCards), 300);
    }
  };
  const handleReset = () => {
    setCards(createCards());
    setFlippedIds([]);
    setMoves(0);
    setDone(false);
    setLocked(false);
  };
  if (done) {
    const rating = moves <= 5 ? "\u{1F3C6} Amazing Memory!" : moves <= 8 ? "\u2B50 Great job!" : "\u{1F31F} Well done!";
    return <div className="flex flex-col items-center gap-5 py-4 text-center" style={{ fontFamily: "Nunito, sans-serif" }}>
        <div className="text-7xl animate-bounce">{moves <= 5 ? "\u{1F3C6}" : "\u2B50"}</div>
        <h3 className="font-extrabold text-2xl" style={{ color: "#8B1A4A" }}>{rating}</h3>
        <p className="font-bold text-gray-600 text-lg">You matched all 4 pairs in <span style={{ color: "#8B1A4A" }}>{moves}</span> moves!</p>
        <div className="grid grid-cols-2 gap-3 w-full">
          {PATTERNS.map((p) => <div
      key={p.id}
      className="rounded-2xl p-3 flex items-center gap-3"
      style={{ backgroundColor: p.bg, border: `2px solid ${p.color}` }}
    >
              <div className="rounded-xl overflow-hidden flex-shrink-0">{p.render(44)}</div>
              <div className="text-left">
                <p className="font-extrabold text-xs" style={{ color: p.color }}>{p.name}</p>
                <p className="text-xs text-gray-500 font-bold">{p.label}</p>
              </div>
            </div>)}
        </div>
        <button
      onClick={handleReset}
      className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5"
      style={{ backgroundColor: "#8B1A4A", boxShadow: "0 5px 0 #5a0e2e" }}
    >
          Play Again 🔄
        </button>
      </div>;
  }
  return <div className="flex flex-col gap-4" style={{ fontFamily: "Nunito, sans-serif" }}>
      <style>{`@keyframes flip-in{from{transform:rotateY(90deg);opacity:0.3}to{transform:rotateY(0deg);opacity:1}} .flip-in{animation:flip-in 0.25s ease;} @keyframes matched-glow{0%,100%{box-shadow:0 0 0 0 #DAA52066}50%{box-shadow:0 0 0 8px #DAA52044}} .matched{animation:matched-glow 0.5s ease;}`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold" style={{ color: "#8B1A4A" }}>Batik Memory Match</h3>
          <p className="text-xs text-gray-400 font-bold">Find all 4 matching pairs!</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-bold">Pairs</p>
            <p className="font-extrabold" style={{ color: "#8B1A4A" }}>{matchedCount}/4</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-bold">Moves</p>
            <p className="font-extrabold" style={{ color: "#8B1A4A" }}>{moves}</p>
          </div>
        </div>
      </div>

      {
    /* Matched pairs label */
  }
      {matchedCount > 0 && <div className="flex gap-2 flex-wrap">
          {PATTERNS.filter((p) => cards.find((c) => c.pairKey === p.id && c.matched)).map((p) => <div
    key={p.id}
    className="rounded-xl px-2.5 py-1 text-xs font-extrabold"
    style={{ backgroundColor: p.bg, color: p.color, border: `1.5px solid ${p.color}` }}
  >
              ✅ {p.name}
            </div>)}
        </div>}

      {
    /* Card grid */
  }
      <div className="grid grid-cols-4 gap-2.5">
        {cards.map((card) => {
    const pattern = PATTERNS[card.patternIdx];
    const isUp = card.flipped || card.matched;
    return <button
      key={card.id}
      onClick={() => handleFlip(card.id)}
      disabled={isUp || locked}
      className={`aspect-square rounded-2xl transition-all ${card.matched ? "matched" : ""} ${isUp ? "flip-in" : ""}`}
      style={{
        backgroundColor: isUp ? pattern.bg : "#8B1A4A",
        border: card.matched ? `2.5px solid ${pattern.color}` : isUp ? `2px solid ${pattern.color}88` : "2px solid #5a0e2e",
        boxShadow: card.matched ? `0 0 0 2px ${pattern.color}44` : "0 3px 0 #5a0e2e",
        overflow: "hidden",
        padding: 0,
        cursor: isUp ? "default" : "pointer"
      }}
    >
              {isUp ? <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  {pattern.render(56)}
                  <span className="text-xs font-extrabold" style={{ color: pattern.color }}>{pattern.name}</span>
                </div> : <div className="w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 60 60" width="52" height="52">
                    {[0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3, 4].map((j) => <circle key={`${i}-${j}`} cx={6 + i * 12} cy={6 + j * 12} r={2} fill="white" opacity={0.25} />))}
                    <text x="30" y="36" textAnchor="middle" fontSize="20" fill="white" opacity={0.4}>🎨</text>
                  </svg>
                </div>}
            </button>;
  })}
      </div>

      <p className="text-center text-xs text-gray-400 font-bold">
        Tap two cards to find matching batik patterns!
      </p>
    </div>;
}
export {
  BatikGame as default
};
