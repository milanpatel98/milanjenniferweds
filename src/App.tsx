import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COPY, type Lang } from './content'

const ASSETS = {
  curtainClosed: 'assets/curtain-closed-Bpkadld4.jpg',
  curtainOpen: 'assets/curtain-open-C9MqdT6G.jpg',
  curtainVideo: 'assets/curtain-video-BAKLj3Y5.mp4',
  scratchGold: 'assets/scratch-gold-DQrdz0lH.png',
  venueIllustration: 'assets/venue-illustration.png',
  dresscodeIllustration: 'assets/dresscode-illustration-BT5yPEQh.png',
  giftIcon: 'assets/gift-icon-BssCdzah.png',
  rsvpConfirmation: 'assets/rsvp-confirmation.webm',
  topbarLogo: 'assets/ram.png',
  weddingRings: 'assets/wedding-rings.jpg',
  transportCeremony: 'assets/transport-ceremony.png',
  transportReception: 'assets/transport-reception.png',
  thankYouCard: 'assets/thank-you-card.jpg',
  introCross: 'assets/intro-cross.png',
} as const

const WRAPPING_CONFETTI_COLORS = ['#FFFFFF', '#FFd700', '#d4af37', '#b8860b']

function WrappingConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasEl: HTMLCanvasElement = canvas
    const ctx2D: CanvasRenderingContext2D = ctx

    const resize = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const timeDelta = 0.05
    const xAmplitude = 0.5
    const yAmplitude = 1
    const xVelocity = 2
    const yVelocity = 3

    let time = 0
    const confetti: Array<{
      x: number
      y: number
      xSpeed: number
      ySpeed: number
      radius: number
      tilt: number
      color: string
      phaseOffset: number
    }> = []

    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 12 + 8
      const tilt = (Math.random() * 10 - 5)
      const xSpeed = Math.random() * xVelocity - xVelocity / 2
      const ySpeed = Math.random() * yVelocity
      const x = Math.random() * canvasEl.width
      const y = Math.random() * canvasEl.height - canvasEl.height

      confetti.push({
        x,
        y,
        xSpeed,
        ySpeed,
        radius,
        tilt,
        color: WRAPPING_CONFETTI_COLORS[Math.floor(Math.random() * WRAPPING_CONFETTI_COLORS.length)]!,
        phaseOffset: i,
      })
    }

    const startTime = Date.now()
    const maxDuration = 10000
    const fadeDuration = 1800
    const gravity = 0.15

    let rafId: number | undefined
    let fadeStartTime: number | null = null

    function update() {
      const now = Date.now()
      const elapsed = now - startTime

      if (elapsed > maxDuration && fadeStartTime === null) {
        fadeStartTime = now
      }

      const fadeElapsed = fadeStartTime !== null ? now - fadeStartTime : 0
      if (fadeStartTime !== null && fadeElapsed >= fadeDuration) {
        if (rafId !== undefined) cancelAnimationFrame(rafId)
        window.removeEventListener('resize', resize)
        ctx2D.clearRect(0, 0, canvasEl.width, canvasEl.height)
        return
      }

      ctx2D.clearRect(0, 0, canvasEl.width, canvasEl.height)

      const isFading = fadeStartTime !== null
      const fadeAlpha = isFading ? Math.max(0, 1 - fadeElapsed / fadeDuration) : 1
      ctx2D.globalAlpha = fadeAlpha

      confetti.forEach((piece) => {
        piece.y += (Math.cos(piece.phaseOffset + time) + 1) * yAmplitude + piece.ySpeed
        piece.x += Math.sin(piece.phaseOffset + time) * xAmplitude + piece.xSpeed
        if (isFading) piece.ySpeed += gravity
        if (piece.x < 0) piece.x = canvasEl.width
        if (piece.x > canvasEl.width) piece.x = 0
        if (piece.y > canvasEl.height) piece.y = 0
        ctx2D.beginPath()
        ctx2D.lineWidth = piece.radius / 2
        ctx2D.strokeStyle = piece.color
        ctx2D.moveTo(piece.x + piece.tilt + piece.radius / 4, piece.y)
        ctx2D.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.radius / 4)
        ctx2D.stroke()
      })

      ctx2D.globalAlpha = 1
      time += timeDelta
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      ctx2D.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="canvas-wrapping"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      aria-hidden
    />
  )
}

function useScrolled(threshold = 100) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

type FadeInProps = {
  children: ReactNode
  delay?: number
  className?: string
}

function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

type ScratchCircleProps = {
  value: string
  isRevealed: boolean
  onReveal: () => void
  ariaLabel: string
}

function ScratchCircle({ value, isRevealed, onReveal, ariaLabel }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)
  const scratchingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const size = canvas.width
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const img = new Image()
    img.src = ASSETS.scratchGold
    img.onload = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      setReady(true)
    }

    img.onerror = () => {
      // If image fails, still allow reveal by interaction.
      ctx.fillStyle = '#d8c8a5'
      ctx.fillRect(0, 0, size, size)
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isRevealed) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [isRevealed])

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()
  }

  const computeClearedRatio = () => {
    const canvas = canvasRef.current
    if (!canvas) return 0
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return 0
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    // Alpha channel is every 4th byte
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++
    }
    return cleared / (data.length / 4)
  }

  const maybeReveal = () => {
    if (isRevealed) return
    const ratio = computeClearedRatio()
    if (ratio > 0.5) onReveal()
  }

  return (
    <div className="relative grid place-items-center">
      <div
        className="grid place-items-center rounded-full border border-[color:var(--brown-20)] bg-[color:var(--paper)] text-[color:var(--brown)] shadow-[0_10px_40px_rgba(92,32,24,0.08)]"
        style={{ width: 120, height: 120 }}
      >
        <div className="font-display text-3xl tracking-wide">{value}</div>
      </div>

      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        aria-label={ariaLabel}
        role="img"
        className={[
          'absolute inset-0 h-[120px] w-[120px] rounded-full',
          'touch-none',
          isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100',
          ready ? '' : 'opacity-90',
        ].join(' ')}
        onPointerDown={(e) => {
          if (isRevealed) return
          scratchingRef.current = true
          ;(e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId)
          scratchAt(e.clientX, e.clientY)
          maybeReveal()
        }}
        onPointerMove={(e) => {
          if (isRevealed || !scratchingRef.current) return
          scratchAt(e.clientX, e.clientY)
          maybeReveal()
        }}
        onPointerUp={() => {
          scratchingRef.current = false
          maybeReveal()
        }}
        onPointerCancel={() => {
          scratchingRef.current = false
          maybeReveal()
        }}
      />
    </div>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [introComplete, setIntroComplete] = useState(false)
  const [revealComplete, setRevealComplete] = useState(false)
  const t = COPY[lang]
  const scrolled = useScrolled(80)

  useEffect(() => {
    if (introComplete) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [introComplete])

  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--brown)]">
      <TopBar lang={lang} setLang={setLang} scrolled={scrolled} label={t.topbar.label} />

      <IntroCurtains t={t} onIntroComplete={() => setIntroComplete(true)} />

      <main className="relative">
        <RevealSection
          t={t}
          isComplete={revealComplete}
          onRevealComplete={() => setRevealComplete(true)}
        />
        {revealComplete && (
          <>
            <VenueSection t={t} />
            <DressCodeSection t={t} />
            <GiftsSection t={t} />
            <TransportSection t={t} />
            <RsvpSection t={t} />
          </>
        )}
      </main>
    </div>
  )
}

function TopBar({
  lang,
  setLang,
  scrolled,
  label,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  scrolled: boolean
  label: string
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div
          className={[
            'pointer-events-auto flex items-center transition-colors duration-300',
            scrolled ? 'opacity-90' : 'opacity-100',
          ].join(' ')}
          aria-label={label}
          role="img"
        >
          <span
            className="inline-block h-6 w-[140px] shrink-0 [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] md:h-7 md:w-[165px]"
            style={{
              backgroundColor: scrolled ? '#5c2018' : '#ffffff',
              transition: 'background-color 0.3s ease',
              maskImage: `url(${ASSETS.topbarLogo})`,
              WebkitMaskImage: `url(${ASSETS.topbarLogo})`,
            }}
          />
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <div
            className={[
              'flex items-center rounded-full border p-1 text-[11px] tracking-[0.25em] transition',
              'border-[color:var(--brown)]/30 bg-[color:rgba(250,248,245,0.92)] shadow-sm backdrop-blur',
            ].join(' ')}
          >
            <button
              type="button"
              className={[
                'rounded-full px-3 py-2 transition font-semibold',
                lang === 'en'
                  ? 'bg-[color:var(--brown)] text-white'
                  : 'bg-[color:var(--brown-08)] text-[color:var(--brown)] hover:bg-[color:var(--brown)]/15',
              ].join(' ')}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={[
                'rounded-full px-3 py-2 transition font-semibold',
                lang === 'es'
                  ? 'bg-[color:var(--brown)] text-white'
                  : 'bg-[color:var(--brown-08)] text-[color:var(--brown)] hover:bg-[color:var(--brown)]/15',
              ].join(' ')}
              onClick={() => setLang('es')}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntroCurtains({ t, onIntroComplete }: { t: (typeof COPY)[Lang]; onIntroComplete?: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const [muted, setMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    if (phase === 'open' && !completedRef.current) {
      completedRef.current = true
      onIntroComplete?.()
    }
  }, [phase, onIntroComplete])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = muted ? 0 : 0.65
  }, [muted])

  const onContinue = async () => {
    if (phase !== 'closed') return
    setPhase('opening')
    const audio = audioRef.current
    if (audio) {
      audio.volume = muted ? 0 : 0.65
      audio.loop = true
      void audio.play().catch(() => {
        // Mobile often blocks autoplay; unmute button will start playback on first tap.
      })
    }
    requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {})
    })
  }

  const onMuteToggle = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    const audio = audioRef.current
    if (audio) {
      audio.volume = nextMuted ? 0 : 0.65
      if (!nextMuted) {
        // On mobile, play() must run inside the user gesture (tap); otherwise audio stays silent.
        void audio.play().catch(() => {})
      }
    }
  }

  return (
    <section className="relative grid min-h-[100dvh] place-items-center overflow-x-hidden">
      <audio ref={audioRef} src="assets/intro-music.mp3" preload="auto" />
      {(phase === 'opening' || phase === 'open') && (
        <button
          type="button"
          onClick={onMuteToggle}
          style={{ touchAction: 'manipulation' }}
          className="fixed bottom-6 right-6 z-30 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--brown-20)] bg-[color:rgba(250,248,245,0.9)] text-[color:var(--brown)] backdrop-blur transition hover:bg-[color:rgba(92,32,24,0.08)] focus:outline-none active:bg-[color:rgba(92,32,24,0.08)] md:bottom-8 md:right-8"
          aria-label={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted ? (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      )}
      <img
        src={phase === 'open' ? ASSETS.curtainOpen : ASSETS.curtainClosed}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_top] lg:object-center"
        draggable={false}
      />

      <AnimatePresence>
        {phase === 'opening' && (
          <motion.video
            key="curtain-video"
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_top] lg:object-center"
            src={ASSETS.curtainVideo}
            muted
            playsInline
            onEnded={() => {
              setPhase('open')
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <div className="h-72 md:h-16" />

        {phase === 'open' && (
          <motion.div
            className="max-w-2xl pt-[4.5rem] md:pt-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="font-display text-[8px] tracking-[0.32em] text-[color:var(--brown)] opacity-95 md:text-[10px] md:tracking-[0.4em]">
              {t.intro.invited}
            </div>
            <div className="mt-1.5 font-display text-[8px] tracking-[0.32em] text-[color:var(--brown)] opacity-95 md:mt-3 md:text-[10px] md:tracking-[0.4em]">
              {t.intro.celebrateWeddingOf}
            </div>

            <div className="mt-4 font-script text-5xl leading-none text-[color:var(--brown)] md:mt-8 md:text-7xl lg:text-8xl">
              {t.intro.names.a}
            </div>
            <div className="mt-0.5 font-script text-2xl leading-none text-[color:var(--brown)] md:mt-2 md:text-4xl lg:text-5xl">&amp;</div>
            <div className="mt-0.5 font-script text-5xl leading-none text-[color:var(--brown)] md:mt-2 md:text-7xl lg:text-8xl">
              {t.intro.names.b}
            </div>

            <div className="mx-auto mt-4 max-w-[260px] font-display text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-[color:var(--brown)] opacity-90 md:mt-8 md:max-w-[360px] md:text-[11px] md:leading-[1.7] md:tracking-[0.14em]">
              {t.intro.message}
            </div>
          </motion.div>
        )}

        <div className="mt-2" />

        <AnimatePresence mode="wait">
          {phase === 'closed' && (
            <motion.div
              key="tap-to-continue"
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={onContinue}
                className="flex items-center justify-center focus:outline-none"
                aria-label={t.intro.tapToContinue}
              >
                <svg
                  className="h-10 w-10 animate-intro-cross-blink md:h-12 md:w-12"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="intro-cross-invert">
                      <feColorMatrix type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
                    </filter>
                    <mask id="intro-cross-mask">
                      <image
                        href={ASSETS.introCross}
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                        filter="url(#intro-cross-invert)"
                      />
                    </mask>
                  </defs>
                  <rect width="100" height="100" fill="white" mask="url(#intro-cross-mask)" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onContinue}
                className="rounded-full border border-[color:var(--brown-20)] bg-[color:rgba(250,248,245,0.85)] px-6 py-3 font-display text-xs tracking-[0.24em] text-[color:var(--brown)] backdrop-blur transition hover:bg-[color:rgba(92,32,24,0.06)]"
              >
                {t.intro.tapToContinue}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'open' ? (
          <motion.button
            type="button"
            className="mt-2 flex flex-col items-center gap-3 font-display text-[10px] tracking-[0.35em]"
            onClick={() => {
              const el = document.getElementById('reveal-section')
              const top = el ? el.getBoundingClientRect().top + window.scrollY : window.innerHeight
              window.scrollTo({ top, behavior: 'smooth' })
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span>{t.intro.scroll}</span>
            <motion.div
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brown-20)] bg-[color:rgba(250,248,245,0.75)]"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14m0 0 6-6m-6 6-6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.button>
        ) : null}
      </div>

    </section>
  )
}

function SectionShell({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={['relative px-4 py-14 md:px-6 md:py-16', className ?? ''].join(' ')}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}

function RevealSection({
  t,
  isComplete,
  onRevealComplete,
}: {
  t: (typeof COPY)[Lang]
  isComplete: boolean
  onRevealComplete?: () => void
}) {
  const [revealed, setRevealed] = useState([false, false, false])
  const all = revealed.every(Boolean)
  const completedRef = useRef(false)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    if (all && !completedRef.current) {
      completedRef.current = true
      onRevealComplete?.()
    }
  }, [all, onRevealComplete])

  useEffect(() => {
    if (!all) {
      setShowCountdown(false)
      return
    }
    // Wait for most of the \"We're getting married\" fade-in, then show countdown shortly after.
    const id = window.setTimeout(() => setShowCountdown(true), 400)
    return () => window.clearTimeout(id)
  }, [all])

  return (
    <>
      {all && <WrappingConfetti />}
      <SectionShell
        id="reveal-section"
        className={['pt-28 pb-0 md:pt-40 md:pb-2', isComplete ? '' : 'min-h-[100dvh]'].join(' ')}
      >
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <div className="font-script text-5xl md:text-6xl">{t.reveal.title}</div>
          <div className="mt-3 font-display text-[10px] tracking-[0.35em] opacity-90 md:text-xs">
            {t.reveal.subtitle}
          </div>
        </FadeIn>

        <div className="mt-10 flex items-center justify-center gap-4 md:gap-6">
          <ScratchCircle
            value={t.reveal.parts.day}
            ariaLabel="Scratch day"
            isRevealed={revealed[0]}
            onReveal={() => setRevealed((r) => [true, r[1], r[2]])}
          />
          <ScratchCircle
            value={t.reveal.parts.month}
            ariaLabel="Scratch month"
            isRevealed={revealed[1]}
            onReveal={() => setRevealed((r) => [r[0], true, r[2]])}
          />
          <ScratchCircle
            value={t.reveal.parts.year}
            ariaLabel="Scratch year"
            isRevealed={revealed[2]}
            onReveal={() => setRevealed((r) => [r[0], r[1], true])}
          />
        </div>

        <div className="mt-16 md:mt-20 lg:mt-24 flex items-center justify-center">
          {all && (
            <FadeIn delay={0.2}>
              <div className="font-script text-2xl text-[color:var(--brown)] md:text-3xl lg:text-4xl">
                {t.reveal.completeMessage}
              </div>
            </FadeIn>
          )}
        </div>

        {showCountdown && (
          <div className="mt-48 md:mt-64 lg:mt-72">
            <CountdownSection t={t} />
          </div>
        )}
      </div>
    </SectionShell>
    </>
  )
}

function CountdownSection({ t }: { t: (typeof COPY)[Lang] }) {
  const target = useMemo(() => new Date('2026-06-06T13:00:00'), [])
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now.getTime())
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const items = [
    { value: days, label: t.countdown.units.days },
    { value: hours, label: t.countdown.units.hours },
    { value: minutes, label: t.countdown.units.minutes },
    { value: seconds, label: t.countdown.units.seconds },
  ]

  return (
    <div id="countdown-section" className="mx-auto max-w-3xl text-center">
      <FadeIn>
        <div className="font-script text-5xl md:text-6xl">{t.countdown.title}</div>
      </FadeIn>

      <div className="mt-6 grid grid-cols-4 gap-4 md:mt-8 md:gap-6">
        {items.map((it, idx) => (
          <FadeIn key={it.label} delay={0.08 * idx}>
            <div className="rounded-2xl border border-[color:var(--brown-15)] bg-white/50 px-2 py-5 backdrop-blur">
              <div className="font-display text-4xl leading-none md:text-5xl">{pad2(it.value)}</div>
              <div className="mt-2 font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">
                {it.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-4 font-display text-[10px] tracking-[0.35em] opacity-70 md:mt-6 md:text-xs">
          {t.countdown.until}
        </div>
      </FadeIn>
    </div>
  )
}

function VenueSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:grid-rows-[auto_auto]">
        {/* Mobile: 1st. Desktop: left col, top */}
        <FadeIn className="order-1 text-center md:col-start-1 md:row-start-1">
          <div className="inline-flex items-center justify-center rounded-full border border-[color:var(--brown-15)] bg-[color:var(--brown-08)] px-4 py-2">
            <img src={ASSETS.weddingRings} alt="" className="h-6 w-auto select-none [mix-blend-mode:darken]" style={{ filter: 'contrast(1.15)' }} draggable={false} />
          </div>
          <div className="mt-6 font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">{t.venue.title}</div>
          <div className="mt-3 font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">{t.venue.at}</div>
        </FadeIn>

        {/* Mobile: 2nd (after "AT", before venue name). Desktop: right col */}
        <FadeIn className="order-2 -mt-4 md:mt-0 md:col-start-2 md:row-span-2 md:row-start-1" delay={0.1}>
          <div className="mx-auto max-w-md overflow-hidden rounded-sm" style={{ aspectRatio: '1/1' }}>
            <img
              src={ASSETS.venueIllustration}
              alt=""
              className="h-full w-full select-none object-cover object-[center_24%]"
              draggable={false}
            />
          </div>
        </FadeIn>

        {/* Mobile: 3rd. Desktop: left col, below title/at */}
        <FadeIn className="order-3 text-center md:col-start-1 md:row-start-2">
          <a
            href="https://maps.app.goo.gl/TZHSgw9awoD54mPQA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block font-script text-5xl leading-none text-[color:var(--brown)] no-underline transition hover:opacity-80 md:mt-0 md:text-6xl"
          >
            {t.venue.name}
          </a>
          <a
            href="https://maps.app.goo.gl/TZHSgw9awoD54mPQA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block font-display text-[11px] tracking-[0.24em] opacity-85 no-underline transition hover:opacity-100"
          >
            <div>{t.venue.address1}</div>
            <div>{t.venue.address2}</div>
          </a>
          <div className="mt-5 font-display text-base font-bold tracking-[0.18em] opacity-100">{t.venue.dateLine}</div>
          <div className="mt-1 font-display text-[11px] tracking-[0.24em] opacity-80">{t.venue.follow}</div>
          <a
            href="https://maps.app.goo.gl/AqAJ7XpT1PwZxhwu9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block font-script text-2xl leading-tight text-[color:var(--brown)] no-underline transition hover:opacity-80 md:text-3xl"
          >
            {t.venue.receptionName}
          </a>
          <a
            href="https://maps.app.goo.gl/AqAJ7XpT1PwZxhwu9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block font-display text-[11px] tracking-[0.24em] opacity-85 no-underline transition hover:opacity-100"
          >
            <div>{t.venue.receptionAddress1}</div>
            <div>{t.venue.receptionAddress2}</div>
          </a>
          <div className="mt-5 font-display text-base font-bold tracking-[0.18em] opacity-100">{t.venue.receptionDateLine}</div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function DressCodeSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="flex flex-col gap-10">
        <FadeIn className="text-center">
          <div className="font-script text-5xl md:text-6xl">{t.dressCode.title}</div>
          <FadeIn delay={0.05} className="mt-6">
            <div className="mx-auto max-w-md">
              <img
                src={ASSETS.dresscodeIllustration}
                alt=""
                className="w-full select-none"
                draggable={false}
              />
            </div>
          </FadeIn>
          <div className="mx-auto mt-6 max-w-md font-body text-[14px] leading-7 text-[color:var(--brown)] opacity-100 md:text-[16px] md:leading-8">
            {t.dressCode.body}
          </div>
          <div className="mt-6 font-display font-bold text-[12px] tracking-[0.26em] text-[color:var(--brown)] opacity-100 md:text-[13px]">
            {t.dressCode.attire}
          </div>
          <div className="mt-1 font-display font-bold text-[12px] tracking-[0.26em] text-[color:var(--brown)] opacity-100 md:text-[13px]">
            {t.dressCode.avoid}
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function GiftsSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <div className="mx-auto mb-12 flex justify-center md:mb-14">
            <img src={ASSETS.giftIcon} alt="" className="h-[120px] w-[120px] select-none" draggable={false} />
          </div>
          <div className="font-script text-5xl md:text-6xl">{t.gifts.title}</div>
          <div className="mx-auto mt-8 max-w-xl py-4 font-body text-[13px] leading-6 opacity-90 md:mt-10 md:text-[15px] md:leading-7">
            {t.gifts.body}
          </div>
        </FadeIn>

      </div>
    </SectionShell>
  )
}

const MAPS_CHURCH = 'https://maps.app.goo.gl/TZHSgw9awoD54mPQA'
const MAPS_RECEPTION = 'https://maps.app.goo.gl/AqAJ7XpT1PwZxhwu9'

function TransportSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <div className="font-script text-5xl md:text-6xl">{t.transport.title}</div>
          <div className="mx-auto mt-16 max-w-xl font-body text-[13px] leading-6 opacity-90 md:mt-20 md:text-[15px] md:leading-7">
            {t.transport.body}
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-md md:mt-20">
          <FadeIn delay={0.08}>
            <div className="mb-3 font-display text-[10px] tracking-[0.28em] text-[color:var(--brown)] opacity-80">
              {t.transport.directionsLabel}
            </div>
          </FadeIn>
          <div className="flex flex-col gap-3">
          <FadeIn delay={0.1}>
            <a
              href={MAPS_CHURCH}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.transport.ceremonyCta} — St. Thomas Catholic Church`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3.5 transition hover:bg-[color:var(--brown-08)] active:scale-[0.99]"
            >
              <span className="font-body text-[13px] font-medium text-[color:var(--brown)]">{t.transport.ceremonyCta}</span>
              <img
                src={ASSETS.transportCeremony}
                alt=""
                className="h-7 w-7 shrink-0 object-contain [mix-blend-mode:multiply]"
                draggable={false}
              />
            </a>
          </FadeIn>
          <FadeIn delay={0.18}>
            <a
              href={MAPS_RECEPTION}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.transport.receptionCta} — Aria Event Hall`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3.5 transition hover:bg-[color:var(--brown-08)] active:scale-[0.99]"
            >
              <span className="font-body text-[13px] font-medium text-[color:var(--brown)]">{t.transport.receptionCta}</span>
              <img
                src={ASSETS.transportReception}
                alt=""
                className="h-7 w-7 shrink-0 object-contain [mix-blend-mode:multiply]"
                draggable={false}
              />
            </a>
          </FadeIn>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

type Attendance = 'yes' | 'no' | ''

function RsvpSection({ t }: { t: (typeof COPY)[Lang] }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('')
  const [guestCount, setGuestCount] = useState(1)
  const [guestNames, setGuestNames] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot

  useEffect(() => {
    const count = attendance === 'yes' ? guestCount : 0
    const extra = Math.max(0, count - 1)
    setGuestNames((prev) => {
      const next = prev.slice(0, extra)
      while (next.length < extra) next.push('')
      return next
    })
  }, [attendance, guestCount])

  const validate = () => {
    if (!fullName.trim()) return t.rsvp.required
    if (attendance !== 'yes' && attendance !== 'no') return t.rsvp.required
    if (attendance === 'yes') {
      if (guestCount < 1) return t.rsvp.required
      const extra = Math.max(0, guestCount - 1)
      for (let i = 0; i < extra; i++) {
        if (!guestNames[i]?.trim()) return t.rsvp.required
      }
    }
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    if (website.trim()) {
      // Bots.
      setSubmitted(true)
      return
    }
    setSubmitting(true)
    try {
      // 1:1 UI: emulate async request
      await new Promise((r) => setTimeout(r, 900))
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionShell>
      <div className="mx-auto max-w-xl">
        {!submitted ? (
          <>
            <FadeIn className="text-center">
              <div className="font-script text-5xl md:text-6xl">{t.rsvp.title}</div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <form
                onSubmit={onSubmit}
                className="mt-10 rounded-3xl border border-[color:var(--brown-15)] bg-white/55 p-6 backdrop-blur md:p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.fullName}</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.email}</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <div className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.willAttend}</div>
                    <div className="mt-3 grid gap-3">
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--brown-15)] bg-white/60 px-4 py-3">
                        <input
                          type="radio"
                          name="attendance"
                          checked={attendance === 'yes'}
                          onChange={() => setAttendance('yes')}
                        />
                        <span className="font-body text-[14px]">{t.rsvp.yes}</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--brown-15)] bg-white/60 px-4 py-3">
                        <input
                          type="radio"
                          name="attendance"
                          checked={attendance === 'no'}
                          onChange={() => setAttendance('no')}
                        />
                        <span className="font-body text-[14px]">{t.rsvp.no}</span>
                      </label>
                    </div>
                  </div>

                  {attendance === 'yes' && (
                    <>
                      <div>
                        <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.guestCount}</label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={guestCount}
                          onChange={(e) => setGuestCount(clampInt(Number(e.target.value || '1'), 1, 10))}
                          className="mt-2 w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                        />
                      </div>

                      {guestCount > 1 && (
                        <div>
                          <div className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.guestNames}</div>
                          <div className="mt-2 space-y-3">
                            {guestNames.map((n, idx) => (
                              <input
                                key={idx}
                                className="w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                                placeholder={`Guest ${idx + 2} name`}
                                value={n}
                                onChange={(e) =>
                                  setGuestNames((prev) => {
                                    const next = [...prev]
                                    next[idx] = e.target.value
                                    return next
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.message}</label>
                    <textarea
                      rows={3}
                      className="mt-2 w-full resize-none rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                      placeholder="Write us a few words..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* honeypot */}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />

                  {error && <div className="font-body text-[13px] text-[color:var(--brown)] opacity-80">{error}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full rounded-full bg-[color:var(--brown)] px-6 py-3 font-display text-xs tracking-[0.24em] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? '...' : t.rsvp.submit}
        </button>
                </div>
              </form>
            </FadeIn>
          </>
        ) : (
          <FadeIn className="text-center">
            <p className="font-script text-4xl text-[color:var(--brown)] md:text-5xl">
              {t.rsvp.seeYouAtWedding}
            </p>
          </FadeIn>
        )}

        {/* Thank-you card: frame with style match (script + serif, dark brown, centered) */}
        <FadeIn className="mt-8 text-center" delay={submitted ? 0 : 0.2}>
          <div className="relative mx-auto max-w-md">
            <img
              src={ASSETS.thankYouCard}
              alt=""
              className="w-full select-none shadow-[0_12px_40px_rgba(92,32,24,0.12)]"
              draggable={false}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-8 py-10 text-[color:var(--brown)] md:px-12 md:py-14"
              aria-hidden="true"
            >
              <div className="font-script text-4xl leading-none md:text-5xl">{t.rsvp.thanksTitle}</div>
              <p className="mt-5 max-w-[88%] whitespace-pre-line text-center font-body text-[13px] leading-[1.65] md:mt-6 md:text-[15px] md:leading-[1.7]">
                {t.rsvp.thanksBody}
              </p>
              <div className="mt-6 whitespace-pre-line font-body text-base leading-snug md:text-lg">{t.rsvp.thanksFrom}</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

export default App