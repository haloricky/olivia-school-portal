import { useState } from 'react'
import { WORLD_CONTINENTS } from './games/WorldMapGame'

export default function WorldMapDisplay() {
  const [active, setActive] = useState(null)
  const activeCont = WORLD_CONTINENTS.find(c => c.name === active)

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center mb-1">
        <h4 className="font-display text-lg text-gray-700">🌍 Interactive World Map</h4>
        <p className="text-xs text-gray-400 font-bold">Tap any continent to learn about it!</p>
      </div>

      <div className="relative w-full rounded-chunky overflow-hidden border-2 border-blue-200 shadow-sm">
        <svg viewBox="0 0 1000 500" className="w-full block">
          <rect width="1000" height="500" fill="#B3D9F2" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeWidth="1.5" strokeDasharray="12,10" opacity="0.5" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="white" strokeWidth="1" strokeDasharray="8,8" opacity="0.3" />
          <text x="12" y="253" fill="white" fontSize="11" opacity="0.7" fontFamily="Nunito, sans-serif" fontWeight="bold">Equator</text>

          {WORLD_CONTINENTS.map(c => {
            const isActive = active === c.name
            return (
              <g key={c.name} onClick={() => setActive(a => (a === c.name ? null : c.name))} style={{ cursor: 'pointer' }}>
                <path
                  d={c.path}
                  fill={isActive ? c.color : c.color + '88'}
                  stroke={isActive ? c.color : '#aaa'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                />
                <text
                  x={c.labelX}
                  y={c.labelY - 6}
                  textAnchor="middle"
                  fill={isActive ? 'white' : '#333'}
                  fontSize={c.name === 'Antarctica' ? '10' : c.name.includes('America') ? '10' : '12'}
                  fontWeight="800"
                  fontFamily="Nunito, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {c.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {activeCont ? (
        <div
          className="rounded-chunky px-4 py-3 flex items-start gap-3 border-2 transition-all"
          style={{ backgroundColor: activeCont.color + '22', borderColor: activeCont.color }}
        >
          <span className="text-3xl flex-shrink-0">{activeCont.emoji}</span>
          <div>
            <p className="font-display text-base text-gray-800">{activeCont.name}</p>
            <p className="text-gray-600 text-sm font-bold mt-0.5">{activeCont.fact}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-chunky px-4 py-3 bg-pink-50 border border-pink-100 text-center">
          <div className="flex justify-center flex-wrap gap-2">
            {WORLD_CONTINENTS.map(c => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className="press-btn flex items-center gap-1 px-2.5 py-1 rounded-chunky text-xs font-display border transition-all"
                style={{ backgroundColor: c.color + '33', borderColor: c.color, color: '#333' }}
              >
                <span>{c.emoji}</span> {c.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-bold mt-2">Tap a continent above or on the map</p>
        </div>
      )}
    </div>
  )
}
