import { useNavigate } from 'react-router-dom'

export default function HomeScreen() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: 'linear-gradient(160deg, #FFF0F5 0%, #FFF9EC 100%)' }}
    >
      <div className="text-center">
        <div className="text-6xl mb-3 animate-bounce">🌟</div>
        <h1 className="font-display text-5xl text-gray-800 leading-tight text-center">
          Olivia's<br />
          <span style={{ color: '#FF85A1' }}>School Portal</span>
        </h1>
        <p className="text-gray-400 text-sm font-bold mt-2">
          A homeschool adventure for Olivia 🇮🇩🇨🇳
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/olivia')}
          className="press-btn w-full py-5 rounded-chunkier font-display text-white text-xl flex items-center justify-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #FF85A1, #FF6B8A)',
            boxShadow: '0 5px 0 #cc5a74',
          }}
        >
          <span className="text-3xl">🌺</span>
          Olivia's World
        </button>

        <button
          onClick={() => navigate('/papa')}
          className="press-btn w-full py-5 rounded-chunkier font-display text-white text-xl flex items-center justify-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #6B8CFF, #4A6EE0)',
            boxShadow: '0 5px 0 #3050c0',
          }}
        >
          <span className="text-3xl">👨‍💻</span>
          Papa's View
        </button>
      </div>

      <div className="flex gap-4 text-3xl opacity-30 mt-4">
        <span>🌍</span><span>📚</span><span>🎨</span><span>🔬</span><span>🔢</span>
      </div>
    </div>
  )
}
