import { useNavigate } from 'react-router-dom'
import { CURRICULUM } from '../data/curriculum'
import { SUBJECTS } from '../data/subjects'
import { LESSON_CONTENT } from '../data/lessonContent'

const MONTH_NAMES = {
  1: 'Our Home',
  2: 'Living Things',
  3: 'The Wide World',
  4: 'How Things Work',
  5: 'Humans and Stories',
  6: 'Numbers and Patterns',
  7: 'The Future',
}

const SUBJECT_BORDER = {
  geo:  '#b2eddc',
  hist: '#ffe0a0',
  sci:  '#b3d9f7',
  math: '#c5bef7',
  soc:  '#ffb3cc',
  art:  '#ffc8a0',
  life: '#b5d98a',
}

export default function MapTab() {
  const navigate = useNavigate()
  const months = [1, 2, 3, 4, 5, 6, 7]
  const hasContent = (week) => week in LESSON_CONTENT
  const readyCount = Object.keys(LESSON_CONTENT).length

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Progress summary */}
      <div className="rounded-chunkier bg-white border border-pink-100 shadow-sm px-5 py-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🗺️</span>
          <div>
            <h3 className="font-display text-lg text-gray-800">My Learning Map</h3>
            <p className="text-xs text-gray-400 font-bold">49 lessons across 7 months</p>
          </div>
        </div>
        <div className="w-full bg-pink-50 rounded-full h-3 mt-3">
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${(readyCount / 49) * 100}%`, backgroundColor: '#FF85A1' }}
          />
        </div>
        <p className="text-xs text-gray-400 font-bold mt-1">
          {readyCount} of 49 lessons ready
        </p>
      </div>

      {months.map((month) => {
        const monthLessons = CURRICULUM.filter((l) => l.month === month)
        return (
          <div key={month}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div
                className="w-7 h-7 rounded-chunky flex items-center justify-center text-white text-sm font-display"
                style={{ backgroundColor: '#FF85A1' }}
              >
                {month}
              </div>
              <div>
                <span className="text-xs font-display text-primary uppercase tracking-wider">
                  Month {month}
                </span>
                <h4 className="text-sm font-display text-gray-700 leading-none">
                  {MONTH_NAMES[month]}
                </h4>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {monthLessons.map((lesson) => {
                const subject = SUBJECTS[lesson.subject]
                const ready = hasContent(lesson.week)
                const border = SUBJECT_BORDER[lesson.subject] || '#e5e7eb'

                return (
                  <button
                    key={lesson.week}
                    onClick={() => ready && navigate(`/lesson/${lesson.week}`)}
                    disabled={!ready}
                    className={`press-btn w-full flex items-center gap-3 rounded-chunky px-4 py-3 text-left border-2 transition-all ${
                      ready ? 'cursor-pointer' : 'cursor-default opacity-50'
                    }`}
                    style={{
                      backgroundColor: ready ? subject.bg : '#f9fafb',
                      borderColor: ready ? border : '#e5e7eb',
                      boxShadow: ready ? `0 3px 0 ${border}` : 'none',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-chunky flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: ready ? subject.color + '22' : '#f3f4f6' }}
                    >
                      {subject.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5">
                        <span
                          className="text-xs font-display uppercase tracking-wider"
                          style={{ color: ready ? subject.color : '#9ca3af' }}
                        >
                          Week {lesson.week} · {subject.name}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 truncate">{lesson.topic}</p>
                    </div>

                    <div className="flex-shrink-0">
                      {ready ? (
                        <span
                          className="text-xs font-display px-2.5 py-1 rounded-chunky text-white"
                          style={{ backgroundColor: subject.color }}
                        >
                          Play →
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-chunky">
                          Soon
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
