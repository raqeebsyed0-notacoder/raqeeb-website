import { useState } from 'react'

export function HTMLEmbedViewer({ src, title }: { src: string; title: string }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/10">
          <span className="text-sm text-white/70">{title}</span>
          <button
            onClick={() => setIsFullscreen(false)}
            className="px-3 py-1 text-xs text-white/70 hover:text-white border border-white/20 rounded transition"
          >
            ✕ Close
          </button>
        </div>
        <iframe
          src={src}
          title={title}
          className="w-full h-[calc(100%-49px)] border-0"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl">
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsFullscreen(true)}
          className="px-4 py-2 text-xs text-white/70 hover:text-white border border-white/20 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition"
        >
          ⛶ Full Screen
        </button>
      </div>
    </div>
  )
}
