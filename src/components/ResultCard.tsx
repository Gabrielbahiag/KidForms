import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MascotContent, Tier } from '../data/animalContent'
import { AnimalMascot } from './AnimalMascot'

interface ResultCardProps {
  mascot: MascotContent
  tier: Tier
  score: number
  maxScore: number
  big?: boolean
}

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs)
      setValue(Math.round(progress * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])

  return value
}

export function ResultCard({ mascot, tier, score, maxScore, big = false }: ResultCardProps) {
  const content = mascot.tiers[tier]
  const animatedScore = useCountUp(score)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl bg-gradient-to-br ${content.gradient} text-white shadow-lg overflow-hidden ${
        big ? 'p-6 sm:p-8 text-center' : 'p-4 text-center'
      }`}
    >
      <div className="flex justify-center">
        <AnimalMascot mascot={mascot} tier={tier} size={big ? 180 : 96} />
      </div>
      <p className={`font-extrabold ${big ? 'text-2xl mt-2' : 'text-base mt-1'}`}>{content.title}</p>
      <p className={`font-bold opacity-90 ${big ? 'text-lg mt-1' : 'text-xs mt-1'}`}>
        {animatedScore} / {maxScore} pontos
      </p>
      <p className={big ? 'mt-3 text-white/90 max-w-md mx-auto' : 'mt-2 text-xs text-white/90'}>{content.message}</p>
    </motion.div>
  )
}
