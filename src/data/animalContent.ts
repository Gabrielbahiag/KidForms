import type { CategoryId } from './quizData'

import owlAlerta from '../assets/lottie/principal/Sleepy1.json'
import owlConstrucao from '../assets/lottie/principal/Thinking2.json'
import owlBoa from '../assets/lottie/principal/AngryOwl3.json'

import beeAlerta from '../assets/lottie/organizacao/bee-alerta.json'
import beeConstrucao from '../assets/lottie/organizacao/bee-boa.json'
import beeBoa from '../assets/lottie/organizacao/bee-construcao.json'

import tempoAlerta from '../assets/lottie/UsoTempo/Tartaruga1.json'
import tempoConstrucao from '../assets/lottie/UsoTempo/Coelho2.json'
import tempoBoa from '../assets/lottie/UsoTempo/MeditatingRabbit3.json'

import gatoAlerta from '../assets/lottie/estrategias/gatopensando1.json'
import gatoConstrucao from '../assets/lottie/estrategias/cat Mark loading2.json'
import gatoBoa from '../assets/lottie/estrategias/reading_cat3.json'

import cachorroAlerta from '../assets/lottie/postura/verysad1.json'
import cachorroConstrucao from '../assets/lottie/postura/HappyDog2.json'
import cachorroBoa from '../assets/lottie/postura/FlirtingDog3.json'

export type Tier = 'alerta' | 'construcao' | 'boa'

/** A `.lottie` file is imported as a URL string; a `.json` file is imported as parsed animation data. */
export type LottieAsset = string | Record<string, unknown>

export interface TierContent {
  title: string
  message: string
  lottie: LottieAsset
  /** Static fallback shown where the animated canvas can't be captured (e.g. the PDF export snapshot). */
  emoji: string
  /** Playback speed applied to the Lottie animation for this tier — lower = sleepier, higher = livelier. */
  speed: number
  /** CSS filter saturation applied to the mascot — lower = duller, higher = vivid. */
  saturation: number
  gradient: string
}

export interface MascotContent {
  animal: string
  tiers: Record<Tier, TierContent>
}

export function scoreToTier(score: number, maxScore: number): Tier {
  const ratio = score / maxScore
  if (ratio <= 1 / 3) return 'alerta'
  if (ratio <= 2 / 3) return 'construcao'
  return 'boa'
}

export const OVERALL_MASCOT: MascotContent = {
  animal: 'Coruja dos Estudos',
  tiers: {
    alerta: {
      title: 'Seu EU interior está com sono',
      message: 'Seu Eu interior dos estudos está com sono. Vamos acordá-lo um hábito de cada vez!',
      lottie: owlAlerta,
      emoji: '😴',
      speed: 0.4,
      saturation: 0.35,
      gradient: 'from-slate-400 to-slate-600',
    },
    construcao: {
      title: 'Seu EU interior está acordando',
      message: 'Seu Eu interior já está de olho aberto e aprendendo a voar mais alto!',
      lottie: owlConstrucao,
      emoji: '🦉',
      speed: 0.85,
      saturation: 0.75,
      gradient: 'from-sky-400 to-blue-500',
    },
    boa: {
      title: 'Sua coruja está voando alto!',
      message: 'Sua coruja interior está voando alto! Agora é hora de afiar ainda mais suas estratégias.',
      lottie: owlBoa,
      emoji: '🦉',
      speed: 1.3,
      saturation: 1.15,
      gradient: 'from-amber-400 to-emerald-500',
    },
  },
}

export const CATEGORY_MASCOTS: Record<CategoryId, MascotContent> = {
  organizacao: {
    animal: 'Abelha da Organização',
    tiers: {
      alerta: {
        title: 'Abelha perdida',
        message: 'Sua abelha está perdida, sem colmeia organizada.',
        lottie: beeAlerta,
        emoji: '🐝',
        speed: 0.7,
        saturation: 0.4,
        gradient: 'from-slate-400 to-slate-600',
      },
      construcao: {
        title: 'Montando a colmeia',
        message: 'Sua abelha já está montando os primeiros favos!',
        lottie: beeConstrucao,
        emoji: '🐝',
        speed: 1,
        saturation: 0.8,
        gradient: 'from-sky-400 to-blue-500',
      },
      boa: {
        title: 'Colmeia organizada!',
        message: 'Sua abelha organizou a colmeia inteira e está cheia de mel!',
        lottie: beeBoa,
        emoji: '🍯',
        speed: 1,
        saturation: 1.15,
        gradient: 'from-amber-400 to-emerald-500',
      },
    },
  },
  tempo: {
    animal: 'Controle do Tempo',
    tiers: {
      alerta: {
        title: 'Sempre atrasado',
        message: 'Você é tão rapido quanto uma tartaruga!.',
        lottie: tempoAlerta,
        emoji: '🐢',
        speed: 0.5,
        saturation: 0.4,
        gradient: 'from-slate-400 to-slate-600',
      },
      construcao: {
        title: 'Saindo mais cedo',
        message: 'Você já está aprendendo a sair mais cedo da toca!',
        lottie: tempoConstrucao,
        emoji: '🐇',
        speed: 0.9,
        saturation: 0.8,
        gradient: 'from-sky-400 to-blue-500',
      },
      boa: {
        title: 'Domínio do tempo!',
        message: 'Você agora tem tempo de sobra, sem correria!',
        lottie: tempoBoa,
        emoji: '🐇',
        speed: 1.2,
        saturation: 1.15,
        gradient: 'from-amber-400 to-emerald-500',
      },
    },
  },
  estrategias: {
    animal: 'Gatinho das Estratégias',
    tiers: {
      alerta: {
        title: 'Sem truques ainda',
        message: 'Seu gatinho interior esta confuso.',
        lottie: gatoAlerta,
        emoji: '🐱',
        speed: 0.5,
        saturation: 0.4,
        gradient: 'from-slate-400 to-slate-600',
      },
      construcao: {
        title: 'Testando estratégias',
        message: 'Seu Gatinho interior esta começando a endenter o conteudo!',
        lottie: gatoConstrucao,
        emoji: '🐈',
        speed: 0.9,
        saturation: 0.8,
        gradient: 'from-sky-400 to-blue-500',
      },
      boa: {
        title: 'Gatinho esperto!',
        message: 'Seu gatinho interior dominou as estratégias de estudo!',
        lottie: gatoBoa,
        emoji: '📖',
        speed: 1.2,
        saturation: 1.15,
        gradient: 'from-amber-400 to-emerald-500',
      },
    },
  },
  postura: {
    animal: 'Cachorro da Motivação',
    tiers: {
      alerta: {
        title: 'Cabeça baixa',
        message: 'Seu cachorro está tristinho, sem vontade de latir.',
        lottie: cachorroAlerta,
        emoji: '😢',
        speed: 0.5,
        saturation: 0.4,
        gradient: 'from-slate-400 to-slate-600',
      },
      construcao: {
        title: 'Treinando a coragem',
        message: 'Seu cachorro está treinando a coragem de tentar de novo!',
        lottie: cachorroConstrucao,
        emoji: '🐶',
        speed: 0.9,
        saturation: 0.8,
        gradient: 'from-sky-400 to-blue-500',
      },
      boa: {
        title: 'Cachorro confiante!',
        message: 'Seu cachorro está confiante e pronto para qualquer desafio!',
        lottie: cachorroBoa,
        emoji: '🐶',
        speed: 1.2,
        saturation: 1.15,
        gradient: 'from-amber-400 to-emerald-500',
      },
    },
  },
}
