export type CategoryId = 'organizacao' | 'tempo' | 'estrategias' | 'postura'

export interface Statement {
  id: string
  text: string
}

export interface Category {
  id: CategoryId
  title: string
  icon: string
  statements: Statement[]
}

export const OPTIONS = [
  { label: 'Sempre', points: 3 },
  { label: 'Às vezes', points: 2 },
  { label: 'Raramente', points: 1 },
  { label: 'Nunca', points: 0 },
] as const

export const CATEGORIES: Category[] = [
  {
    id: 'organizacao',
    title: 'Organização',
    icon: '🗂️',
    statements: [
      { id: 'org-1', text: 'Tenho um horário definido para estudar.' },
      { id: 'org-2', text: 'Anoto tarefas e prazos.' },
      { id: 'org-3', text: 'Organizo meu material antes de começar.' },
      { id: 'org-4', text: 'Não deixo acumular atividades.' },
    ],
  },
  {
    id: 'tempo',
    title: 'Uso do Tempo',
    icon: '⏳',
    statements: [
      { id: 'tempo-1', text: 'Estudo um pouco todos os dias.' },
      { id: 'tempo-2', text: 'Evito mexer no celular enquanto estudo.' },
      { id: 'tempo-3', text: 'Não deixo tudo para a véspera da prova.' },
      { id: 'tempo-4', text: 'Cumpro o tempo que planejo estudar.' },
    ],
  },
  {
    id: 'estrategias',
    title: 'Estratégias de Estudo',
    icon: '💬',
    statements: [
      { id: 'estrat-1', text: 'Faço resumos, esquemas ou mapas mentais.' },
      { id: 'estrat-2', text: 'Tiro dúvidas quando não entendo algo.' },
      { id: 'estrat-3', text: 'Reviso conteúdos antigos.' },
      { id: 'estrat-4', text: 'Presto atenção nas aulas.' },
    ],
  },
  {
    id: 'postura',
    title: 'Postura e Motivação',
    icon: '🗨️',
    statements: [
      { id: 'post-1', text: 'Mesmo sem vontade, eu estudo.' },
      { id: 'post-2', text: 'Tento melhorar quando tiro nota baixa.' },
      { id: 'post-3', text: 'Acredito que posso aprender se me esforçar.' },
      { id: 'post-4', text: 'Peço ajuda quando preciso.' },
    ],
  },
]

export const REFLECTION_QUESTIONS = [
  { id: 'bem', label: 'O que eu faço bem?' },
  { id: 'prejudica', label: 'O que mais está me prejudicando?' },
  { id: 'habito', label: 'Um hábito que vou melhorar a partir de hoje:' },
] as const

export const MAX_CATEGORY_SCORE = 12 // 4 afirmações x 3 pontos
export const MAX_TOTAL_SCORE = MAX_CATEGORY_SCORE * CATEGORIES.length // 48
