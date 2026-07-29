import { useState } from 'react'
import { Welcome } from './components/Welcome'
import { Quiz } from './components/Quiz'
import { Results } from './components/Results'
import { computeScores, type Answers } from './lib/scoring'
import type { ReflectionAnswers } from './components/Reflection'

type Screen = 'welcome' | 'quiz' | 'results'

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [answers, setAnswers] = useState<Answers>({})
  const [reflections, setReflections] = useState<ReflectionAnswers>({})

  function handleAnswer(statementId: string, points: number) {
    setAnswers((prev) => ({ ...prev, [statementId]: points }))
  }

  function handleReflectionChange(id: string, value: string) {
    setReflections((prev) => ({ ...prev, [id]: value }))
  }

  function handleRestart() {
    setAnswers({})
    setReflections({})
    setScreen('welcome')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      {screen === 'welcome' && <Welcome onStart={() => setScreen('quiz')} />}
      {screen === 'quiz' && (
        <Quiz answers={answers} onAnswer={handleAnswer} onComplete={() => setScreen('results')} />
      )}
      {screen === 'results' && (
        <Results
          result={computeScores(answers)}
          reflections={reflections}
          onReflectionChange={handleReflectionChange}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
