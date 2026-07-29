import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORIES } from '../data/quizData'
import type { CategoryScore } from '../lib/scoring'

const SERIES_BLUE = '#2a78d6'
const GRIDLINE = '#e1e0d9'
const AXIS_MUTED = '#898781'
const PRIMARY_INK = '#0b0b0b'

interface CategoryRadarChartProps {
  categories: CategoryScore[]
}

interface RadarDatum {
  category: string
  score: number
  fullMark: number
}

// Shortened for the axis labels only — the mini-cards below the chart show the full category name.
const SHORT_LABEL: Record<string, string> = {
  organizacao: 'Organização',
  tempo: 'Uso do Tempo',
  estrategias: 'Estratégias',
  postura: 'Postura',
}

export function CategoryRadarChart({ categories }: CategoryRadarChartProps) {
  const data: RadarDatum[] = categories.map((catScore) => {
    const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!
    return {
      category: SHORT_LABEL[category.id] ?? category.title,
      score: catScore.score,
      fullMark: catScore.maxScore,
    }
  })

  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="55%" margin={{ top: 24, right: 30, bottom: 24, left: 30 }}>
          <PolarGrid stroke={GRIDLINE} />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: PRIMARY_INK, fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 12]}
            tick={{ fill: AXIS_MUTED, fontSize: 11 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Pontuação"
            dataKey="score"
            stroke={SERIES_BLUE}
            strokeWidth={2}
            fill={SERIES_BLUE}
            fillOpacity={0.28}
            dot={{ r: 4, fill: SERIES_BLUE, strokeWidth: 0 }}
          />
          <Tooltip
            formatter={(value) => [`${value} / 12 pontos`, 'Pontuação']}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid rgba(11,11,11,0.10)',
              fontSize: 13,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
