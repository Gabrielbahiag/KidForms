import { REFLECTION_QUESTIONS } from '../data/quizData'

export type ReflectionAnswers = Record<string, string>

interface ReflectionProps {
  answers: ReflectionAnswers
  onChange: (id: string, value: string) => void
}

export function Reflection({ answers, onChange }: ReflectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-1">🎯 Parte mais importante</h3>
      <p className="text-slate-500 text-sm mb-4">
        Com base no seu resultado, o que você escolhe mudar para alcançar resultados mais eficazes?
      </p>
      <div className="space-y-4">
        {REFLECTION_QUESTIONS.map((question) => (
          <div key={question.id}>
            <label className="block text-slate-700 font-medium mb-1.5" htmlFor={question.id}>
              {question.label}
            </label>
            <textarea
              id={question.id}
              value={answers[question.id] ?? ''}
              onChange={(e) => onChange(question.id, e.target.value)}
              rows={2}
              className="w-full rounded-xl border-2 border-slate-200 p-3 text-slate-700 focus:border-sky-400 focus:outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
