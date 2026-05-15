import { useState } from "react";
const CHAPTERS = [
  {
    id: "why",
    title: "What Are Rules?",
    emoji: "\u{1F4CB}",
    body: "Imagine a football game with no rules \u2014 anyone could pick up the ball and run anywhere! It would be chaos! Rules are agreements that everyone agrees to follow so that things are fair, safe, and fun for everyone. Rules are not there to be mean \u2014 they're there to protect us and help us get along together.",
    fact: "Even animals have rules! Wolves, elephants, and monkeys all have rules in their groups about sharing food and taking care of each other.",
    scene: "why"
  },
  {
    id: "home",
    title: "Rules at Home",
    emoji: "\u{1F3E0}",
    body: "Every home has its own rules, and they're there to keep the family happy and healthy! Things like brushing your teeth before bed (to keep your teeth strong), tidying your room (so you can find your toys!), and going to sleep on time (so your brain can rest and grow). When everyone in the family follows the rules, home feels warm and peaceful.",
    fact: "Sleep rules are really important \u2014 kids need 10\u201312 hours of sleep! While you sleep, your brain is busy storing all the new things you learned that day.",
    scene: "home"
  },
  {
    id: "school",
    title: "Rules at School",
    emoji: "\u{1F3EB}",
    body: "At school, rules help everyone learn! We listen to the teacher so everyone can hear. We don't hit or push because everyone deserves to feel safe. We take turns so everyone gets a chance. We raise our hand before speaking so the classroom isn't noisy. These rules mean everyone gets a fair shot at learning something new every day!",
    fact: "Studies show that classrooms with clear, friendly rules help children learn 40% better \u2014 because their brains can relax and focus!",
    scene: "school"
  },
  {
    id: "road",
    title: "Rules on the Road",
    emoji: "\u{1F6A6}",
    body: "Road rules keep us safe every single day! Red means STOP, green means GO, and yellow means slow down. Pedestrians use the zebra crossing to cross safely. Cars drive on the left side (or right, depending on the country!). Everyone must wear a seatbelt. Without these rules, roads would be very dangerous places.",
    fact: "The first traffic light was invented in 1868 in London! It was operated by a police officer who turned a gas lamp \u2014 red for stop, green for go.",
    scene: "road"
  },
  {
    id: "fair",
    title: "Rules Make Things Fair",
    emoji: "\u2696\uFE0F",
    body: "Rules help make sure everyone gets treated equally and fairly. Imagine if in a queue for ice cream, some people kept pushing to the front \u2014 how would that feel? Unfair! When everyone waits their turn, everyone gets ice cream! Fairness means everyone gets the same chance, the same respect, and the same kindness.",
    fact: "The word 'fair' comes from the Old English word 'f\xE6ger', which means beautiful! Being fair really is beautiful.",
    scene: "fair"
  },
  {
    id: "outrules",
    title: "Making Our Own Rules!",
    emoji: "\u270D\uFE0F",
    body: "Rules don't have to come only from grown-ups! You can help make rules too. As a family, you can sit together and decide: what are the most important rules for our home? Maybe: 'We always say sorry when we make a mistake.' Or 'We never go to sleep angry.' Rules that we make together feel more special \u2014 because we all chose them!",
    fact: "Today's activity: Make a 'Our House Rules' book with Papa! Draw 5 important rules and stick it on the fridge for everyone to see.",
    scene: "our"
  }
];
function SceneIllustration({ scene }) {
  const scenes = {
    why: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#FFF9E6" rx="16" />
        {[0, 1, 2, 3].map((i) => <g key={i}>
            <ellipse cx={50 + i * 70} cy={130} rx={18} ry={22} fill={["#FF85A1", "#87CEEB", "#90EE90", "#FFB347"][i]} />
            <circle cx={50 + i * 70} cy={100} r={13} fill="#FFD9A0" />
            <text x={50 + i * 70} y={105} textAnchor="middle" fontSize="14">😊</text>
          </g>)}
        <rect x="20" y="148" width="280" height="8" rx="4" fill="#d0d0d0" />
        <rect x="140" y="30" width="40" height="60" rx="6" fill="#FF4D4D" opacity="0.9" />
        <text x="160" y="68" textAnchor="middle" fontSize="20">📋</text>
        <text x="160" y="22" textAnchor="middle" fontSize="11" fill="#555" fontWeight="bold" fontFamily="Nunito">Rules for everyone!</text>
      </svg>,
    home: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#FFF0F5" rx="16" />
        <rect x="100" y="80" width="120" height="90" fill="#FFDAB9" stroke="#e8a070" strokeWidth="2" />
        <polygon points="100,80 160,30 220,80" fill="#FF85A1" />
        <rect x="140" y="120" width="30" height="50" rx="4" fill="#a0522d" />
        <rect x="110" y="90" width="25" height="25" rx="3" fill="#87CEEB" />
        <rect x="185" y="90" width="25" height="25" rx="3" fill="#87CEEB" />
        <text x="160" y="75" textAnchor="middle" fontSize="18">🏠</text>
        <text x="60" y="140" fontSize="22">🦷</text>
        <text x="250" y="140" fontSize="22">🛏️</text>
        <text x="60" y="170" textAnchor="middle" fontSize="9" fill="#FF85A1" fontWeight="bold" fontFamily="Nunito">brush teeth</text>
        <text x="260" y="170" textAnchor="middle" fontSize="9" fill="#87CEEB" fontWeight="bold" fontFamily="Nunito">tidy bed</text>
      </svg>,
    school: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#E8F4FD" rx="16" />
        <rect x="60" y="50" width="200" height="110" rx="8" fill="#fff" stroke="#87CEEB" strokeWidth="2" />
        <rect x="60" y="50" width="200" height="30" rx="8" fill="#87CEEB" />
        <text x="160" y="71" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" fontFamily="Nunito">Our Classroom</text>
        <text x="90" y="105" fontSize="10" fill="#555" fontFamily="Nunito">✅ Listen to the teacher</text>
        <text x="90" y="120" fontSize="10" fill="#555" fontFamily="Nunito">✅ Take turns</text>
        <text x="90" y="135" fontSize="10" fill="#555" fontFamily="Nunito">✅ Be kind to everyone</text>
        <text x="90" y="150" fontSize="10" fill="#555" fontFamily="Nunito">✅ Raise your hand</text>
        <text x="270" y="120" fontSize="28">👩‍🏫</text>
      </svg>,
    road: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#E8F8E8" rx="16" />
        <rect x="0" y="100" width="320" height="60" fill="#808080" />
        <rect x="0" y="128" width="320" height="4" fill="white" strokeDasharray="20,15" />
        <rect x="130" y="100" width="60" height="10" fill="white" opacity="0.9" />
        <text x="160" y="108" textAnchor="middle" fontSize="7" fill="#555" fontWeight="bold">ZEBRA CROSSING</text>
        <rect x="50" y="55" width="30" height="52" rx="8" fill="#333" />
        <circle cx="65" cy="68" r="9" fill="#FF4D4D" />
        <circle cx="65" cy="82" r="9" fill="#FFD700" />
        <circle cx="65" cy="96" r="9" fill="#90EE90" />
        <text x="120" y="97" fontSize="24">🚗</text>
        <text x="230" y="97" fontSize="24">🚌</text>
        <text x="152" y="95" fontSize="18">🧍</text>
      </svg>,
    fair: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#FFF9E6" rx="16" />
        <rect x="130" y="40" width="20" height="80" fill="#aaa" />
        <rect x="80" y="80" width="140" height="8" rx="4" fill="#888" />
        <rect x="80" y="88" width="65" height="50" rx="6" fill="#FFB347" opacity="0.8" />
        <rect x="175" y="88" width="65" height="50" rx="6" fill="#87CEEB" opacity="0.8" />
        <text x="112" y="120" textAnchor="middle" fontSize="22">😊</text>
        <text x="208" y="120" textAnchor="middle" fontSize="22">😊</text>
        <text x="112" y="140" textAnchor="middle" fontSize="10" fill="#c47a20" fontWeight="bold" fontFamily="Nunito">Fair!</text>
        <text x="208" y="140" textAnchor="middle" fontSize="10" fill="#2a7aaa" fontWeight="bold" fontFamily="Nunito">Fair!</text>
        <text x="160" y="28" textAnchor="middle" fontSize="11" fill="#555" fontWeight="bold" fontFamily="Nunito">Everyone gets the same!</text>
        <text x="160" y="172" textAnchor="middle" fontSize="24">⚖️</text>
      </svg>,
    our: <svg viewBox="0 0 320 180" className="w-full rounded-2xl">
        <rect width="320" height="180" fill="#F0FFF4" rx="16" />
        <rect x="80" y="20" width="160" height="140" rx="10" fill="white" stroke="#90EE90" strokeWidth="2.5" />
        <rect x="80" y="20" width="160" height="30" rx="10" fill="#90EE90" />
        <text x="160" y="40" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold" fontFamily="Nunito">OUR HOUSE RULES 🏠</text>
        <text x="100" y="70" fontSize="10" fill="#555" fontFamily="Nunito">1. We say please and thank you</text>
        <text x="100" y="88" fontSize="10" fill="#555" fontFamily="Nunito">2. We tidy up after ourselves</text>
        <text x="100" y="106" fontSize="10" fill="#555" fontFamily="Nunito">3. We say sorry when we're wrong</text>
        <text x="100" y="124" fontSize="10" fill="#555" fontFamily="Nunito">4. We hug when we're sad</text>
        <text x="100" y="142" fontSize="10" fill="#555" fontFamily="Nunito">5. We love each other ❤️</text>
        <text x="37" y="110" fontSize="28">✍️</text>
        <text x="272" y="110" fontSize="28">📌</text>
      </svg>
  };
  return <div className="w-full rounded-2xl overflow-hidden" style={{ height: 180 }}>{scenes[scene]}</div>;
}
function RulesStory() {
  const [page, setPage] = useState(0);
  const chapter = CHAPTERS[page];
  const total = CHAPTERS.length;
  const accent = "#4CAF50";
  const accentDark = "#2e7d32";
  return <div className="flex flex-col gap-3" style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: "#2e7d32" }}>
          Rules — A Picture Story
        </h3>
        <p className="text-xs text-gray-400 font-bold">Chapter {page + 1} of {total}</p>
      </div>

      <div className="flex justify-center gap-1.5">
        {CHAPTERS.map((c, i) => <button
    key={c.id}
    onClick={() => setPage(i)}
    className="rounded-full transition-all"
    style={{ width: i === page ? 24 : 10, height: 10, backgroundColor: i === page ? accent : i < page ? "#90EE90" : "#e5e7eb" }}
  />)}
      </div>

      <SceneIllustration scene={chapter.scene} />

      <div className="rounded-2xl p-4 bg-white border border-green-100" style={{ boxShadow: "0 2px 0 #c8e6c9" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{chapter.emoji}</span>
          <h4 className="font-extrabold text-gray-800 text-base leading-tight">{chapter.title}</h4>
        </div>
        <p className="text-gray-600 text-sm font-bold leading-relaxed">{chapter.body}</p>
      </div>

      <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ backgroundColor: "#F1F8E9", border: "2px solid #4CAF50" }}>
        <span className="text-lg flex-shrink-0">⭐</span>
        <p className="text-sm font-extrabold text-green-800">{chapter.fact}</p>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1">
        <button
    onClick={() => setPage((p) => Math.max(0, p - 1))}
    disabled={page === 0}
    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-extrabold text-sm disabled:opacity-30 transition-all active:translate-y-0.5"
    style={{ backgroundColor: accent, color: "white", boxShadow: page === 0 ? "none" : `0 3px 0 ${accentDark}` }}
  >
          ← Back
        </button>
        <span className="text-xs font-bold text-gray-400">{page + 1} / {total}</span>
        {page < total - 1 ? <button
    onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-extrabold text-sm transition-all active:translate-y-0.5"
    style={{ backgroundColor: accent, color: "white", boxShadow: `0 3px 0 ${accentDark}` }}
  >
            Next →
          </button> : <button
    onClick={() => setPage(0)}
    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-sm transition-all active:translate-y-0.5"
    style={{ backgroundColor: "#FF85A1", color: "white", boxShadow: "0 3px 0 #cc5a74" }}
  >
            Start Over 🔄
          </button>}
      </div>
    </div>;
}
export {
  RulesStory as default
};
