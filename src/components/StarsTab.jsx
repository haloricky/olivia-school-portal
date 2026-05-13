export default function StarsTab({ lessons }) {
  const total = lessons.reduce((sum, l) => sum + (l.stars || 0), 0)

  let message = "Let's earn your first star! ⭐"
  if (total >= 1 && total < 10) message = 'You\'re off to a great start! 🌱'
  else if (total >= 10 && total < 25) message = 'Look at you go! 💖'
  else if (total >= 25 && total < 50) message = "You're a learning superstar! 🚀"
  else if (total >= 50) message = "WOW! You're a galaxy of stars! 🌌"

  return (
    <div className="bg-white rounded-chunkier p-8 text-center">
      <div className="font-display text-2xl text-primary-dark mb-2">Total stars</div>
      <div className="my-8 flex items-center justify-center gap-4">
        <span className="text-7xl animate-bounce-slow">⭐</span>
        <span
          className="font-display text-8xl"
          style={{
            background: 'linear-gradient(90deg,#FFB14A,#FF85A1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {total}
        </span>
      </div>
      <p className="font-display text-2xl text-primary">{message}</p>
      <p className="text-gray-500 mt-2">{lessons.length} lesson{lessons.length === 1 ? '' : 's'} logged so far</p>
    </div>
  )
}
