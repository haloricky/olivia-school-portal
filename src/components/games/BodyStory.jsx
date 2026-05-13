import { useState } from 'react'

const CHAPTERS = [
  {
    id: 'overview',
    title: 'Your Amazing Body!',
    emoji: '🧍',
    kind: 'diagram',
    body: "Your body is the most incredible machine in the whole universe! Right now, without you even thinking about it, your heart is beating, your lungs are breathing, your brain is thinking, and your muscles are holding you up. You have about 37 trillion tiny cells all working together — just for YOU!",
    fact: "Your body has 37 trillion cells — that's 37,000,000,000,000! If you counted one per second, it would take over a million years!",
  },
  {
    id: 'heart',
    title: "The Heart — Your Body's Pump",
    emoji: '❤️',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Heart_anterior_exterior_view.png/330px-Heart_anterior_exterior_view.png',
    imgAlt: 'The human heart showing its chambers and blood vessels',
    imgCaption: "Your heart — about the size of your fist, beating 100,000 times a day!",
    body: "Your heart is a super-strong muscle that pumps blood all around your body — every single second, day and night, even while you sleep! It's about the same size as your fist. Every beat sends fresh blood with oxygen out to your fingers, toes, brain, and every part of you. In one day, your heart beats about 100,000 times without ever taking a break!",
    fact: "Put your hand on your chest — can you feel it? That THUMP is your heart pumping blood through 100,000 km of blood vessels!",
  },
  {
    id: 'lungs',
    title: 'The Lungs — Breathing in Life',
    emoji: '💨',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lungs_diagram_detailed.svg/330px-Lungs_diagram_detailed.svg.png',
    imgAlt: 'Detailed diagram of the human lungs',
    imgCaption: 'Your two lungs — they fill with fresh air 20,000 times every day!',
    body: "Take a deep breath in... and out! That's your lungs working. You have two lungs — one on the left and one on the right — that look like two pink sponges inside your chest. When you breathe in, air travels down your throat and fills tiny little air sacs in your lungs. There, oxygen jumps into your blood, and carbon dioxide (waste gas) jumps out to be breathed away.",
    fact: "You breathe about 20,000 times a day! Lay flat — notice how your tummy rises? That's your diaphragm muscle pulling your lungs open.",
  },
  {
    id: 'brain',
    title: 'The Brain — Mission Control!',
    emoji: '🧠',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Brain_autopsy_lateral_view.jpg/330px-Brain_autopsy_lateral_view.jpg',
    imgAlt: 'The human brain showing its folds and structure',
    imgCaption: 'The brain — 86 billion neurons all connected, sending messages at lightning speed',
    body: "Your brain is the boss of your whole body! It sits safely inside your skull and sends messages to every part of you faster than lightning. It controls everything — moving, thinking, feeling, dreaming, remembering, and even digesting your food. The brain has different parts: the front part helps you think and make decisions, the back part controls movement and balance.",
    fact: "Your brain is 75% water and uses 20% of all your body's energy — even though it's only 2% of your body weight. It never fully switches off, even when you sleep!",
  },
  {
    id: 'senses',
    title: 'Your 5 Amazing Senses',
    emoji: '👁️',
    kind: 'double',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Human_eye_with_blood_vessels.jpg/330px-Human_eye_with_blood_vessels.jpg',
    imgAlt: 'A close-up of a human eye showing the iris and blood vessels',
    imgCaption: 'Your eye — with 130 million light-detecting cells!',
    img2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Human_right_ear_%28cropped%29.jpg/330px-Human_right_ear_%28cropped%29.jpg',
    img2Alt: 'A close-up of a human ear',
    img2Caption: 'Your ear — detects vibrations in the air as sound!',
    body: "You have 5 senses that tell your brain everything about the world around you! Seeing (eyes), Hearing (ears), Smelling (nose), Tasting (tongue), and Touching (skin). Each sense has special cells that detect information and send it racing to your brain. Close your eyes — what can you hear? What can you smell? Your senses are always working!",
    fact: "Your nose can smell over 1 trillion different smells! And your skin — the largest organ in your body — has millions of touch sensors.",
  },
  {
    id: 'bones',
    title: "Bones and Muscles — Your Body's Frame",
    emoji: '🦴',
    kind: 'double',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Human-Skeleton.jpg/330px-Human-Skeleton.jpg',
    imgAlt: 'A full human skeleton',
    imgCaption: 'Your skeleton — 206 bones that protect, support, and move you!',
    img2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Types_of_muscle.webp/330px-Types_of_muscle.webp.png',
    img2Alt: 'Diagram showing different types of muscle tissue',
    img2Caption: 'Your muscles — over 600 of them working together!',
    body: "Inside you is an amazing framework of 206 bones called your skeleton! Bones protect your organs (your skull protects your brain, your ribs protect your heart and lungs) and give your body its shape. Attached to your bones are over 600 muscles. When your brain tells a muscle to tighten, it pulls the bone and — you move! Try bending your arm — feel the muscle get hard?",
    fact: "Babies are born with about 270 bones, but as you grow, some bones fuse together. By the time you're an adult, you'll have exactly 206!",
  },
  {
    id: 'healthy',
    title: 'Keeping Your Body Strong',
    emoji: '🥦',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
    imgAlt: 'A colourful display of healthy fruits and vegetables',
    imgCaption: 'Eat a rainbow of fruits and vegetables to keep your body strong!',
    body: "Your body is amazing — but it needs your help to stay strong! Eat colourful fruits and vegetables (they have vitamins!), drink plenty of water, run and play every day (exercise makes your heart and muscles stronger), sleep 10–12 hours a night (your brain repairs itself while you sleep!), and wash your hands to keep germs away. Love your body and it will love you back!",
    fact: "Your body replaces most of its cells every 7–10 years. The food you eat today literally becomes part of YOU tomorrow!",
  },
]

function BodyDiagram() {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #E8F4FD 100%)', height: 300 }}>
      <svg viewBox="0 0 260 300" width="180" height="300">
        <ellipse cx="130" cy="42" rx="32" ry="36" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="2" />
        <circle cx="118" cy="38" r="5" fill="white" stroke="#555" strokeWidth="1.5" />
        <circle cx="142" cy="38" r="5" fill="white" stroke="#555" strokeWidth="1.5" />
        <circle cx="119" cy="38" r="2.5" fill="#6B4226" />
        <circle cx="143" cy="38" r="2.5" fill="#6B4226" />
        <path d="M 120 50 Q 130 58 140 50" fill="none" stroke="#e8a080" strokeWidth="2" strokeLinecap="round" />
        <rect x="119" y="76" width="22" height="14" rx="4" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="1.5" />
        <rect x="95" y="88" width="70" height="90" rx="18" fill="#FF85A155" stroke="#FF85A1" strokeWidth="2" />
        <path d="M 122 115 C 122 110 115 107 115 114 C 115 121 122 127 122 127 C 122 127 129 121 129 114 C 129 107 122 110 122 115 Z" fill="#FF4D6D" opacity="0.9" />
        <ellipse cx="111" cy="120" rx="8" ry="13" fill="#FFB3C1" opacity="0.8" />
        <ellipse cx="133" cy="120" rx="8" ry="13" fill="#FFB3C1" opacity="0.8" />
        <ellipse cx="130" cy="36" rx="18" ry="16" fill="#DDA0DD33" />
        <text x="130" y="40" textAnchor="middle" fontSize="14">🧠</text>
        <rect x="62" y="92" width="35" height="16" rx="8" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="1.5" transform="rotate(15 62 100)" />
        <rect x="163" y="92" width="35" height="16" rx="8" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="1.5" transform="rotate(-15 198 100)" />
        <rect x="102" y="175" width="22" height="70" rx="10" fill="#87CEEB" stroke="#5aa0bd" strokeWidth="1.5" />
        <rect x="136" y="175" width="22" height="70" rx="10" fill="#87CEEB" stroke="#5aa0bd" strokeWidth="1.5" />
        <ellipse cx="113" cy="248" rx="14" ry="8" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="1.5" />
        <ellipse cx="147" cy="248" rx="14" ry="8" fill="#FFD9A0" stroke="#e8b87a" strokeWidth="1.5" />
        <line x1="165" y1="36" x2="190" y2="20" stroke="#9b59b6" strokeWidth="1" strokeDasharray="3,2" />
        <text x="192" y="18" fontSize="9" fill="#9b59b6" fontWeight="bold" fontFamily="Nunito, sans-serif">Brain</text>
        <line x1="130" y1="115" x2="175" y2="115" stroke="#FF4D6D" strokeWidth="1" strokeDasharray="3,2" />
        <text x="177" y="118" fontSize="9" fill="#FF4D6D" fontWeight="bold" fontFamily="Nunito, sans-serif">Heart</text>
        <line x1="115" y1="128" x2="75" y2="128" stroke="#FF85A1" strokeWidth="1" strokeDasharray="3,2" />
        <text x="40" y="131" fontSize="9" fill="#FF85A1" fontWeight="bold" fontFamily="Nunito, sans-serif">Lungs</text>
        <line x1="113" y1="210" x2="75" y2="210" stroke="#5aa0bd" strokeWidth="1" strokeDasharray="3,2" />
        <text x="34" y="213" fontSize="9" fill="#5aa0bd" fontWeight="bold" fontFamily="Nunito, sans-serif">Bones</text>
      </svg>
    </div>
  )
}

function ImgCard({ src, alt, caption, height = 300 }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="w-full rounded-chunky flex items-center justify-center text-gray-400 text-sm font-bold"
        style={{ height, background: '#f3f4f6', border: '2px dashed #d1d5db' }}>
        📷 Image unavailable
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-chunky overflow-hidden" style={{ height }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#fef3c7' }}>
          <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
        </div>
      )}
      <img src={src} alt={alt} className="w-full h-full object-cover transition-opacity duration-300"
        style={{ height, opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)} onError={() => setErrored(true)} />
      <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5"
        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
        <p className="text-white text-xs font-bold">{caption}</p>
      </div>
    </div>
  )
}

function DoubleImageScene({ img, imgAlt, imgCaption, img2, img2Alt, img2Caption }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ImgCard src={img} alt={imgAlt} caption={imgCaption} height={220} />
      <ImgCard src={img2} alt={img2Alt} caption={img2Caption} height={220} />
    </div>
  )
}

function ChapterScene({ chapter }) {
  if (chapter.kind === 'diagram') return <BodyDiagram />
  if (chapter.kind === 'image') return <ImgCard src={chapter.img} alt={chapter.imgAlt} caption={chapter.imgCaption} />
  if (chapter.kind === 'double') return (
    <DoubleImageScene img={chapter.img} imgAlt={chapter.imgAlt} imgCaption={chapter.imgCaption}
      img2={chapter.img2} img2Alt={chapter.img2Alt} img2Caption={chapter.img2Caption} />
  )
  return null
}

export default function BodyStory() {
  const [page, setPage] = useState(0)
  const chapter = CHAPTERS[page]
  const total = CHAPTERS.length
  const accent = '#4FC3F7'
  const accentDark = '#2a9fc7'

  return (
    <div className="flex flex-col gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: '#2a9fc7' }}>My Amazing Body: A Picture Story</h3>
        <p className="text-xs text-gray-400 font-bold">Chapter {page + 1} of {total}</p>
      </div>

      <div className="flex justify-center gap-1.5">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} onClick={() => setPage(i)} className="rounded-full transition-all"
            style={{ width: i === page ? 24 : 10, height: 10, backgroundColor: i === page ? accent : i < page ? '#90EE90' : '#e5e7eb' }} />
        ))}
      </div>

      <ChapterScene chapter={chapter} />

      <div className="rounded-2xl p-4 bg-white border border-blue-100" style={{ boxShadow: '0 2px 0 #b3e5fc' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{chapter.emoji}</span>
          <h4 className="font-extrabold text-gray-800 text-base leading-tight">{chapter.title}</h4>
        </div>
        <p className="text-gray-600 text-sm font-bold leading-relaxed">{chapter.body}</p>
      </div>

      <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ backgroundColor: '#E8F4FD', border: '2px solid #4FC3F7' }}>
        <span className="text-lg flex-shrink-0">⭐</span>
        <p className="text-sm font-extrabold" style={{ color: '#0e6c9e' }}>{chapter.fact}</p>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-chunky font-display text-sm disabled:opacity-30 transition-all active:translate-y-0.5"
          style={{ backgroundColor: accent, color: 'white', boxShadow: page === 0 ? 'none' : `0 3px 0 ${accentDark}` }}>
          ← Back
        </button>
        <span className="text-xs font-bold text-gray-400">{page + 1} / {total}</span>
        {page < total - 1 ? (
          <button onClick={() => setPage(p => Math.min(total - 1, p + 1))}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-chunky font-display text-sm transition-all active:translate-y-0.5"
            style={{ backgroundColor: accent, color: 'white', boxShadow: `0 3px 0 ${accentDark}` }}>
            Next →
          </button>
        ) : (
          <button onClick={() => setPage(0)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-chunky font-display text-sm transition-all active:translate-y-0.5"
            style={{ backgroundColor: '#FF85A1', color: 'white', boxShadow: '0 3px 0 #cc5a74' }}>
            Start Over 🔄
          </button>
        )}
      </div>
    </div>
  )
}
