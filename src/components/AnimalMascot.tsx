import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { MascotContent, Tier } from '../data/animalContent'

interface AnimalMascotProps {
  mascot: MascotContent
  tier: Tier
  size?: number
  className?: string
}

export function AnimalMascot({ mascot, tier, size = 160, className = '' }: AnimalMascotProps) {
  const { speed, saturation, lottie, emoji } = mascot.tiers[tier]
  const lottieProps = typeof lottie === 'string' ? { src: lottie } : { data: lottie }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* WebGL canvas can't be captured by html2canvas (used for the PDF export). Kept invisible
          here; pdfExport's onclone reveals it in the snapshot only, once the canvas is stripped out. */}
      <span
        data-pdf-mascot-fallback
        className="absolute inset-0 flex items-center justify-center opacity-0"
        style={{ fontSize: size * 0.65 }}
      >
        {emoji}
      </span>
      <DotLottieReact
        key={tier}
        {...lottieProps}
        loop
        autoplay
        speed={speed}
        data-html2canvas-ignore="true"
        style={{
          width: size,
          height: size,
          filter: `saturate(${saturation})`,
          position: 'relative',
        }}
      />
    </div>
  )
}
