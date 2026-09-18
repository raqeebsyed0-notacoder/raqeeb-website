import { useState, useRef, useCallback } from 'react'

export interface SqueezeSlide {
  id: string
  image: string
  title: string
  subtitle?: string
  objectFit?: "cover" | "contain"
  overlay?: React.ReactNode
  aspectRatio?: string
}

interface SqueezeCarouselProps {
  slides: SqueezeSlide[]
  height?: number
  gap?: number
  slatWidth?: number
  radius?: number
  controls?: boolean
  label?: string
  className?: string
}

export default function SqueezeCarousel({
  slides,
  height = 400,
  gap = 16,
  slatWidth = 10,
  radius = 8,
  controls = true,
  label,
  className = '',
}: SqueezeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    if (isAnimating || index === activeIndex) return
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 500)
    }, 250)
  }, [activeIndex, isAnimating])

  const handleNext = () => {
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1
    goTo(nextIndex, 'right')
  }

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1
    goTo(prevIndex, 'left')
  }

  const totalSlats = 12
  const slatGap = gap / 2

  if (!slides || slides.length === 0) return null

  const currentSlide = slides[activeIndex]

  return (
    <div className={`relative w-full ${className}`} style={currentSlide.aspectRatio ? undefined : { height: `${height + 60}px` }}>
      {label && (
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4 px-5 sm:px-6 md:px-10 lg:px-14">
          {label}
        </p>
      )}

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          height: currentSlide.aspectRatio ? undefined : `${height}px`,
          aspectRatio: currentSlide.aspectRatio,
          borderRadius: `${radius}px`,
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full transition-all duration-700"
            style={{
              objectFit: currentSlide.objectFit || 'cover',
              background: currentSlide.objectFit === 'contain' ? '#0a0a0a' : undefined,
              transform: isAnimating
                ? direction === 'right'
                  ? 'scale(1.05) translateX(2%)'
                  : 'scale(1.05) translateX(-2%)'
                : 'scale(1) translateX(0)',
              opacity: isAnimating ? 0.7 : 1,
            }}
          />
        </div>

        {/* Slat overlay effect */}
        <div className="absolute inset-0 flex pointer-events-none">
          {Array.from({ length: totalSlats }).map((_, i) => {
            const delay = (i / totalSlats) * 150
            return (
              <div
                key={i}
                className="relative h-full transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  width: `${slatWidth}px`,
                  marginRight: `${slatGap}px`,
                  transitionDelay: isAnimating ? `${delay}ms` : '0ms',
                  transform: isAnimating
                    ? direction === 'right'
                      ? 'scaleX(0.3) translateX(-100%)'
                      : 'scaleX(0.3) translateX(100%)'
                    : 'scaleX(1) translateX(0)',
                  opacity: isAnimating ? 0 : 1,
                  background: isAnimating
                    ? `linear-gradient(${direction === 'right' ? '90deg' : '270deg'}, rgba(0,0,0,0.95), rgba(0,0,0,0.7))`
                    : 'transparent',
                  borderRadius: `${radius / 2}px`,
                }}
              />
            )
          })}
        </div>

        {/* Slide info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
          {currentSlide.overlay ? (
            <div className="flex items-end justify-between">
              {currentSlide.overlay}
              <div className="hidden sm:block max-w-[60%] z-10">
                <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                  {currentSlide.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {currentSlide.title}
                </h3>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                {currentSlide.subtitle}
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {currentSlide.title}
              </h3>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      {controls && (
        <div className="flex items-center justify-between px-5 sm:px-6 md:px-10 lg:px-14 mt-4">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index, index > activeIndex ? 'right' : 'left')}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}