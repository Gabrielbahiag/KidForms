import { OPTIONS } from '../data/quizData'

interface QuestionRowProps {
  text: string
  selected: number | undefined
  onSelect: (points: number) => void
}

export function QuestionRow({ text, selected, onSelect }: QuestionRowProps) {
  return (
    <div className="py-4 border-b border-slate-100 last:border-b-0">
      <p className="text-slate-700 font-medium mb-3">{text}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {OPTIONS.map((option) => {
          const isSelected = selected === option.points
          return (
            <button
              key={option.label}
              onClick={() => onSelect(option.points)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                isSelected
                  ? 'bg-sky-500 border-sky-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
