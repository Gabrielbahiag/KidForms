import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { CATEGORIES } from '../data/quizData'
import { OVERALL_MASCOT, CATEGORY_MASCOTS } from '../data/animalContent'
import type { ScoreResult } from '../lib/scoring'
import { ResultCard } from './ResultCard'
import { CategoryRadarChart } from './CategoryRadarChart'
import { Reflection, type ReflectionAnswers } from './Reflection'
import { REFLECTION_QUESTIONS } from '../data/quizData'

interface ResultsProps {
  result: ScoreResult
  reflections: ReflectionAnswers
  onReflectionChange: (id: string, value: string) => void
  onRestart: () => void
}

export function Results({ result, reflections, onReflectionChange, onRestart }: ResultsProps) {
  const overallCardRef = useRef<HTMLDivElement>(null)
  const categoriesGridRef = useRef<HTMLDivElement>(null)
  const radarCardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (result.overallTier === 'boa') {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.4 } })
    }
  }, [result.overallTier])

  async function handleExportPdf() {
    if (!overallCardRef.current || !categoriesGridRef.current || !radarCardRef.current) return
    setIsExporting(true)
    try {
      const { exportResultsPdf } = await import('../lib/pdfExport')
      await exportResultsPdf({
        blocks: [overallCardRef.current, categoriesGridRef.current, radarCardRef.current],
        total: result.total,
        maxTotal: result.maxTotal,
        overallTitle: OVERALL_MASCOT.tiers[result.overallTier].title,
        overallMessage: OVERALL_MASCOT.tiers[result.overallTier].message,
        categories: result.categories.map((c) => ({
          title: CATEGORIES.find((cat) => cat.id === c.categoryId)!.title,
          score: c.score,
          maxScore: c.maxScore,
        })),
        reflections: REFLECTION_QUESTIONS.map((q) => ({
          label: q.label,
          value: reflections[q.id] ?? '',
        })),
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      <div className="bg-slate-50">
        <div ref={overallCardRef}>
          <ResultCard mascot={OVERALL_MASCOT} tier={result.overallTier} score={result.total} maxScore={result.maxTotal} big />
        </div>

        <div ref={categoriesGridRef} className="grid grid-cols-2 gap-3 mt-4">
          {result.categories.map((catScore) => {
            const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!
            return (
              <div key={category.id}>
                <ResultCard
                  mascot={CATEGORY_MASCOTS[category.id]}
                  tier={catScore.tier}
                  score={catScore.score}
                  maxScore={catScore.maxScore}
                />
                <p className="text-center text-xs font-semibold text-slate-500 mt-1">{category.title}</p>
              </div>
            )
          })}
        </div>

        <div ref={radarCardRef} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">📊 Seu perfil de estudos</h3>
          <CategoryRadarChart categories={result.categories} />
        </div>
      </div>

      <div className="mt-6">
        <Reflection answers={reflections} onChange={onReflectionChange} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="flex-1 px-6 py-3 rounded-full font-bold text-white bg-slate-800 shadow-md disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
        >
          {isExporting ? 'Gerando PDF…' : '📄 Baixar relatório em PDF'}
        </button>
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-3 rounded-full font-bold text-slate-600 bg-white border-2 border-slate-200 hover:border-slate-300 transition-colors"
        >
          🔁 Refazer o teste
        </button>
      </div>
    </div>
  )
}
