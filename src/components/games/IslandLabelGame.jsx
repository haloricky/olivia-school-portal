import { useState } from "react";

const COLOR = "#1D9E75";
const DARK = "#116047";
const BG = "#E8FBF5";

const QUESTIONS = [
  { q: "Indonesia is made up of thousands of islands. Roughly how many islands does Indonesia have?", choices: ["500", "1,700", "5,200", "17,000"], answer: "17,000", emoji: "🏝️", fact: "Indonesia has over 17,000 islands — making it the world's largest archipelago! About 6,000 of them are inhabited. From east to west, Indonesia spans a distance wider than the USA!" },
  { q: "Which is the largest island that belongs to Indonesia — the fifth biggest island in the whole world?", choices: ["Java", "Bali", "Kalimantan (Borneo)", "Sulawesi"], answer: "Kalimantan (Borneo)", emoji: "🌿", fact: "Kalimantan (the Indonesian part of Borneo) is enormous! The island of Borneo is shared by Indonesia, Malaysia, and Brunei. It is home to ancient rainforests full of orangutans, pygmy elephants, and proboscis monkeys." },
  { q: "The Komodo dragon — the world's largest lizard — is found only in Indonesia. On which island?", choices: ["Bali", "Komodo Island", "Sulawesi", "Lombok"], answer: "Komodo Island", emoji: "🦎", fact: "Komodo dragons can grow up to 3 metres long and weigh 70kg! They have been on Earth for millions of years. Komodo Island is part of a protected National Park — a UNESCO World Heritage Site." },
  { q: "Which island is home to more than half of all Indonesia's people — and to Jakarta, its capital city?", choices: ["Sumatra", "Kalimantan", "Sulawesi", "Java"], answer: "Java", emoji: "🏙️", fact: "Java is one of the most densely populated islands on Earth — with over 150 million people! It is the political and economic heart of Indonesia. Jakarta sits on the northern coast of Java." },
  { q: "Indonesia has the world's third-largest rainforest, full of unique plants and animals found NOWHERE else. What do we call plants and animals unique to one place?", choices: ["Exotic", "Endemic", "Migratory", "Tropical"], answer: "Endemic", emoji: "🦧", fact: "An endemic species is found ONLY in one particular place. Indonesia has thousands of endemic species — including the orangutan, the Sumatran tiger, the Babirusa pig, and the Birds of Paradise from Papua!" },
  { q: "Indonesia sits on the 'Ring of Fire' — what does this mean for the islands?", choices: ["They are surrounded by fire-breathing sea monsters", "They have many active volcanoes and earthquakes", "They are the hottest places on Earth", "They produce a lot of chilli peppers"], answer: "They have many active volcanoes and earthquakes", emoji: "🌋", fact: "The Ring of Fire is a horseshoe-shaped zone around the Pacific Ocean with lots of volcanic activity. Indonesia has over 130 active volcanoes! Volcanic soil is extremely fertile — which is why Indonesia has such rich farmland." },
];

export default function IslandLabelGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; question: string }[]>([]);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;

  function handleSelect(c: string) { if (!confirmed) setSelected(c); }
  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setConfirmed(true);
    setAnswers(a => [...a, { correct, question: q.q }]);
  }
  function handleNext() {
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); setConfirmed(false); }
  }
  function reset() { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setAnswers([]); }

  if (done) return (
    <div className="text-center space-y-5 py-4 font-display">
      <div className="text-7xl animate-bounce">{score === QUESTIONS.length ? "🏆" : score >= 4 ? "⭐" : "🏝️"}</div>
      <h3 className="font-extrabold text-3xl" style={{ color: COLOR }}>{score === QUESTIONS.length ? "Island Expert!" : score >= 4 ? "Wonderful!" : "Keep exploring!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: COLOR }}>{score}</span> out of {QUESTIONS.length}!</p>
      <div className="space-y-2 text-left">
        {answers.map((a, i) => (
          <div key={i} className="rounded-2xl px-4 py-3 flex items-start gap-3" style={{ background: a.correct ? "#dcfce7" : "#fee2e2", border: `2px solid ${a.correct ? "#86efac" : "#fca5a5"}` }}>
            <span className="text-xl">{a.correct ? "✅" : "❌"}</span>
            <div><p className="text-sm font-bold text-gray-700">{a.question}</p>{!a.correct && <p className="text-xs text-red-500 font-semibold mt-0.5">Correct: {QUESTIONS[i].answer}</p>}</div>
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
        <div className="flex gap-2">{QUESTIONS.map((_, i) => <div key={i} className="rounded-full transition-all" style={{ width: i === current ? 24 : 12, height: 12, background: i < current ? "#22c55e" : i === current ? COLOR : "#e5e7eb" }} />)}</div>
        <span className="font-extrabold" style={{ color: COLOR }}>{current + 1}/{QUESTIONS.length}</span>
      </div>
      <div className="rounded-2xl p-5 text-center" style={{ background: BG, border: `3px solid ${COLOR}` }}>
        <div className="text-6xl mb-3">{q.emoji}</div>
        <p className="font-extrabold text-base leading-snug" style={{ color: DARK }}>{q.q}</p>
      </div>
      <div className="space-y-2.5">
        {q.choices.map((choice, idx) => {
          const isWrong = confirmed && choice === selected && !isCorrect;
          let bg = "white", border = "2px solid #e5e7eb", textColor = "#3a2a32";
          if (confirmed) { if (choice === q.answer) { bg = "#f0fff4"; border = "2.5px solid #86efac"; textColor = "#15803d"; } else if (isWrong) { bg = "#fff0f0"; border = "2.5px solid #fca5a5"; textColor = "#dc2626"; } }
          else if (choice === selected) { bg = BG; border = `3px solid ${COLOR}`; textColor = DARK; }
          return (
            <button key={choice} onClick={() => handleSelect(choice)} disabled={confirmed}
              className={`w-full rounded-2xl px-4 py-3.5 text-left font-extrabold text-sm flex items-center gap-3 transition-all active:translate-y-0.5 ${isWrong && shake ? "shake" : ""}`}
              style={{ background: bg, border, color: textColor, boxShadow: confirmed ? "none" : "0 3px 0 #d0d0d0" }}>
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: choice === selected ? COLOR : "#f3f4f6", color: choice === selected ? "#fff" : "#6b7280" }}>{["A","B","C","D"][idx]}</span>
              {choice}
              {confirmed && choice === q.answer && <span className="ml-auto text-green-500">✓</span>}
              {confirmed && isWrong && <span className="ml-auto text-red-400">✗</span>}
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div className="rounded-2xl px-4 py-3 flex gap-3 items-start" style={{ background: isCorrect ? "#dcfce7" : "#fff7ed", border: `2px solid ${isCorrect ? "#86efac" : "#fdba74"}` }}>
          <span className="text-2xl">{isCorrect ? "🌟" : "💡"}</span>
          <div><p className="font-extrabold text-sm" style={{ color: isCorrect ? "#15803d" : "#c2410c" }}>{isCorrect ? "Correct!" : `Answer: ${q.answer}`}</p><p className="text-sm text-gray-600 mt-0.5 font-bold">{q.fact}</p></div>
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={!selected} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5 disabled:opacity-50" style={{ background: selected ? COLOR : "#d1d5db", boxShadow: selected ? `0 5px 0 ${DARK}` : "none" }}>Check Answer ✓</button>
      ) : (
        <button onClick={handleNext} className="w-full font-extrabold text-xl text-white py-4 rounded-2xl transition-all active:translate-y-0.5" style={{ background: COLOR, boxShadow: `0 5px 0 ${DARK}` }}>{current + 1 >= QUESTIONS.length ? "See My Score 🏆" : "Next Question →"}</button>
      )}
    </div>
  );
}
