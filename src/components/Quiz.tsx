import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '../data/quizData'
import type { Answers } from '../lib/scoring'
import { ProgressBar } from './ProgressBar'
import { QuestionRow } from './QuestionRow'

interface QuizProps {
  answers: Answers
  onAnswer: (statementId: string, points: number) => void
  onComplete: () => void
}

export function Quiz({ answers, onAnswer, onComplete }: QuizProps) {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const category = CATEGORIES[categoryIndex]
  const isLast = categoryIndex === CATEGORIES.length - 1

  const categoryAnswered = category.statements.every((s) => answers[s.id] !== undefined)

  function handleNext() {
    if (isLast) {
      onComplete()
    } else {
      setCategoryIndex((i) => i + 1)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <ProgressBar current={categoryIndex + 1} total={CATEGORIES.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            {category.icon} {category.title}
          </h2>
          <div className="mt-2">
            {category.statements.map((statement) => (
              <QuestionRow
                key={statement.id}
                text={statement.text}
                selected={answers[statement.id]}
                onSelect={(points) => onAnswer(statement.id, points)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6 mb-10">
        <button
          onClick={() => setCategoryIndex((i) => Math.max(0, i - 1))}
          disabled={categoryIndex === 0}
          className="px-5 py-2.5 rounded-full font-semibold text-slate-500 disabled:opacity-0"
        >
          ← Voltar
        </button>
        <button
          onClick={handleNext}
          disabled={!categoryAnswered}
          className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-sky-500 to-emerald-500 shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform"
        >
          {isLast ? 'Ver resultado 🎉' : 'Próxima categoria →'}
        </button>
      </div>
    </div>
  )
}
