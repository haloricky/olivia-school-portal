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
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Nile_3rd_Cataract_Left.jpg/330px-Nile_3rd_Cataract_Left.jpg',
    imgAlt: 'The Nile River flowing through the desert',
    imgCaption: 'The Nile River — a green stripe of life cutting through the desert',
    body: "Without the Nile River, Egypt would just be empty desert. Every year the Nile flooded, leaving behind rich black soil. Farmers planted wheat and vegetables in that soil, and the whole civilization was fed! The ancient Egyptians called this black soil 'kemet' — the black land — and they loved it.",
    fact: 'The Nile is the longest river in the world — 6,650 km! It flows north through the entire country.',
  },
  {
    id: 'pharaoh',
    title: 'The Pharaohs — Kings Like Gods',
    emoji: '👑',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/330px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg',
    imgAlt: 'The golden mask of Tutankhamun in the Cairo Egyptian Museum',
    imgCaption: "Tutankhamun's solid gold mask — the most photographed object in the world",
    body: "The rulers of Ancient Egypt were called Pharaohs. People believed the pharaoh was a god on Earth — the son of Ra, the sun god! They wore special crowns and carried a crook and flail as royal symbols. The most famous pharaoh is Tutankhamun — the 'boy king' who became pharaoh at just 9 years old! Queen Hatshepsut was one of history's most powerful female rulers.",
    fact: "When Tutankhamun's tomb was discovered in 1922, his golden mask was still perfectly in place — after 3,300 years!",
  },
  {
    id: 'pyramids',
    title: 'The Great Pyramids of Giza',
    emoji: '🔺',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/330px-All_Gizah_Pyramids.jpg',
    imgAlt: 'All three pyramids at Giza with camels in the foreground',
    imgCaption: 'The three Great Pyramids of Giza — still standing after 4,500 years',
    body: "The pyramids are the most famous buildings ever built. The Great Pyramid of Giza used over 2 million stone blocks — each one as heavy as a car! About 20,000 workers built it over 20 years. They used ramps, sledges, and water to slide the massive blocks into place. The pyramid was so perfectly built that you can barely fit a piece of paper between the stones!",
    fact: 'The Great Pyramid was the tallest building on Earth for 3,800 years — until the Eiffel Tower was built in 1889!',
  },
  {
    id: 'hieroglyphics',
    title: 'Writing in Pictures — Hieroglyphics',
    emoji: '📜',
    kind: 'double',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Hieroglyphs_from_the_tomb_of_Seti_I.jpg/330px-Hieroglyphs_from_the_tomb_of_Seti_I.jpg',
    imgAlt: "Hieroglyphs painted on the wall of Seti I's tomb",
    imgCaption: "Real hieroglyphs from the tomb of Pharaoh Seti I",
    img2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/330px-Rosetta_Stone.JPG',
    img2Alt: 'The Rosetta Stone',
    img2Caption: 'The Rosetta Stone — the key that unlocked hieroglyphics',
    body: "The ancient Egyptians invented one of the world's first writing systems — hieroglyphics! Instead of letters, they used over 700 different picture symbols. Each picture could stand for a sound, a word, or an idea. They wrote on papyrus (early paper made from reeds) and carved into stone walls. Nobody could read hieroglyphics for thousands of years — until the Rosetta Stone was found in 1799!",
    fact: "The word 'hieroglyphics' comes from Greek, meaning 'sacred carvings.' They were considered the language of the gods.",
  },
  {
    id: 'life',
    title: 'Daily Life in Ancient Egypt',
    emoji: '🌾',
    kind: 'image',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Egyptian_harvest.jpg/330px-Egyptian_harvest.jpg',
    imgAlt: 'Ancient Egyptian painting showing people harvesting crops',
    imgCaption: 'Ancient Egyptian tomb painting showing farmers harvesting grain',
    body: "Most Egyptians were farmers who grew wheat, barley, and flax along the Nile. They wore light white linen clothing because Egypt is SO hot. Rich families wore gold jewellery and painted their eyes with dark kohl to protect from the bright sun. Children helped in the fields and learned crafts. They played board games, made music — and had pet cats!",
    fact: 'Ancient Egyptians were among the first people to keep pet cats — they even worshipped a cat goddess named Bastet!',
  },
  {
    id: 'mummies',
    title: 'Mummies — Sleeping to Live Again',
    emoji: '⚱️',
    kind: 'double',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Ramses_I_Mummy.jpg/330px-Ramses_I_Mummy.jpg',
    imgAlt: 'The mummy of Pharaoh Ramses I',
    imgCaption: 'The mummy of Pharaoh Ramses I — preserved for over 3,000 years',
    img2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Ancient_Egyptian_Sarcophagus_lid.jpg/330px-Ancient_Egyptian_Sarcophagus_lid.jpg',
    img2Alt: 'An ancient Egyptian sarcophagus lid',
    img2Caption: 'A golden sarcophagus — the decorated coffin that held the mummy',
    body: "Ancient Egyptians believed that when you die, your soul goes on a magical journey to the afterlife — a beautiful paradise. But your soul needed your body to come back to! So they carefully preserved bodies: removing organs, drying with salt, wrapping in linen bandages, and placing in a decorated golden sarcophagus. The whole process took 70 days!",
    fact: "Over 5,000 objects were found in Tutankhamun's tomb — including a solid gold mask, chariots, thrones, and even board games!",
  },
]

function MapScene() {
  return (
    <div className="relative w-full rounded-chunky overflow-hidden" style={{ background: '#B3D9F2', height: 300 }}>
      <svg viewBox="0 0 1000 500" className="w-full" style={{ height: 300 }}>
        <rect width="1000" height="500" fill="#B3D9F2" />
        <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeWidth="1.5" strokeDasharray="12,10" opacity="0.5" />
        <text x="12" y="253" fill="white" fontSize="11" opacity="0.7" fontFamily="Nunito, sans-serif" fontWeight="bold">Equator</text>
        <path d="M 422,218 L 533,213 L 558,249 L 568,305 L 558,375 L 532,445 L 495,468 L 453,465 L 416,436 L 394,389 L 393,328 L 407,268 L 418,244 Z" fill="#FFB347" stroke="#e89a2a" strokeWidth="2" />
        <path d="M 490,218 L 533,213 L 540,230 L 550,255 L 545,275 L 510,272 L 488,248 L 484,232 Z" fill="#cc0000" stroke="#900" strokeWidth="2" />
        <text x="512" y="248" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Nunito, sans-serif">EGYPT</text>
        <polygon points="512,205 520,218 504,218" fill="#FFD700" />
        <path d="M 510,280 L 505,255 L 510,235 L 512,215" stroke="#4FC3F7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
        <text x="526" y="270" fill="#4FC3F7" fontSize="10" fontWeight="bold" fontFamily="Nunito, sans-serif">Nile</text>
        <text x="470" y="202" fill="white" fontSize="9" fontFamily="Nunito, sans-serif" opacity="0.9">Mediterranean Sea</text>
        <path d="M 448,72 L 486,64 L 518,72 L 542,86 L 550,108 L 532,128 L 552,150 L 534,176 L 510,200 L 478,214 L 450,210 L 424,193 L 416,170 L 420,136 L 435,108 Z" fill="#87CEEB88" stroke="#aaa" strokeWidth="1.5" />
        <text x="480" y="155" textAnchor="middle" fill="white" fontSize="10" fontFamily="Nunito, sans-serif" fontWeight="bold">Europe</text>
        <path d="M 560,130 L 640,100 L 750,100 L 820,140 L 800,200 L 720,230 L 640,230 L 580,210 L 555,180 Z" fill="#FF85A188" stroke="#aaa" strokeWidth="1.5" />
        <text x="680" y="172" textAnchor="middle" fill="white" fontSize="10" fontFamily="Nunito, sans-serif" fontWeight="bold">Asia</text>
      </svg>
      <div className="absolute bottom-2 right-2 flex gap-1.5">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold" style={{ backgroundColor: '#cc000099', color: 'white' }}>🔴 Egypt</div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold" style={{ backgroundColor: '#4FC3F799', color: 'white' }}>💧 Nile</div>
      </div>
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
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ height, opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
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
  if (chapter.kind === 'map') return <MapScene />
  if (chapter.kind === 'image') return <ImgCard src={chapter.img} alt={chapter.imgAlt} caption={chapter.imgCaption} />
  if (chapter.kind === 'double') return (
    <DoubleImageScene img={chapter.img} imgAlt={chapter.imgAlt} imgCaption={chapter.imgCaption}
      img2={chapter.img2} img2Alt={chapter.img2Alt} img2Caption={chapter.img2Caption} />
  )
  return null
}

export default function EgyptStory() {
  const [page, setPage] = useState(0)
  const chapter = CHAPTERS[page]
  const total = CHAPTERS.length

  return (
    <div className="flex flex-col gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="text-center">
        <h3 className="text-lg font-extrabold mb-0.5" style={{ color: '#b8860b' }}>Ancient Egypt: A Picture Story</h3>
        <p className="text-xs text-gray-400 font-bold">Chapter {page + 1} of {total}</p>
      </div>

      <div className="flex justify-center gap-1.5">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} onClick={() => setPage(i)} className="rounded-full transition-all"
            style={{ width: i === page ? 24 : 10, height: 10, backgroundColor: i === page ? '#daa520' : i < page ? '#90EE90' : '#e5e7eb' }} />
        ))}
      </div>

      <ChapterScene chapter={chapter} />

      <div className="rounded-2xl p-4 bg-white border border-yellow-100" style={{ boxShadow: '0 2px 0 #f0d080' }}>
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
