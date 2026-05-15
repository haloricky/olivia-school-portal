import { useState } from 'react'

const BATIK_COLORS = ['#8B1A4A','#FFD700','#1a4a7a','#4a7a1a','#7a1a4a','#4a1a7a']

const CHAPTERS = [
  { id: 'what', title: 'What Is Batik?', emoji: '🎨', kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Batik_Trusmi_Cirebon_%2823%29.jpg/330px-Batik_Trusmi_Cirebon_%2823%29.jpg',
    imgAlt: 'Beautiful batik fabric from Cirebon, Indonesia showing intricate patterns',
    imgCaption: 'Batik Trusmi from Cirebon — Indonesia\'s most famous handmade fabric art',
    body: "Batik is Indonesia's most famous art! It's a special way of making beautiful patterns on fabric. The word 'batik' comes from Javanese — 'amba' means 'to write' and 'nitik' means 'dot'. So batik literally means 'writing with dots'! Every piece of batik is unique — no two pieces are exactly the same. That's what makes it magical.",
    fact: 'Indonesia has over 5,000 different batik patterns! Each pattern tells a story about where it comes from and what it means.' },
  { id: 'howmade', title: 'How Is Batik Made?', emoji: '🕯️', kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tjanting.jpg/330px-Tjanting.jpg',
    imgAlt: 'A canting tool used to apply hot wax in batik making',
    imgCaption: 'The canting — a tiny copper cup on a bamboo stick, used to draw patterns with hot wax',
    body: "Making batik is like a secret art! First, a craftsperson draws the design on plain white fabric. Then they use a special tool called a canting (chan-ting) — a tiny copper cup filled with hot wax — to carefully trace every line of the pattern. The wax protects those areas from absorbing dye. Then the fabric is dipped in colorful dye. Finally, the wax is washed off — and the beautiful pattern appears!",
    fact: 'A single piece of batik tulis (hand-drawn batik) can take 3–6 months to make! That\'s why it\'s so precious and valuable.' },
  { id: 'patterns', title: 'Famous Patterns — Each Tells a Story', emoji: '🌿', kind: 'svgpattern',
    body: "Different regions of Indonesia have their own unique batik patterns! Batik from Yogyakarta often uses brown and cream colours with geometric shapes. Solo batik tends to be more delicate and fine. Pekalongan batik has bright rainbow colours influenced by Chinese and Dutch traders. Cirebon batik features sea creatures and clouds — because it's a coastal city!",
    fact: 'The most sacred batik pattern is called Parang. In the royal court of Yogyakarta, only the king and royal family were allowed to wear it!' },
  { id: 'regions', title: 'Batik Across Indonesia', emoji: '🗺️', kind: 'svgmap',
    body: "Batik is made all across the Indonesian archipelago — not just in Java! Batik Madura has bold red, blue, and black colours. Batik Bali often features Balinese gods and nature scenes. Batik Kalimantan uses dayak tribal patterns. Even Papua has its own batik! Each island's batik reflects its people's stories and environment.",
    fact: 'Indonesia exports batik to over 20 countries! People all over the world love wearing this beautiful fabric from our archipelago.' },
  { id: 'unesco', title: 'Recognised by the World — UNESCO 2009', emoji: '🏆', kind: 'svgunesco',
    body: "In 2009, UNESCO officially recognised Indonesian batik as an 'Intangible Cultural Heritage of Humanity'. This is like winning the gold medal of world culture! It means the whole world agrees that batik is precious and must be protected. Indonesia is very proud of this recognition.",
    fact: 'When UNESCO announced the recognition on 2 October 2009, Indonesia declared that date \"National Batik Day\". Now every 2nd October, Indonesians wear batik everywhere!' },
  { id: 'design', title: 'Design Your Own Batik!', emoji: '✨', kind: 'interactive',
    body: "Now it's your turn to be a batik artist! Choose your colours and tap the pattern squares to colour them. Create your very own batik design! Real batik artists spend months on a single piece — you get to create yours in minutes!",
    fact: "Today's activity: Try making paper batik! Draw a pattern with a white wax crayon on paper, then paint over it with watercolour. The pattern magically appears — just like real batik wax-resist!" },
]

function ImgCard({ src, alt, caption }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  if (errored) return (
    <div className="w-full rounded-2xl flex items-center justify-center text-gray-400 text-sm font-bold"
      style={{ height: 280, background: '#f3f4f6', border: '2px dashed #d1d5db' }}>📷 Image unavailable</div>
  )
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 280 }}>
      {!loaded && <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#fef3c7' }}>
        <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" /></div>}
      <img src={src} alt={alt} className="w-full h-full object-cover transition-opacity duration-300"
        style={{ height: 280, opacity: loaded ? 1 : 0 }} onLoad={() => setLoaded(true)} onError={() => setErrored(true)} />
      <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
        <p className="text-white text-xs font-bold">{caption}</p>
      </div>
    </div>
  )
}

function PatternScene() {
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-2xl" style={{ height: 200 }}>
      <rect width="320" height="200" fill="#FFF9F0" rx="12" />
      <rect x="10" y="20" width="90" height="160" rx="8" fill="#f5e6cc" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <g key={i}><path d={`M ${15 + (i%2)*10} ${30+i*18} L 90 ${30+i*18}`} stroke="#8B1A4A" strokeWidth="1.5" /><circle cx={20+(i%3)*20} cy={38+i*18} r={5} fill="none" stroke="#8B1A4A" strokeWidth="1" /></g>
      ))}
      <text x="55" y="195" textAnchor="middle" fontSize="9" fill="#8B1A4A" fontWeight="bold" fontFamily="Nunito">Jogja</text>
      <rect x="115" y="20" width="90" height="160" rx="8" fill="#fff" stroke="#FFB347" strokeWidth="1.5" />
      {['🌺','🦋','🌸','🐦','🌺','🦋','🌸','🐦'].map((e,i) => (
        <text key={i} x={120+(i%2)*40} y={45+Math.floor(i/2)*38} fontSize="22">{e}</text>
      ))}
      <text x="160" y="195" textAnchor="middle" fontSize="9" fill="#e07000" fontWeight="bold" fontFamily="Nunito">Pekalongan</text>
      <rect x="220" y="20" width="90" height="160" rx="8" fill="#e8f4f8" />
      {[0,1,2].map(i => (
        <g key={i}><circle cx={265} cy={60+i*50} r={22} fill="none" stroke="#4a90c0" strokeWidth="2" /><text x={265} y={64+i*50} textAnchor="middle" fontSize="14">☁️</text></g>
      ))}
      <text x="265" y="195" textAnchor="middle" fontSize="9" fill="#4a90c0" fontWeight="bold" fontFamily="Nunito">Cirebon</text>
    </svg>
  )
}

function MapScene() {
  const pins = [
    {label:'Jogja',x:145,y:120,color:'#8B1A4A'},{label:'Pekalongan',x:128,y:105,color:'#FFB347'},
    {label:'Cirebon',x:140,y:112,color:'#4a90c0'},{label:'Madura',x:178,y:108,color:'#e03030'},
    {label:'Bali',x:198,y:122,color:'#FFD700'},{label:'Kalimantan',x:208,y:72,color:'#4CAF50'},
  ]
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-2xl" style={{ height: 200 }}>
      <rect width="320" height="200" fill="#B3D9F2" rx="12" />
      {pins.map(p => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={12} fill={p.color} opacity={0.9} />
          <text x={p.x} y={p.y+4} textAnchor="middle" fontSize="10">🎨</text>
          <text x={p.x} y={p.y+22} textAnchor="middle" fontSize="7" fill={p.color} fontWeight="bold" fontFamily="Nunito">{p.label}</text>
        </g>
      ))}
      <text x="160" y="185" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold" fontFamily="Nunito">Indonesia — Batik Everywhere!</text>
    </svg>
  )
}

function UnescoScene() {
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-2xl" style={{ height: 200 }}>
      <rect width="320" height="200" fill="#FFF9E6" rx="12" />
      <polygon points="160,20 180,70 235,70 190,100 205,155 160,125 115,155 130,100 85,70 140,70" fill="#FFD700" stroke="#e0a000" strokeWidth="2" />
      <text x="160" y="100" textAnchor="middle" fontSize="28">🏆</text>
      <rect x="60" y="162" width="200" height="28" rx="8" fill="#8B1A4A" />
      <text x="160" y="181" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" fontFamily="Nunito">UNESCO Heritage 2009</text>
    </svg>
  )
}

function InteractiveBatik() {
  const GRID = 5
  const [colors, setColors] = useState(() => Array(GRID*GRID).fill('#f5e6cc'))
  const [activeColor, setActiveColor] = useState(BATIK_COLORS[0])
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, width: 220 }}>
        {colors.map((c, i) => (
          <button key={i} onClick={() => setColors(prev => { const n=[...prev]; n[i]=activeColor; return n })}
            className="rounded-lg transition-all active:scale-90"
            style={{ width:40,height:40,backgroundColor:c,border:'2px solid #ddd',
              backgroundImage:`radial-gradient(circle at 50% 50%, ${c}88 30%, transparent 70%), repeating-linear-gradient(45deg, ${c}44 0px, ${c}44 4px, transparent 4px, transparent 8px)` }} />
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-xs font-bold text-gray-500">Pick colour:</span>
        {BATIK_COLORS.map(c => (
          <button key={c} onClick={() => setActiveColor(c)} className="rounded-full transition-all active:scale-90"
            style={{ width:28,height:28,backgroundColor:c,border:activeColor===c?'3px solid white':'2px solid #ddd',boxShadow:activeColor===c?`0 0 0 3px ${c}`:'none' }} />
        ))}
        <button onClick={() => setColors(Array(GRID*GRID).fill('#f5e6cc'))}
          className="px-2 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100">Clear</button>
      </div>
    </div>
  )
}

function ChapterScene({ chapter }) {
  if (chapter.kind === 'image') return <ImgCard src={chapter.img} alt={chapter.imgAlt} caption={chapter.imgCaption} />
  if (chapter.kind === 'svgpattern') return <PatternScene />
  if (chapter.kind === 'svgmap') return <MapScene />
  if (chapter.kind === 'svgunesco') return <UnescoScene />
  if (chapter.kind === 'interactive') return <InteractiveBatik />
  return null
}

export default function BatikStory() {
  const [page, setPage] = useState(0)
  const chapter = CHAPTERS[page]
  const total = CHAPTERS.length
  const accent = '#8B1A4A'; const accentDark = '#5a0e2e'

  return (
    <div className="flex flex-col gap-3 font-display">
      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: accent }}>Batik — Indonesia's Living Art</h3>
        <p className="text-xs text-gray-400 font-bold">Chapter {page + 1} of {total}</p>
      </div>
      <div className="flex justify-center gap-1.5">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} onClick={() => setPage(i)} className="rounded-full transition-all"
            style={{ width: i===page?24:10, height:10, backgroundColor: i===page?accent:i<page?'#FFD700':'#e5e7eb' }} />
        ))}
      </div>
      <ChapterScene chapter={chapter} />
      <div className="rounded-2xl p-4 bg-white border border-pink-100" style={{ boxShadow: '0 2px 0 #f8d0d8' }}>
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
        <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-extrabold text-sm disabled:opacity-30 transition-all active:translate-y-0.5"
          style={{ backgroundColor:accent, color:'white', boxShadow:page===0?'none':`0 3px 0 ${accentDark}` }}>← Back</button>
        <span className="text-xs font-bold text-gray-400">{page+1} / {total}</span>
        {page < total-1 ? (
          <button onClick={() => setPage(p => Math.min(total-1, p+1))}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-extrabold text-sm transition-all active:translate-y-0.5"
            style={{ backgroundColor:accent, color:'white', boxShadow:`0 3px 0 ${accentDark}` }}>Next →</button>
        ) : (
          <button onClick={() => setPage(0)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-sm transition-all active:translate-y-0.5"
            style={{ backgroundColor:'#FF85A1', color:'white', boxShadow:'0 3px 0 #cc5a74' }}>Start Over 🔄</button>
        )}
      </div>
    </div>
  )
}
