import { useState } from "react";
const FEELINGS = [
  {
    id: "happy",
    en: "Happy",
    id_lang: "Senang",
    emoji: "\u{1F604}",
    color: "#FFD700",
    dark: "#c9a700",
    bg: "#FFFDE7",
    description: "When something wonderful happens and your heart feels like it could float away! You might smile big, laugh, or want to dance.",
    helps: "Share your happiness! Tell Papa or Mama what made you feel so great. Happiness grows when you share it.",
    examples: "Getting a hug, playing your favourite game, eating ice cream, seeing a friend!"
  },
  {
    id: "sad",
    en: "Sad",
    id_lang: "Sedih",
    emoji: "\u{1F622}",
    color: "#87CEEB",
    dark: "#4a9aba",
    bg: "#E3F2FD",
    description: "When something difficult happens and your heart feels heavy. You might cry, or want to curl up quietly. That's completely OK.",
    helps: "It's OK to cry \u2014 tears are your body's way of healing. Ask for a hug from Papa or Mama. Talk about what made you sad.",
    examples: "Missing someone, losing a toy, saying goodbye, when something goes wrong."
  },
  {
    id: "angry",
    en: "Angry",
    id_lang: "Marah",
    emoji: "\u{1F621}",
    color: "#FF7043",
    dark: "#c0391a",
    bg: "#FBE9E7",
    description: "When something feels very unfair or frustrating and your body feels hot and tight. Everyone feels angry sometimes \u2014 it's a normal feeling!",
    helps: "Take 5 big deep breaths. Count slowly to 10. Go for a walk or jump around to let the energy out. Then talk about why you felt angry.",
    examples: "When something feels unfair, when your toy is broken, when someone is unkind."
  },
  {
    id: "scared",
    en: "Scared",
    id_lang: "Takut",
    emoji: "\u{1F628}",
    color: "#9C27B0",
    dark: "#6a0f7a",
    bg: "#F3E5F5",
    description: "When something unknown or surprising happens and your body wants to run away or hide. Being scared means your body is trying to keep you safe!",
    helps: "Tell Papa or Mama right away \u2014 you never have to face scary things alone! Use a comfort object (a stuffed animal). Turn on a light.",
    examples: "Loud noises, the dark, new places, big crowds, thunder."
  },
  {
    id: "proud",
    en: "Proud",
    id_lang: "Bangga",
    emoji: "\u{1F624}",
    color: "#FF85A1",
    dark: "#cc5a74",
    bg: "#FFF0F5",
    description: "When you work hard at something and you do it! That warm, tall feeling inside is PRIDE. You earned it! Being proud of yourself is wonderful.",
    helps: "Celebrate! Tell someone what you achieved. Do a happy dance. Write it in your journal. Remember this feeling for next time something is hard.",
    examples: "Finishing a puzzle, learning to read a word, helping someone, drawing a great picture!"
  },
  {
    id: "surprised",
    en: "Surprised",
    id_lang: "Terkejut",
    emoji: "\u{1F632}",
    color: "#FF9800",
    dark: "#c46a00",
    bg: "#FFF8E1",
    description: "When something completely unexpected happens \u2014 good or not so good! Your eyes go wide and your mouth opens. Surprise is very quick!",
    helps: "Take a breath, then figure out if the surprise was good or not. If it was good \u2014 enjoy it! If it was scary \u2014 see 'scared' above.",
    examples: "A birthday party surprise, an unexpected gift, something popping up, seeing a rainbow!"
  }
];
function FeelingsGame() {
  const [selected, setSelected] = useState(null);
  const feeling = FEELINGS.find((f) => f.id === selected) ?? null;
  return <div className="flex flex-col gap-4" style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="text-center">
        <h3 className="text-lg font-extrabold" style={{ color: "#FF85A1" }}>How Are You Feeling Today, Olivia?</h3>
        <p className="text-xs text-gray-400 font-bold mt-0.5">Tap a face to explore that feeling!</p>
      </div>

      {
    /* Feelings grid */
  }
      <div className="grid grid-cols-3 gap-3">
        {FEELINGS.map((f) => <button
    key={f.id}
    onClick={() => setSelected((s) => s === f.id ? null : f.id)}
    className="flex flex-col items-center gap-1 rounded-2xl py-3 px-2 transition-all active:scale-95"
    style={{
      backgroundColor: selected === f.id ? f.bg : "#fafafa",
      border: `2.5px solid ${selected === f.id ? f.color : "#e5e7eb"}`,
      boxShadow: selected === f.id ? `0 3px 0 ${f.dark}` : "0 2px 0 #d0d0d0",
      transform: selected === f.id ? "translateY(2px)" : ""
    }}
  >
            <span className="text-4xl leading-none">{f.emoji}</span>
            <span className="text-xs font-extrabold mt-0.5" style={{ color: selected === f.id ? f.dark : "#666" }}>{f.en}</span>
            <span className="text-xs font-bold" style={{ color: selected === f.id ? f.color : "#aaa" }}>{f.id_lang}</span>
          </button>)}
      </div>

      {
    /* Detail panel */
  }
      {feeling && <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: feeling.bg, border: `2.5px solid ${feeling.color}`, animation: "pop-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <style>{`@keyframes pop-in { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }`}</style>
          <div className="flex items-center gap-3">
            <span className="text-5xl">{feeling.emoji}</span>
            <div>
              <h4 className="font-extrabold text-xl" style={{ color: feeling.dark }}>{feeling.en}</h4>
              <p className="text-sm font-bold" style={{ color: feeling.color }}>Bahasa Indonesia: {feeling.id_lang}</p>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-700 leading-relaxed">{feeling.description}</p>

          <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1" style={{ color: feeling.dark }}>💡 What helps:</p>
            <p className="text-sm font-bold text-gray-600">{feeling.helps}</p>
          </div>

          <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1" style={{ color: feeling.dark }}>📝 Examples:</p>
            <p className="text-sm font-bold text-gray-600">{feeling.examples}</p>
          </div>
        </div>}

      {!feeling && <div className="rounded-2xl px-4 py-4 text-center" style={{ backgroundColor: "#FFF9E6", border: "2px solid #FFD700" }}>
          <p className="text-sm font-extrabold text-yellow-800">
            ⭐ All feelings are OK! Even anger, sadness, and fear are important feelings that help us understand ourselves and the world.
          </p>
        </div>}
    </div>;
}
export {
  FeelingsGame as default
};
