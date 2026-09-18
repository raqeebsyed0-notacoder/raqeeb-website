import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type Slide = {
  id: string | number
  image: string
  alt?: string
}

export type PDFDeckViewerProps = {
  slides: Slide[]
  ratio?: string // e.g. "16/9", "1920/1289", "4/3"
}

export function PDFDeckViewer({ slides, ratio = "16/9" }: PDFDeckViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  if (!slides.length) return null

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      <div
        className="relative w-full bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].alt || `Page ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex items-center justify-between px-2 text-sm text-neutral-400">
        <span className="font-mono">
          Page {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}