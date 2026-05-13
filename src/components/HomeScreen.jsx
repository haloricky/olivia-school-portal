export default function HomeScreen({ onChoose }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cream">
      <h1 className="font-display text-5xl text-primary mb-2 text-center">
        Olivia's School
      </h1>
      <p className="text-gray-500 mb-12 text-center">Who's here today?</p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <button
          onClick={() => onChoose('papa')}
          className="press-btn flex-1 bg-white border-4 border-primary rounded-chunkier py-12 px-6 flex flex-col items-center"
        >
          <span className="text-7xl mb-3">👨</span>
          <span className="font-display text-3xl text-primary-dark">Papa</span>
          <span className="text-sm text-gray-500 mt-2">Log lessons & track progress</span>
        </button>

        <button
          onClick={() => onChoose('olivia')}
          className="press-btn flex-1 bg-primary text-white rounded-chunkier py-12 px-6 flex flex-col items-center"
          style={{ boxShadow: '0 6px 0 0 #B84A6A' }}
        >
          <span className="text-7xl mb-3">⭐</span>
          <span className="font-display text-3xl">Olivia</span>
          <span className="text-sm opacity-90 mt-2">See my map & stars!</span>
        </button>
      </div>
    </div>
  )
}
