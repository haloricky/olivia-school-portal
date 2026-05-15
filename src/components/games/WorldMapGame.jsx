import { useState } from "react";
const WORLD_CONTINENTS = [
  {
    name: "North America",
    color: "#90EE90",
    emoji: "\u{1F985}",
    fact: "Home of the bald eagle, Niagara Falls, and the Grand Canyon!",
    labelX: 175,
    labelY: 158,
    path: "M 80,58 L 222,48 L 248,68 L 256,100 L 274,148 L 292,196 L 264,254 L 208,272 L 158,262 L 112,252 L 84,226 L 66,194 L 56,158 L 62,110 L 78,80 Z"
  },
  {
    name: "South America",
    color: "#DDA0DD",
    emoji: "\u{1F99C}",
    fact: "Home to the Amazon Rainforest \u2014 the lungs of the Earth!",
    labelX: 218,
    labelY: 375,
    path: "M 170,290 L 244,278 L 276,296 L 292,342 L 288,400 L 268,453 L 228,473 L 188,463 L 158,433 L 142,378 L 146,330 L 162,300 Z"
  },
  {
    name: "Europe",
    color: "#87CEEB",
    emoji: "\u{1F3F0}",
    fact: "Packed with countries, castles, and famous art museums!",
    labelX: 481,
    labelY: 148,
    path: "M 448,72 L 486,64 L 518,72 L 542,86 L 550,108 L 532,128 L 552,150 L 534,176 L 510,200 L 478,214 L 450,210 L 424,193 L 416,170 L 420,136 L 435,108 Z"
  },
  {
    name: "Africa",
    color: "#FFB347",
    emoji: "\u{1F30D}",
    fact: "The second-largest continent \u2014 home to lions, elephants, and the Sahara Desert!",
    labelX: 490,
    labelY: 338,
    path: "M 422,218 L 533,213 L 558,249 L 568,305 L 558,375 L 532,445 L 495,468 L 453,465 L 416,436 L 394,389 L 393,328 L 407,268 L 418,244 Z"
  },
  {
    name: "Asia",
    color: "#FF85A1",
    emoji: "\u{1F5FE}",
    fact: "The biggest continent \u2014 over 4 billion people live here, including us in Indonesia!",
    labelX: 730,
    labelY: 200,
    path: "M 608,142 L 648,70 L 750,53 L 880,68 L 940,110 L 945,160 L 922,215 L 895,265 L 855,307 L 800,335 L 740,352 L 680,358 L 620,352 L 572,328 L 546,296 L 520,256 L 508,203 L 510,150 L 524,110 L 538,88 L 578,90 Z"
  },
  {
    name: "Australia",
    color: "#F4A460",
    emoji: "\u{1F998}",
    fact: "The only country that is also an entire continent \u2014 and home to kangaroos!",
    labelX: 815,
    labelY: 393,
    path: "M 746,340 L 840,326 L 895,346 L 910,389 L 900,428 L 870,452 L 820,462 L 770,458 L 733,431 L 716,397 L 726,365 Z"
  },
  {
    name: "Antarctica",
    color: "#B2EBF2",
    emoji: "\u{1F427}",
    fact: "The coldest, windiest place on Earth \u2014 almost entirely covered in ice!",
    labelX: 500,
    labelY: 482,
    path: "M 18,468 L 982,468 L 982,500 L 18,500 Z"
  }
];
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#FF85A1", "#FFD700", "#87CEEB", "#90EE90", "#DDA0DD", "#FFB347"][i % 6],
    size: 8 + Math.random() * 8,
    delay: Math.random() * 0.8,
    dur: 1.5 + Math.random() * 1.5
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => <div
    key={p.id}
    className="absolute"
    style={{
      left: `${p.x}%`,
      top: "-16px",
      width: p.size,
      height: p.size,
      backgroundColor: p.color,
      borderRadius: p.id % 2 === 0 ? "50%" : "2px",
      animation: `fall ${p.dur}s ease-in ${p.delay}s forwards`
    }}
  />)}
      <style>{`
        @keyframes fall {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to { transform: translateY(110vh) rotate(720deg); opacity: 0.6; }
        }
      `}</style>
    </div>;
}
function WorldMapGame() {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [won, setWon] = useState(false);
  const [shuffledLabels] = useState(() => shuffle(WORLD_CONTINENTS.map((c) => c.name)));
  const correctCount = Object.values(placed).filter(Boolean).length;
  const availableLabels = shuffledLabels.filter((name) => !placed[name]);
  function handleLabelClick(name) {
    setSelected((s) => s === name ? null : name);
  }
  function handleContinentClick(name) {
    if (!selected) return;
    if (placed[name]) return;
    if (selected === name) {
      const next = { ...placed, [name]: true };
      setPlaced(next);
      setSelected(null);
      if (Object.values(next).filter(Boolean).length === WORLD_CONTINENTS.length) {
        setTimeout(() => setWon(true), 600);
      }
    } else {
      setWrongFlash(name);
      setTimeout(() => setWrongFlash(null), 700);
    }
  }
  function handleReset() {
    setPlaced({});
    setSelected(null);
    setWrongFlash(null);
    setWon(false);
  }
  if (won) {
    return <>
        <Confetti />
        <div className="flex flex-col items-center gap-5 text-center p-6 min-h-[380px] justify-center">
          <div className="text-7xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-extrabold text-pink-500" style={{ fontFamily: "Nunito, sans-serif" }}>
            You know all 7 continents, Olivia!
          </h2>
          <div className="grid grid-cols-2 gap-2 mt-1 w-full max-w-md">
            {WORLD_CONTINENTS.map((c) => <div
      key={c.name}
      className="flex items-start gap-2 rounded-2xl px-3 py-2 text-sm text-left"
      style={{ backgroundColor: c.color + "33", fontFamily: "Nunito, sans-serif" }}
    >
                <span className="text-lg flex-shrink-0">{c.emoji}</span>
                <div>
                  <div className="font-extrabold">{c.name}</div>
                  <div className="text-xs font-normal text-gray-600 leading-tight">{c.fact}</div>
                </div>
              </div>)}
          </div>
          <button
      onClick={handleReset}
      className="mt-2 px-8 py-3 rounded-2xl font-extrabold text-white text-lg transition-transform active:translate-y-1"
      style={{ backgroundColor: "#FF85A1", boxShadow: "0 4px 0 #cc5a74", fontFamily: "Nunito, sans-serif" }}
    >
            Play Again! 🔄
          </button>
        </div>
      </>;
  }
  return <div className="flex flex-col gap-3" style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="text-center">
        <h3 className="text-lg font-extrabold text-pink-500 mb-0.5">Find Each Continent on the Map!</h3>
        <p className="text-sm text-gray-500 font-semibold">
          {selected ? <span>Click <strong className="text-pink-500">{selected}</strong> on the map below 👇</span> : "Click a continent name to select it, then tap its location on the map"}
        </p>
        <div className="flex justify-center gap-1.5 mt-2">
          {WORLD_CONTINENTS.map((_, i) => <div
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

      <div
    className="relative w-full rounded-2xl overflow-hidden border-2 border-blue-200 shadow-md"
    style={{ background: "#B3D9F2" }}
  >
        <svg
    viewBox="0 0 1000 500"
    className="w-full block"
    style={{ display: "block" }}
  >
          <rect width="1000" height="500" fill="#B3D9F2" />

          <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeWidth="1.5" strokeDasharray="12,10" opacity="0.5" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="white" strokeWidth="1" strokeDasharray="8,8" opacity="0.3" />

          <text x="12" y="253" fill="white" fontSize="11" opacity="0.7" fontFamily="Nunito, sans-serif" fontWeight="bold">Equator</text>

          {WORLD_CONTINENTS.map((c) => {
    const isPlaced = placed[c.name];
    const isWrong = wrongFlash === c.name;
    const isHinted = !isPlaced && selected !== null;
    return <g
      key={c.name}
      onClick={() => handleContinentClick(c.name)}
      style={{ cursor: selected && !isPlaced ? "pointer" : "default" }}
    >
                <path
      d={c.path}
      fill={isPlaced ? c.color : isWrong ? "#ff6b6b" : isHinted ? "#e8f4f8" : "#d4edda"}
      stroke={isPlaced ? c.color : isWrong ? "#cc0000" : selected && !isPlaced ? "#888" : "#aaa"}
      strokeWidth={isWrong ? 3 : isPlaced ? 2 : 1.5}
      style={{ transition: "fill 0.25s, stroke 0.25s" }}
    />

                {isPlaced && <>
                    <text
      x={c.labelX}
      y={c.labelY - 8}
      textAnchor="middle"
      fill="white"
      fontSize={c.name === "Antarctica" ? "11" : "13"}
      fontWeight="800"
      fontFamily="Nunito, sans-serif"
      style={{ pointerEvents: "none", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
    >
                      {c.emoji} {c.name}
                    </text>
                  </>}

                {isWrong && <text
      x={c.labelX}
      y={c.labelY}
      textAnchor="middle"
      fill="#cc0000"
      fontSize="16"
      fontFamily="Nunito, sans-serif"
      fontWeight="bold"
      style={{ pointerEvents: "none" }}
    >
                    ✗
                  </text>}

                {!isPlaced && !isWrong && selected && <text
      x={c.labelX}
      y={c.labelY + 4}
      textAnchor="middle"
      fill="#6b7280"
      fontSize="11"
      fontFamily="Nunito, sans-serif"
      fontWeight="600"
      style={{ pointerEvents: "none" }}
    >
                    ?
                  </text>}
              </g>;
  })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 justify-center pt-1">
        {availableLabels.map((name) => {
    const c = WORLD_CONTINENTS.find((x) => x.name === name);
    const isSelected = selected === name;
    return <button
      key={name}
      onClick={() => handleLabelClick(name)}
      className="flex items-center gap-1.5 px-3 py-2 rounded-2xl font-extrabold text-sm border-2 transition-all active:scale-95"
      style={{
        backgroundColor: isSelected ? c.color : c.color + "22",
        borderColor: c.color,
        color: isSelected ? "white" : "#333",
        boxShadow: isSelected ? `0 3px 0 ${c.color}aa` : void 0,
        transform: isSelected ? "translateY(-2px)" : void 0
      }}
    >
              <span>{c.emoji}</span>
              {name}
            </button>;
  })}
      </div>

      {availableLabels.length === 0 && !won && <p className="text-center text-green-500 font-extrabold">Almost there…</p>}

      <button
    onClick={handleReset}
    className="text-gray-400 text-xs font-bold underline self-center mt-1"
  >
        Reset
      </button>
    </div>;
}
export {
  WORLD_CONTINENTS,
  WorldMapGame as default
};
