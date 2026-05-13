import { useState } from 'react'

const CHAPTERS = [
  {
    id: 'location',
    title: 'Where in the World is Egypt?',
    emoji: '🗺️',
    kind: 'map',
    body: "Egypt is in the northeast corner of Africa — right where the scorching Sahara Desert meets the sparkling Mediterranean Sea. It sits between two continents, which made it one of the most important places in the ancient world. Even today, over 100 million people call Egypt home!",
    fact: 'Egypt is about 6× bigger than the UK — and 90% of it is pure desert!',
  },
  {
    id: 'nile',
    title: 'The River That Gave Life — The Nile',
    emoji: '🌊',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Nile_River_Delta_from_orbit.jpg/800px-Nile_River_Delta_from_orbit.jpg',
    imgAlt: 'The Nile River Delta from space — the green stripe of life through the desert',
    imgCaption: 'NASA photo: The Nile glowing green through the tan desert',
    body: "Without the Nile River, Egypt would just be empty desert. Every year the Nile flooded, leaving behind rich black soil. Farmers planted wheat and vegetables in that soil, and the whole civilization was fed! The ancient Egyptians called this black soil 'kemet' — the black land — and they loved it.",
    fact: 'The Nile is the longest river in the world — 6,650 km! It flows north through the entire country.',
  },
  {
    id: 'pharaoh',
    title: 'The Pharaohs — Kings Like Gods',
    emoji: '👑',
    kind: 'illustrated',
    body: "The rulers of Ancient Egypt were called Pharaohs. People believed the pharaoh was a god on Earth — the son of Ra, the sun god! The pharaoh wore a special double crown, a striped headdress called a nemes, and carried a crook and flail (two royal symbols). The most famous pharaohs include Ramesses the Great, Queen Hatshepsut, and the boy king Tutankhamun — who was only 9 years old when he became pharaoh!",
    fact: 'Queen Hatshepsut ruled Egypt for over 20 years. She was one of history\'s most powerful female rulers!',
    decoration: ['𓂀', '𓆣', '𓅃'],
  },
  {
    id: 'pyramids',
    title: 'The Great Pyramids of Giza',
    emoji: '🔺',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1200px-Kheops-Pyramid.jpg',
    imgAlt: 'The Great Pyramid of Khufu at Giza',
    imgCaption: 'The Great Pyramid of Khufu — built 4,500 years ago',
    body: "The pyramids are the most famous buildings ever built. The Great Pyramid of Giza used over 2 million stone blocks — each one as heavy as a car! About 20,000 workers built it over 20 years. They used ramps, sledges, and water to slide the blocks into place. The pyramid was so perfectly built that you can barely fit a piece of paper between the stones!",
    fact: 'The Great Pyramid was the tallest building on Earth for 3,800 years — until the Eiffel Tower was built in 1889!',
  },
  {
    id: 'hieroglyphics',
    title: 'Writing in Pictures — Hieroglyphics',
    emoji: '📜',
    kind: 'hieroglyphs',
    body: "The ancient Egyptians invented one of the world's first writing systems — hieroglyphics! Instead of letters, they used over 700 different picture symbols. Each picture could stand for a sound, a word, or an idea. They wrote on papyrus (an early form of paper made from reeds), carved into stone walls, and painted inside tombs. For thousands of years, nobody could read hieroglyphics — until a French soldier found the Rosetta Stone in 1799!",
    fact: "The word 'hieroglyphics' comes from Greek, meaning 'sacred carvings.' They were considered the language of the gods.",
    symbols: [
      { glyph: '𓅓', name: 'owl = M' },
      { glyph: '𓆙', name: 'snake = F' },
      { glyph: '𓂋', name: 'mouth = R' },
      { glyph: '𓏏', name: 'bread = T' },
      { glyph: '𓃀', name: 'leg = B' },
      { glyph: '𓊪', name: 'stool = P' },
    ],
  },
  {
    id: 'life',
    title: 'Daily Life in Ancient Egypt',
    emoji: '🌾',
    kind: 'life',
    body: "Most Egyptians were farmers who grew wheat, barley, and flax along the Nile. Children helped their parents in the fields and learned their parent's trade. They wore light white linen clothing because Egypt is SO hot. Rich families wore gold jewellery and painted their eyes with dark kohl to protect from the bright sun. They played board games, music, and even had pet cats!",
    fact: 'Ancient Egyptians were among the first people to have pet cats — they even worshipped a cat goddess named Bastet!',
    clothing: ['👗 White linen robes', '💎 Gold necklaces', '👁️ Kohl eye paint', '🌿 Floral headdresses'],
  },
  {
    id: 'mummies',
    title: 'Mummies — Sleeping to Live Again',
    emoji: '⚱️',
    kind: 'mummy',
    body: "Ancient Egyptians believed that when you die, your soul goes on a magical journey to the afterlife — a beautiful paradise. But your soul needed your body to come back to! So they carefully preserved bodies by removing organs, drying the body with salt, wrapping it in thousands of metres of linen bandages, and placing it in a decorated golden case called a sarcophagus. The whole process took 70 days!",
    fact: "King Tutankhamun's tomb was found in 1922 — still FULL of treasure! Over 5,000 objects were inside, including a solid gold mask.",
    steps: ['Remove organs', 'Dry with salt', 'Wrap in bandages', 'Place in sarcophagus', 'Bury in pyramid'],
  },
]

function MapScene() {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden" style={{ background: '#B3D9F2', height: 220 }}>
      <svg viewBox="0 0 1000 500" className="w-full" style={{ height: 220, objectFit: 'cover' }}>
        <rect width="1000" height="500" fill="#B3D9F2" />
        <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeWidth="1.5" strokeDasharray="12,10" opacity="0.5" />
        <text x="12" y="253" fill="white" fontSize="11" opacity="0.7" fontFamily="Nunito, sans-serif" fontWeight="bold">Equator</text>
        <path d="M 422,218 L 533,213 L 558,249 L 568,305 L 558,375 L 532,445 L 495,468 L 453,465 L 416,436 L 394,389 L 393,328 L 407,268 L 418,244 Z" fill="#FFB347" stroke="#e89a2a" strokeWidth="2" />
        <path d="M 490,218 L 533,213 L 540,230 L 550,255 L 545,275 L 510,272 L 488,248 L 484,232 Z" fill="#cc0000" stroke="#900" strokeWidth="2" />
        <text x="512" y="248" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Nunito, sans-serif">EGYPT</text>
        <polygon points="512,205 520,218 504,218" fill="#FFD700" />
        <path d="M 510,280 L 505,255 L 510,235 L 512,215" stroke="#4FC3F7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
        <text x="525" y="268" fill="#4FC3F7" fontSize="9" fontWeight="bold" fontFamily="Nunito, sans-serif">Nile</text>
        <text x="480" y="200" fill="white" fontSize="9" fontFamily="Nunito, sans-serif" opacity="0.9">Mediterranean Sea</text>
        <path d="M 448,72 L 486,64 L 518,72 L 542,86 L 550,108 L 532,128 L 552,150 L 534,176 L 510,200 L 478,214 L 450,210 L 424,193 L 416,170 L 420,136 L 435,108 Z" fill="#87CEEB88" stroke="#aaa" strokeWidth="1.5" />
        <text x="480" y="160" textAnchor="middle" fill="#555" fontSize="10" fontFamily="Nunito, sans-serif">Europe</text>
        <path d="M 560,130 L 640,100 L 750,100 L 820,140 L 800,200 L 720,230 L 640,230 L 580,210 L 555,180 Z" fill="#FF85A188" stroke="#aaa" strokeWidth="1.5" />
        <text x="680" y="175" textAnchor="middle" fill="#555" fontSize="10" fontFamily="Nunito, sans-serif">Asia</text>
      </svg>
      <div className="absolute bottom-2 right-2 flex gap-1.5">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold" style={{ backgroundColor: '#cc000099', color: 'white' }}>🔴 Egypt</div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold" style={{ backgroundColor: '#4FC3F799', color: 'white' }}>💧 Nile</div>
      </div>
    </div>
  )
}

function ImageScene({ img, imgAlt, imgCaption }) {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden" style={{ height: 220 }}>
      <img src={img} alt={imgAlt} className="w-full h-full object-cover" style={{ height: 220 }} onError={e => { e.target.style.display = 'none' }} />
      <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.65))' }}>
        <p className="text-white text-xs font-bold">{imgCaption}</p>
      </div>
    </div>
  )
}

function HieroglyphsScene({ symbols }) {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden p-4" style={{ height: 220, background: 'linear-gradient(160deg, #8B6914, #c8a84b, #e8c96b)' }}>
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-yellow-900 uppercase tracking-widest">Some Real Hieroglyphs!</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {symbols.map(s => (
          <div key={s.name} className="flex flex-col items-center gap-0.5 rounded-xl py-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <span className="text-3xl">{s.glyph}</span>
            <span className="text-xs font-bold text-yellow-900 text-center leading-tight">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-xs text-yellow-900 font-bold opacity-80">𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋</div>
    </div>
  )
}

function LifeScene({ clothing }) {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden p-4" style={{ height: 220, background: 'linear-gradient(160deg, #c8860b, #e8b84b, #f5d57a)' }}>
      <div className="text-center mb-3">
        <p className="text-xs font-bold text-yellow-900 uppercase tracking-widest">What Egyptians Wore</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {clothing.map(item => (
          <div key={item} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
            <span className="text-lg">{item.split(' ')[0]}</span>
            <span className="text-xs font-bold text-yellow-900 leading-tight">{item.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <span className="text-2xl">🐱</span>
        <span className="text-xs font-bold text-yellow-900 ml-2">They kept pet cats — sacred animals!</span>
      </div>
    </div>
  )
}

function MummyScene({ steps }) {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden p-4" style={{ height: 220, background: 'linear-gradient(160deg, #2c1a6e, #4a2a8a, #6b3fa0)' }}>
      <div className="text-center mb-2">
        <p className="text-xs font-bold text-purple-200 uppercase tracking-widest">How to Make a Mummy</p>
      </div>
      <div className="flex flex-col gap-1.5">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#FFD700', color: '#2c1a6e' }}>{i + 1}</div>
            <span className="text-sm font-bold text-white">{step}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-3 right-3 text-3xl">⚱️</div>
    </div>
  )
}

function PharaohScene({ decoration }) {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden flex flex-col items-center justify-center gap-3"
      style={{ height: 220, background: 'linear-gradient(160deg, #b8860b, #daa520, #ffd700, #c8860b)' }}>
      <div className="flex gap-4 text-4xl">{decoration.map(d => <span key={d}>{d}</span>)}</div>
      <div className="text-center px-4">
        <div className="text-6xl mb-1">👑</div>
        <p className="text-yellow-900 font-bold text-sm">Pharaoh — Son of Ra, the Sun God</p>
      </div>
      <div className="flex gap-4 text-2xl opacity-70">{[...decoration].reverse().map(d => <span key={d + 'r'}>{d}</span>)}</div>
      <div className="absolute inset-0 pointer-events-none" style={{ border: '8px solid rgba(255,215,0,0.4)', borderRadius: 16, margin: 4 }} />
    </div>
  )
}

export default function EgyptStory() {
  const [page, setPage] = useState(0)
  const chapter = CHAPTERS[page]
  const total = CHAPTERS.length

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: '#b8860b', fontFamily: 'Nunito, sans-serif' }}>
          Ancient Egypt: A Picture Story
        </h3>
        <p className="text-xs text-gray-400 font-bold">Chapter {page + 1} of {total}</p>
      </div>

      <div className="flex justify-center gap-1.5">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} onClick={() => setPage(i)} className="rounded-full transition-all"
            style={{ width: i === page ? 24 : 10, height: 10, backgroundColor: i === page ? '#daa520' : i < page ? '#90EE90' : '#e5e7eb' }} />
        ))}
      </div>

      <div>
        {chapter.kind === 'map'         && <MapScene />}
        {chapter.kind === 'image'       && <ImageScene img={chapter.img} imgAlt={chapter.imgAlt} imgCaption={chapter.imgCaption} />}
        {chapter.kind === 'hieroglyphs' && <HieroglyphsScene symbols={chapter.symbols} />}
        {chapter.kind === 'life'        && <LifeScene clothing={chapter.clothing} />}
        {chapter.kind === 'mummy'       && <MummyScene steps={chapter.steps} />}
        {chapter.kind === 'illustrated' && <PharaohScene decoration={chapter.decoration} />}
      </div>

      <div className="rounded-2xl p-4 bg-white border border-yellow-100" style={{ boxShadow: '0 2px 0 #f0d080', fontFamily: 'Nunito, sans-serif' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{chapter.emoji}</span>
          <h4 className="font-extrabold text-gray-800 text-base leading-tight">{chapter.title}</h4>
        </div>
        <p className="text-gray-600 text-sm font-bold leading-relaxed">{chapter.body}</p>
      </div>

      <div className="rounded-2xl px-4 py-3 flex items-start gap-2" style={{ backgroundColor: '#FFF9E6', border: '2px solid #FFD700' }}>
        <span className="text-lg flex-shrink-0">⭐</span>
        <p className="text-sm font-extrabold text-yellow-800">{chapter.fact}</p>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
          className="press-btn flex items-center gap-1.5 px-5 py-2.5 rounded-chunky font-display text-sm disabled:opacity-30"
          style={{ backgroundColor: '#daa520', color: 'white', boxShadow: page === 0 ? 'none' : '0 3px 0 #a0720a' }}>
          ← Back
        </button>
        <span className="text-xs font-bold text-gray-400">{page + 1} / {total}</span>
        {page < total - 1 ? (
          <button onClick={() => setPage(p => Math.min(total - 1, p + 1))}
            className="press-btn flex items-center gap-1.5 px-5 py-2.5 rounded-chunky font-display text-sm"
            style={{ backgroundColor: '#daa520', color: 'white', boxShadow: '0 3px 0 #a0720a' }}>
            Next →
          </button>
        ) : (
          <button onClick={() => setPage(0)}
            className="press-btn flex items-center gap-1.5 px-4 py-2.5 rounded-chunky font-display text-sm"
            style={{ backgroundColor: '#FF85A1', color: 'white', boxShadow: '0 3px 0 #cc5a74' }}>
            Start Over 🔄
          </button>
        )}
      </div>
    </div>
  )
}
