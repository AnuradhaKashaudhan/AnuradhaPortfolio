import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface LightboxProps {
  images: string[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex)

  useEffect(() => setIdx(initialIndex), [initialIndex])

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, prev, next])

  const isPlaceholder = images[idx]?.startsWith('[PLACEHOLDER')

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Image lightbox">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Controls */}
          <button onClick={onClose} aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 p-2 rounded-xl glass text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button onClick={prev} aria-label="Previous image"
                className="absolute left-4 z-10 p-3 rounded-xl glass text-white hover:bg-white/20 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={next} aria-label="Next image"
                className="absolute right-4 z-10 p-3 rounded-xl glass text-white hover:bg-white/20 transition-colors">
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-5xl w-full mx-8"
          >
            {isPlaceholder ? (
              <div className="w-full h-[60vh] rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/10 border border-white/10 flex flex-col items-center justify-center gap-3">
                <ZoomIn size={40} className="text-white/30" />
                <p className="text-white/40 text-sm font-mono">Screenshot placeholder</p>
              </div>
            ) : (
              <img
                src={images[idx]}
                alt={`Screenshot ${idx + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
          </motion.div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}

interface ImageGalleryProps {
  images: string[]
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const open = (i: number) => { setSelectedIdx(i); setLightboxOpen(true) }

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 ${className ?? ''}`}>
        {images.map((img, i) => {
          const isPlaceholder = img.startsWith('[PLACEHOLDER')
          return (
            <button
              key={i}
              onClick={() => open(i)}
              className="group relative rounded-xl overflow-hidden border border-white/6 hover:border-blue-500/30 transition-colors cursor-zoom-in"
              aria-label={`View screenshot ${i + 1}`}
            >
              {isPlaceholder ? (
                <div className="w-full h-36 bg-gradient-to-br from-blue-500/10 to-violet-500/8 flex flex-col items-center justify-center gap-2">
                  <ZoomIn size={20} className="text-white/20" />
                  <span className="text-xs text-white/20 font-mono">Screenshot {i + 1}</span>
                </div>
              ) : (
                <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-36 object-cover" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn size={20} className="text-white" />
              </div>
            </button>
          )
        })}
      </div>
      <Lightbox images={images} initialIndex={selectedIdx} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  )
}
