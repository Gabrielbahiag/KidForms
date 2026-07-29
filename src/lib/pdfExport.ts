import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas-pro'

interface CategoryLine {
  title: string
  score: number
  maxScore: number
}

interface ReflectionLine {
  label: string
  value: string
}

export interface ExportPdfOptions {
  /** Captured and placed as separate images so a page break never lands in the middle of one (e.g. the radar chart). */
  blocks: HTMLElement[]
  total: number
  maxTotal: number
  overallTitle: string
  overallMessage: string
  categories: CategoryLine[]
  reflections: ReflectionLine[]
}

const PAGE_WIDTH = 595 // pt (A4)
const PAGE_HEIGHT = 842
const MARGIN = 40
const BLOCK_GAP = 12

const onclonePdfFallback = (clonedDoc: Document) => {
  clonedDoc.querySelectorAll<HTMLElement>('[data-pdf-mascot-fallback]').forEach((el) => {
    el.style.opacity = '1'
  })
}

/**
 * Draws a canvas that is taller than one page across as many pages as needed —
 * jsPDF doesn't paginate an oversized image on its own, it just clips it at the page edge.
 * Slices the source canvas into page-sized horizontal bands and adds one image per band.
 * Only used as a fallback for a single block too tall to ever fit on one page.
 */
function addSlicedImage(pdf: jsPDF, canvas: HTMLCanvasElement, x: number, startY: number, widthPt: number): number {
  const pxPerPt = canvas.width / widthPt
  const maxSliceHeightPx = (PAGE_HEIGHT - MARGIN * 2) * pxPerPt

  let renderedPx = 0
  let cursorY = startY
  let isFirstSlice = true

  while (renderedPx < canvas.height) {
    const availableHeightPt = isFirstSlice ? PAGE_HEIGHT - MARGIN - cursorY : PAGE_HEIGHT - MARGIN * 2
    const sliceHeightPx = Math.min(canvas.height - renderedPx, availableHeightPt * pxPerPt, maxSliceHeightPx)

    const sliceCanvas = document.createElement('canvas')
    sliceCanvas.width = canvas.width
    sliceCanvas.height = sliceHeightPx
    const ctx = sliceCanvas.getContext('2d')!
    ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx)

    if (!isFirstSlice) {
      pdf.addPage()
      cursorY = MARGIN
    }
    const sliceHeightPt = sliceHeightPx / pxPerPt
    pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', x, cursorY, widthPt, sliceHeightPt)

    renderedPx += sliceHeightPx
    cursorY += sliceHeightPt
    isFirstSlice = false
  }

  return cursorY
}

/**
 * Places one block's image as a single unbroken piece: on the current page if it fits in the
 * remaining space, otherwise on a fresh page. Only falls back to slicing (addSlicedImage) when
 * the block itself is taller than a full page — that's the one case a page break can't be avoided.
 */
function placeBlock(pdf: jsPDF, canvas: HTMLCanvasElement, x: number, cursorY: number, widthPt: number): number {
  const heightPt = (canvas.height / canvas.width) * widthPt
  const maxPageContentHeight = PAGE_HEIGHT - MARGIN * 2
  const remainingOnPage = PAGE_HEIGHT - MARGIN - cursorY

  if (heightPt > maxPageContentHeight) {
    if (cursorY > MARGIN) {
      pdf.addPage()
      cursorY = MARGIN
    }
    return addSlicedImage(pdf, canvas, x, cursorY, widthPt)
  }

  if (heightPt > remainingOnPage) {
    pdf.addPage()
    cursorY = MARGIN
  }

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, cursorY, widthPt, heightPt)
  return cursorY + heightPt
}

export async function exportResultsPdf(options: ExportPdfOptions): Promise<void> {
  const { blocks, total, maxTotal, overallTitle, overallMessage, categories, reflections } = options

  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const contentWidth = PAGE_WIDTH - MARGIN * 2

  let cursorY = MARGIN

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.text('RX da Minha Rotina de Estudos — Relatório', MARGIN, cursorY)
  cursorY += 24

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(120)
  pdf.text(new Date().toLocaleDateString('pt-BR'), MARGIN, cursorY)
  pdf.setTextColor(0)
  cursorY += 16

  for (const block of blocks) {
    const canvas = await html2canvas(block, {
      backgroundColor: '#ffffff',
      scale: 2,
      onclone: onclonePdfFallback,
    })
    cursorY = placeBlock(pdf, canvas, MARGIN, cursorY, contentWidth) + BLOCK_GAP
  }

  pdf.addPage()
  cursorY = MARGIN

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(14)
  pdf.text(`Pontuação total: ${total} / ${maxTotal} — ${overallTitle}`, MARGIN, cursorY)
  cursorY += 18

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  const messageLines = pdf.splitTextToSize(overallMessage, contentWidth)
  pdf.text(messageLines, MARGIN, cursorY)
  cursorY += messageLines.length * 14 + 16

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(13)
  pdf.text('Pontuação por categoria', MARGIN, cursorY)
  cursorY += 18

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  for (const category of categories) {
    if (cursorY > PAGE_HEIGHT - MARGIN) {
      pdf.addPage()
      cursorY = MARGIN
    }
    pdf.text(`• ${category.title}: ${category.score} / ${category.maxScore} pontos`, MARGIN, cursorY)
    cursorY += 16
  }
  cursorY += 10

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(13)
  if (cursorY > PAGE_HEIGHT - MARGIN) {
    pdf.addPage()
    cursorY = MARGIN
  }
  pdf.text('Reflexão', MARGIN, cursorY)
  cursorY += 18

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  for (const reflection of reflections) {
    const valueLines = pdf.splitTextToSize(reflection.value || '—', contentWidth)
    const blockHeight = 16 + valueLines.length * 14 + 10

    if (cursorY + blockHeight > PAGE_HEIGHT - MARGIN) {
      pdf.addPage()
      cursorY = MARGIN
    }

    pdf.setFont('helvetica', 'bold')
    pdf.text(reflection.label, MARGIN, cursorY)
    cursorY += 16
    pdf.setFont('helvetica', 'normal')
    pdf.text(valueLines, MARGIN, cursorY)
    cursorY += valueLines.length * 14 + 10
  }

  pdf.save('rotina-de-estudos-relatorio.pdf')
}
