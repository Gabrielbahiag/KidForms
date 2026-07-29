import { motion } from 'framer-motion'
import { OPTIONS } from '../data/quizData'

interface WelcomeProps {
  onStart: () => void
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto text-center px-4"
    >
      <div className="text-6xl mb-4">🦉</div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
        RX da Minha Rotina de Estudos
      </h1>
      <p className="text-slate-500 mb-8">
        Descubra como estão seus hábitos de estudo e ajude seu bicho de estimação a evoluir!
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-left mb-8">
        <p className="font-semibold text-slate-700 mb-3">📌 Instruções</p>
        <p className="text-slate-600 mb-3">Leia cada afirmação e marque a opção que mais combina com você:</p>
        <ul className="space-y-1.5 text-slate-600">
          {OPTIONS.map((option) => (
            <li key={option.label} className="flex justify-between">
              <span>{option.label}</span>
              <span className="font-semibold text-slate-800">{option.points} ponto{option.points === 1 ? '' : 's'}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-400 italic">
          Seja sincero. Esse teste é para você, não é para nota.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold text-lg shadow-lg shadow-sky-200 hover:scale-105 active:scale-95 transition-transform"
      >
        Vamos começar 🚀
      </button>
    </motion.div>
  )
}
