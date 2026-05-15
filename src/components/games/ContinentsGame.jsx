import { useState, useRef, useCallback } from "react";
const CONTINENTS = [
  { name: "Asia", color: "#FF85A1", emoji: "\u{1F5FE}", fact: "Benua terbesar di dunia!" },
  { name: "Africa", color: "#FFB347", emoji: "\u{1F30D}", fact: "Rumah singa dan gajah!" },
  { name: "Europe", color: "#87CEEB", emoji: "\u{1F3F0}", fact: "Banyak istana dan sejarah!" },
  { name: "North America", color: "#90EE90", emoji: "\u{1F985}", fact: "Rumah elang botak!" },
  { name: "South America", color: "#DDA0DD", emoji: "\u{1F99C}", fact: "Hutan Amazon ada di sini!" },
  { name: "Australia", color: "#F4A460", emoji: "\u{1F998}", fact: "Rumah kanguru!" },
  { name: "Antarctica", color: "#E0F7FA", emoji: "\u{1F427}", fact: "Tempat paling dingin di bumi!" }
];
function Confetti() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: ["#FF85A1", "#FFD700", "#87CEEB", "#90EE90", "#DDA0DD", "#FFB347"][Math.floor(Math.random() * 6)],
    rotation: Math.random() * 360,
    size: 8 + Math.random() * 8
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => <div
    key={p.id}
    className="absolute animate-bounce"
    style={{
      left: `${p.x}%`,
      top: `${p.y}%`,
      width: p.size,
      height: p.size,
      backgroundColor: p.color,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      transform: `rotate(${p.rotation}deg)`,
      animation: `fall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`
    }}
  />)}
      <style>{`
        @keyframes fall {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to   { transform: translateY(110vh) rotate(720deg); opacity: 0.7; }
        }
      `}</style>
    </div>;
}
function ContinentsGame() {
  const [placed, setPlaced] = useState({});
  const [dropStates, setDropStates] = useState({});
  const [shakingLabel, setShakingLabel] = useState(null);
  const [won, setWon] = useState(false);
  const draggedRef = useRef(null);
  const correctCount = Object.entries(placed).filter(([box, label]) => box === label).length;
  const allCorrect = correctCount === CONTINENTS.length;
  const handleDragStart = useCallback((name) => {
    draggedRef.current = name;
  }, []);
  const handleDrop = useCallback((targetName) => {
    const dragged = draggedRef.current;
    if (!dragged) return;
    if (dragged === targetName) {
      setPlaced((prev) => ({ ...prev, [targetName]: dragged }));
      setDropStates((prev) => ({ ...prev, [targetName]: "correct" }));
      setTimeout(() => {
        setDropStates((prev) => ({ ...prev, [targetName]: "idle" }));
        setPlaced((prev) => {
          const next = { ...prev };
          const newCorrect = Object.keys(next).filter((k) => next[k] === k).length;
          if (newCorrect === CONTINENTS.length) setWon(true);
          return next;
        });
      }, 800);
    } else {
      setDropStates((prev) => ({ ...prev, [targetName]: "wrong" }));
      setShakingLabel(dragged);
      setTimeout(() => {
        setDropStates((prev) => ({ ...prev, [targetName]: "idle" }));
        setShakingLabel(null);
      }, 700);
    }
    draggedRef.current = null;
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);
  const correctlyPlaced = new Set(
    Object.entries(placed).filter(([box, label]) => box === label).map(([, label]) => label)
  );
  const availableLabels = CONTINENTS.filter((c) => !correctlyPlaced.has(c.name));
  const handleReset = () => {
    setPlaced({});
    setDropStates({});
    setShakingLabel(null);
    setWon(false);
  };
  if (won) {
    return <>
        <Confetti />
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center p-6">
          <div className="text-7xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-extrabold text-pink-500" style={{ fontFamily: "Nunito, sans-serif" }}>
            Amazing, Olivia!
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: "Nunito, sans-serif" }}>
            Kamu tahu semua 7 benua! Luar biasa!
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {CONTINENTS.map((c) => <div
      key={c.name}
      className="flex items-center gap-2 rounded-2xl px-4 py-2 font-bold text-sm"
      style={{ backgroundColor: c.color + "33", color: "#333", fontFamily: "Nunito, sans-serif" }}
    >
                <span className="text-xl">{c.emoji}</span>
                <div>
                  <div className="font-extrabold">{c.name}</div>
                  <div className="text-xs font-normal">{c.fact}</div>
                </div>
              </div>)}
          </div>
          <button
      data-testid="button-play-again"
      onClick={handleReset}
      className="mt-2 px-8 py-3 rounded-2xl font-extrabold text-white text-lg active:translate-y-1 transition-transform"
      style={{ backgroundColor: "#FF85A1", boxShadow: "0 4px 0 #cc5a74", fontFamily: "Nunito, sans-serif" }}
    >
            Main Lagi!
          </button>
        </div>
      </>;
  }
  return <div className="flex flex-col gap-4 p-2" style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="text-center">
        <h3 className="text-xl font-extrabold text-pink-500 mb-1">Drag & Drop Benua!</h3>
        <p className="text-sm text-gray-500">Seret nama benua ke kotak yang benar</p>
        <div className="flex justify-center gap-1 mt-2">
          {CONTINENTS.map((_, i) => <div
    key={i}
    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
    style={{
      backgroundColor: i < correctCount ? "#4ade80" : "#e5e7eb",
      color: i < correctCount ? "white" : "#9ca3af"
    }}
  >
              {i < correctCount ? "\u2713" : i + 1}
            </div>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
    /* Labels (left/top) */
  }
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-400 text-center">NAMA BENUA</p>
          {availableLabels.map((c) => <div
    key={c.name}
    data-testid={`label-continent-${c.name.replace(/\s+/g, "-")}`}
    draggable
    onDragStart={() => handleDragStart(c.name)}
    className={`
                cursor-grab active:cursor-grabbing select-none
                rounded-2xl px-4 py-3 font-extrabold text-center text-base
                border-2 transition-all
                ${shakingLabel === c.name ? "animate-[shake_0.3s_ease-in-out_2]" : ""}
              `}
    style={{
      backgroundColor: c.color + "22",
      borderColor: c.color,
      color: "#333",
      animation: shakingLabel === c.name ? "shake 0.3s ease-in-out 2" : void 0
    }}
  >
              <span className="mr-2">{c.emoji}</span>
              {c.name}
            </div>)}
          {availableLabels.length === 0 && <div className="text-center text-gray-400 py-4 text-sm font-semibold">
              Semua benua sudah ditempatkan!
            </div>}
        </div>

        {
    /* Drop zones (right/bottom) */
  }
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-400 text-center">TARGET KOTAK</p>
          {CONTINENTS.map((c) => {
    const isCorrect = placed[c.name] === c.name;
    const state = dropStates[c.name] ?? "idle";
    return <div
      key={c.name}
      data-testid={`drop-zone-${c.name.replace(/\s+/g, "-")}`}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(c.name)}
      className={`
                  rounded-2xl px-4 py-3 border-2 border-dashed text-center font-bold text-sm
                  transition-all min-h-[52px] flex items-center justify-center
                  ${isCorrect ? "border-green-400 bg-green-50" : state === "wrong" ? "border-red-400 bg-red-50 animate-[shake_0.15s_ease-in-out_4]" : "border-gray-300 bg-gray-50"}
                `}
    >
                {isCorrect ? <span className="flex items-center gap-2 text-green-600 font-extrabold">
                    <span className="text-xl">{c.emoji}</span>
                    {c.name}
                    <span className="text-green-500 text-lg">✓</span>
                  </span> : state === "wrong" ? <span className="text-red-400 font-bold text-sm">Coba lagi! ✗</span> : <span className="text-gray-400">
                    Taruh <span className="font-extrabold" style={{ color: c.color }}>{c.name}</span> di sini
                  </span>}
              </div>;
  })}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-6px); }
          75%       { transform: translateX(6px); }
        }
      `}</style>
    </div>;
}
export {
  ContinentsGame as default
};
