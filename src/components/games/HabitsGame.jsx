import { useState } from "react";

const HEALTHY_COLOR = "#1D9E75";
const UNHEALTHY_COLOR = "#FF6B35";
const HEALTHY_DARK = "#116047";
const UNHEALTHY_DARK = "#c04a20";

const ITEMS = [
  { label: "Eating fruits and vegetables every day", emoji: "🥦", category: "healthy", reason: "Fruits and veggies give your body vitamins and minerals to grow strong and fight off sickness!" },
  { label: "Staying up very late every night playing games", emoji: "🌙", category: "unhealthy", reason: "Children need 9–11 hours of sleep a night! Sleep helps your brain grow, your body repair, and your mood stay happy." },
  { label: "Brushing teeth morning and night", emoji: "🦷", category: "healthy", reason: "Brushing twice a day removes food and bacteria that cause cavities. Strong teeth help you eat, smile, and talk!" },
  { label: "Drinking sugary fizzy drinks every day", emoji: "🥤", category: "unhealthy", reason: "Lots of sugar damages your teeth and gives your body empty calories with no nutrition. Water and milk are much better choices!" },
  { label: "Washing hands before eating and after the toilet", emoji: "🧼", category: "healthy", reason: "Handwashing removes germs before they enter your body — it's one of the best ways to stop spreading colds and tummy bugs!" },
  { label: "Playing outside and running around every day", emoji: "🏃", category: "healthy", reason: "Exercise makes your heart strong, builds your muscles, and releases happy chemicals in your brain. Aim for at least 60 minutes of active play!" },
  { label: "Eating junk food at every single meal", emoji: "🍔", category: "unhealthy", reason: "A little junk food is fine as a treat, but eating it all the time deprives your body of the nutrients it needs to grow and learn." },
  { label: "Drinking enough water throughout the day", emoji: "💧", category: "healthy", reason: "Your body is 60% water! Staying hydrated keeps your brain sharp, your energy high, and your organs working properly." },
  { label: "Sitting still and watching screens for 8 hours", emoji: "📱", category: "unhealthy", reason: "Too much screen time can strain your eyes, disrupt sleep, and reduce time for exercise and creative play. Breaks every 30 minutes help!" },
  { label: "Eating a healthy breakfast before school", emoji: "🍳", category: "healthy", reason: "Breakfast fuels your brain for learning! Children who eat breakfast concentrate better, remember more, and feel more energetic all morning." },
  { label: "Sharing drinks and food with a sick friend", emoji: "🤒", category: "unhealthy", reason: "Sharing cups or cutlery with someone who is sick can spread their germs to you. Always use your own cup and utensils when someone is unwell!" },
  { label: "Going to the doctor for regular check-ups", emoji: "🏥", category: "healthy", reason: "Regular check-ups help doctors catch small problems early, before they become big ones. Prevention is always better than treatment!" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

export default function HabitsGame() {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [shake, setShake] = useState(false);

  const item = items[current];
  const isCorrect = answered === item.category;

  function handleAnswer(choice: string) {
    if (answered) return;
    const correct = choice === item.category;
    if (correct) setScore(s => s + 1);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setAnswered(choice);
    setResults(r => [...r, correct]);
  }
  function handleNext() {
    if (current + 1 >= items.length) setDone(true);
    else { setCurrent(c => c + 1); setAnswered(null); }
  }
  function reset() { setCurrent(0); setAnswered(null); setScore(0); setDone(false); setResults([]); }

  if (done) return (
    <div className="flex flex-col items-center gap-5 py-4 text-center font-display">
      <div className="text-7xl animate-bounce">{score === items.length ? "🏆" : score >= 9 ? "⭐" : "💪"}</div>
      <h3 className="font-extrabold text-2xl" style={{ color: HEALTHY_COLOR }}>{score === items.length ? "Health Champion!" : score >= 9 ? "Very healthy!" : "Keep learning!"}</h3>
      <p className="font-bold text-gray-600 text-lg">You got <span style={{ color: HEALTHY_COLOR }}>{score}</span> out of {items.length} correct!</p>
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="rounded-2xl p-3 text-center" style={{ background: "#E8FBF5", border: `2px solid ${HEALTHY_COLOR}` }}>
          <p className="text-2xl">💚</p><p className="font-extrabold text-sm" style={{ color: HEALTHY_COLOR }}>HEALTHY</p>
          <p className="text-xs text-gray-500 font-semibold">Fruits, sleep, exercise, water, hygiene</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: "#FFF3EE", border: `2px solid ${UNHEALTHY_COLOR}` }}>
          <p className="text-2xl">⚠️</p><p className="font-extrabold text-sm" style={{ color: UNHEALTHY_COLOR }}>UNHEALTHY</p>
          <p className="text-xs text-gray-500 font-semibold">Too much sugar, late nights, too many screens</p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1.5">{results.map((r, i) => <div key={i} className="rounded-xl flex items-center justify-center text-sm w-8 h-8" style={{ background: r ? "#dcfce7" : "#fee2e2" }}>{r ? "✅" : "❌"}</div>)}</div>
      <button onClick={reset} className="px-8 py-4 rounded-2xl font-extrabold text-white text-xl transition-all active:translate-y-0.5" style={{ background: HEALTHY_COLOR, boxShadow: `0 5px 0 ${HEALTHY_DARK}` }}>Play Again 🔄</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 font-display">
      <style>{`.shake{animation:shake 0.4s ease;} @keyframes shake{0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}} .pop{animation:pop 0.25s ease;} @keyframes pop{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div className="flex items-center justify-between">
        <div><h3 className="text-base font-extrabold text-gray-700">Healthy Habits Sort</h3><p className="text-xs text-gray-400 font-bold">Habit {current + 1} of {items.length}</p></div>
        <div className="flex gap-1.5">{items.map((_, i) => <div key={i} className="rounded-full" style={{ width: i === current ? 20 : 10, height: 10, background: i < current ? (results[i] ? "#22c55e" : "#fca5a5") : i === current ? HEALTHY_COLOR : "#e5e7eb" }} />)}</div>
      </div>
      <div className={`rounded-3xl p-5 text-center flex flex-col items-center gap-3 ${shake ? "shake" : ""}`} style={{ background: "#FAFAFA", border: "2.5px dashed #e5e7eb" }}>
        <div className="text-6xl">{item.emoji}</div>
        <p className="font-extrabold text-gray-800 text-base leading-snug max-w-xs">{item.label}</p>
      </div>
      {!answered && <p className="text-center font-extrabold text-sm text-gray-500">Is this healthy or not healthy?</p>}
      {!answered ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAnswer("healthy")} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ background: "#E8FBF5", border: `2.5px solid ${HEALTHY_COLOR}`, color: HEALTHY_DARK, boxShadow: `0 4px 0 ${HEALTHY_DARK}` }}>
            <span className="text-4xl">💚</span><span>Healthy!</span>
          </button>
          <button onClick={() => handleAnswer("unhealthy")} className="flex flex-col items-center gap-2 py-5 rounded-3xl font-extrabold text-lg transition-all active:scale-95 active:translate-y-0.5" style={{ background: "#FFF3EE", border: `2.5px solid ${UNHEALTHY_COLOR}`, color: UNHEALTHY_DARK, boxShadow: `0 4px 0 ${UNHEALTHY_DARK}` }}>
            <span className="text-4xl">⚠️</span><span>Not Healthy</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pop">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: isCorrect ? "#dcfce7" : "#fee2e2", border: `2.5px solid ${isCorrect ? HEALTHY_COLOR : "#fca5a5"}` }}>
            <p className="font-extrabold text-lg" style={{ color: isCorrect ? "#15803d" : "#dc2626" }}>
              {isCorrect ? "✅ Correct! " : "❌ Not quite! "}
              This is <strong>{item.category === "healthy" ? "HEALTHY" : "NOT HEALTHY"}</strong>!
            </p>
          </div>
          <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ background: "#E8FBF5", border: `2px solid ${HEALTHY_COLOR}` }}>
            <span className="text-lg">💡</span>
            <p className="text-sm font-extrabold text-green-800">{item.reason}</p>
          </div>
          <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-0.5" style={{ background: HEALTHY_COLOR, boxShadow: `0 4px 0 ${HEALTHY_DARK}` }}>
            {current + 1 >= items.length ? "See My Score 🏆" : "Next Habit →"}
          </button>
        </div>
      )}
    </div>
  );
}
