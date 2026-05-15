import { useState } from "react";

const COLOR = "#534AB7";
const DARK = "#2f2880";
const BG = "#F0EEFF";

const ROUNDS = [
  { hour: 3,  minute: 0,  answer: "3:00",  choices: ["3:00", "3:30", "9:00", "6:00"] },
  { hour: 6,  minute: 0,  answer: "6:00",  choices: ["12:00", "6:00", "6:30", "3:00"] },
  { hour: 12, minute: 0,  answer: "12:00", choices: ["6:00", "12:30", "12:00", "1:00"] },
  { hour: 1,  minute: 30, answer: "1:30",  choices: ["1:00", "7:30", "1:30", "2:30"] },
  { hour: 9,  minute: 30, answer: "9:30",  choices: ["9:00", "3:30", "9:30", "10:30"] },
  { hour: 7,  minute: 0,  answer: "7:00",  choices: ["7:00", "7:30", "1:00", "5:00"] },
  { hour: 4,  minute: 30, answer: "4:30",  choices: ["4:00", "10:30", "4:30", "5:30"] },
  { hour: 11, minute: 0,  answer: "11:00", choices: ["11:00", "1:00", "11:30", "5:00"] },
];

function ClockFace({ hour, minute }: { hour: number; minute: number }) {
  const minuteAngle = minute * 6 - 90;
  const hourAngle = (hour % 12) * 30 + minute * 0.5 - 90;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 60, cy = 60, r = 52;
  const hourLen = 28, minuteLen = 40;
  const hx = cx + hourLen * Math.cos(toRad(hourAngle));
  const hy = cy + hourLen * Math.sin(toRad(hourAngle));
  const mx = cx + minuteLen * Math.cos(toRad(minuteAngle));
  const my = cy + minuteLen * Math.sin(toRad(minuteAngle));
  const nums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <svg viewBox="0 0 120 120" width="150" height="150" className="mx-auto drop-shadow-md">
      <circle cx={cx} cy={cy} r={r} fill="white" stroke={COLOR} strokeWidth="4" />
      {nums.map((n, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const nx = cx + 40 * Math.cos(angle);
        const ny = cy + 40 * Math.sin(angle);
        return <text key={n} x={nx} y={ny} textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="800" fill={DARK}>{n}</text>;
      })}
      {[...Array(60)].map((_, i) => {
        const a = (i * 6 - 90) * Math.PI / 180;
        const innerR = i % 5 === 0 ? 44 : 47;
        return <line key={i} x1={cx + innerR * Math.cos(a)} y1={cy + innerR * Math.sin(a)} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke={i % 5 === 0 ? DARK : "#ddd"} strokeWidth={i % 5 === 0 ? 1.5 : 0.8} />;
      })}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill={DARK} />
    </svg>
  );
}

export default function ClockReadingGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);

  const q = ROUNDS[current];
  const isCorrect = selected === q.answer;

  function handleSelect(c: string) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
    setAnswers(a => [...a, { correct }]);
  }
  function handleNext() {
    if (current + 1 >= ROUNDS.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setAnswers([]); }

  const facts = [
    "There are 60 minutes in one hour and 24 hours in one day!",
    "The short hand shows the HOUR — the long hand shows the MINUTES.",
    "When the long hand points straight up, it's exactly o'clock — no minutes!",
    "When the long hand points to 6, it means 30 minutes past — we say 'half past'!",
    "AM means morning (before noon). PM means afternoon and evening!",
    "A digital clock shows numbers: 7:00. An analogue clock has hands!",
    "Half past = 30 minutes past. Quarter past = 15 minutes. Quarter to = 45 minutes.",
    "Telling the time is one of the most useful skills you'll ever learn!",
  ];

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === ROUNDS.length ? "🏆" : score >= 6 ? "⭐" : "⏰"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === ROUNDS.length ? "Time Master!" : score >= 6 ? "Brilliant!" : "Keep practising!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {ROUNDS.length}!</p>
      <div className="grid grid-cols-4 gap-2">{answers.map((a, i) => <div key={i} className="rounded-xl py-2 text-center" style={{ background: a.correct ? "#dcfce7" : "#fee2e2" }}>{a.correct ? "✅" : "❌"}</div>)}</div>
      <div className="rounded-2xl p-4" style={{ background: BG, border: `2px solid ${COLOR}` }}>
        <p className="font-extrabold text-sm" style={{ color: COLOR }}>Remember: short hand = HOUR, long hand = MINUTES. When the long hand is at 12, it's o'clock. At 6, it's half past!</p>
      </div>
      <button onClick={reset} className="font-extrabold text-xl text-white py-4 px-8 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>Try Again 🔄</button>
    </div>
  );

  return (
    <div className="space-y-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">{ROUNDS.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 22 : 10, height: 10, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{ROUNDS.length}</span>
      </div>
      <div className={`rounded-2xl p-4 text-center ${shake ? "shake" : ""}`} style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <ClockFace hour={q.hour} minute={q.minute} />
        <p className="font-extrabold text-base mt-2" style={{ color: DARK }}>What time does this clock show?</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {q.choices.map(choice => {
          const isWrong = confirmed && choice === selected && !isCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className="rounded-2xl py-4 font-extrabold text-xl text-center transition-all active:translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              ⏰ {choice}
              {confirmed && choice === q.answer && <span className="text-green-500 text-base">✓</span>}
              {confirmed && isWrong && <span className="text-red-400 text-base">✗</span>}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-2 items-center" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "🌟" : "💡"}</span>
          <p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>
            {isCorrect ? "Correct! " : `The answer is ${q.answer}. `}{facts[current]}
          </p>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={!selected} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected ? COLOR : "#d1d5db", boxShadow: selected ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= ROUNDS.length ? "See My Score 🏆" : "Next Clock →"}</button>
      )}
    </div>
  );
}
