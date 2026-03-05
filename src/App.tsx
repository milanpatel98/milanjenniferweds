import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COPY, type Lang } from './content'

const ASSETS = {
  curtainClosed: 'assets/curtain-closed-Bpkadld4.jpg',
  curtainOpen: 'assets/curtain-open-C9MqdT6G.jpg',
  curtainVideo: 'assets/curtain-video-BAKLj3Y5.mp4',
  scratchGold: 'assets/scratch-gold-DQrdz0lH.png',
  menuFrame: 'assets/menu-frame-BFE5kCs7.png',
  venueIllustration: 'assets/venue-illustration-DebdGS8I.png',
  dresscodeIllustration: 'assets/dresscode-illustration-BT5yPEQh.png',
  giftIcon: 'assets/gift-icon-BssCdzah.png',
  rsvpConfirmation: 'assets/rsvp-confirmation.webm',
} as const

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
  const t = COPY[lang]
  const scrolled = useScrolled(80)

  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--brown)]">
      <TopBar lang={lang} setLang={setLang} scrolled={scrolled} label={t.topbar.label} />

      <IntroCurtains t={t} />

      <main className="relative">
        <RevealSection t={t} />
        <CountdownSection t={t} />
        <VenueSection t={t} />
        <MenuSection t={t} />
        <DressCodeSection t={t} />
        <GiftsSection t={t} />
        <TransportSection t={t} />
        <RsvpSection t={t} />
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
            'pointer-events-auto font-display text-sm tracking-[0.2em]',
            scrolled ? 'opacity-90' : 'opacity-100',
          ].join(' ')}
        >
          {label}
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <div
            className={[
              'flex items-center rounded-full border p-1 text-[11px] tracking-[0.25em] transition',
              'border-[color:var(--brown-20)]',
              scrolled ? 'bg-[color:rgba(250,248,245,0.85)] backdrop-blur' : 'bg-transparent',
            ].join(' ')}
          >
            <button
              type="button"
              className={[
                'rounded-full px-3 py-2 transition',
                lang === 'en' ? 'bg-[color:var(--brown)] text-white' : 'text-[color:var(--brown)]',
              ].join(' ')}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={[
                'rounded-full px-3 py-2 transition',
                lang === 'es' ? 'bg-[color:var(--brown)] text-white' : 'text-[color:var(--brown)]',
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

function IntroCurtains({ t }: { t: (typeof COPY)[Lang] }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const onContinue = async () => {
    if (phase !== 'closed') return
    setPhase('opening')
    // Wait a tick so the video is in the DOM.
    requestAnimationFrame(() => {
      const audio = audioRef.current
      if (audio) {
        audio.volume = 0.65
        audio.loop = true
        void audio.play().catch(() => {
          // If playback fails, we silently continue (some browsers block until fully user-initiated).
        })
      }
      void videoRef.current?.play().catch(() => {
        // If autoplay is blocked, user already interacted, so play should succeed.
      })
    })
  }

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden">
      <audio ref={audioRef} src="assets/intro-music.mp3" preload="auto" />
      <img
        src={phase === 'open' ? ASSETS.curtainOpen : ASSETS.curtainClosed}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <AnimatePresence>
        {phase === 'opening' && (
          <motion.video
            key="curtain-video"
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={ASSETS.curtainVideo}
            muted
            playsInline
            onEnded={() => setPhase('open')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <div className="h-16" />

        {phase === 'open' && (
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="font-display text-[10px] tracking-[0.35em] opacity-90 md:text-xs">
              {t.intro.invited}
            </div>
            <div className="mt-3 font-display text-[10px] tracking-[0.35em] opacity-90 md:text-xs">
              {t.intro.celebrateWeddingOf}
            </div>

            <div className="mt-5 font-script text-6xl leading-none md:text-7xl lg:text-8xl">
              {t.intro.names.a}
            </div>
            <div className="mt-2 font-script text-4xl leading-none md:text-5xl lg:text-6xl">&amp;</div>
            <div className="mt-2 font-script text-6xl leading-none md:text-7xl lg:text-8xl">
              {t.intro.names.b}
            </div>

            <div className="mx-auto mt-6 max-w-xl font-body text-[13px] leading-6 opacity-90 md:text-[15px] md:leading-7">
              {t.intro.message}
            </div>
          </motion.div>
        )}

        <div className="mt-10" />

        {phase !== 'open' ? (
          <button
            type="button"
            onClick={onContinue}
            className="rounded-full border border-[color:var(--brown-20)] bg-[color:rgba(250,248,245,0.85)] px-6 py-3 font-display text-xs tracking-[0.24em] text-[color:var(--brown)] backdrop-blur transition hover:bg-[color:rgba(92,32,24,0.06)]"
          >
            {t.intro.tapToContinue}
          </button>
        ) : (
          <motion.button
            type="button"
            className="mt-2 flex flex-col items-center gap-3 font-display text-[10px] tracking-[0.35em]"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
        )}
      </div>

    </section>
  )
}

function SectionShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={['relative px-4 py-14 md:px-6 md:py-16', className ?? ''].join(' ')}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}

function RevealSection({ t }: { t: (typeof COPY)[Lang] }) {
  const [revealed, setRevealed] = useState([false, false, false])
  const all = revealed.every(Boolean)

  return (
    <SectionShell>
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

        <FadeIn delay={0.2}>
          <div className="mt-8 font-display text-[10px] tracking-[0.35em] opacity-70 md:text-xs">
            {t.reveal.hint}
          </div>
          <div className="mt-3">
            <span
              className={[
                'inline-flex items-center rounded-full border px-4 py-2 font-display text-[10px] tracking-[0.28em] transition',
                'border-[color:var(--brown-15)] bg-[color:var(--brown-08)]',
                all ? 'opacity-100' : 'opacity-50',
              ].join(' ')}
            >
              {t.reveal.parts.day} {t.reveal.parts.month} {t.reveal.parts.year}
            </span>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function CountdownSection({ t }: { t: (typeof COPY)[Lang] }) {
  const target = useMemo(() => new Date('2026-06-06T16:00:00'), [])
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
    <SectionShell className="pt-2">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <div className="font-script text-5xl md:text-6xl">{t.countdown.title}</div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-4 gap-4 md:gap-6">
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
          <div className="mt-6 font-display text-[10px] tracking-[0.35em] opacity-70 md:text-xs">{t.countdown.until}</div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function VenueSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <FadeIn className="order-2 md:order-1">
          <div className="inline-flex items-center rounded-full border border-[color:var(--brown-15)] bg-[color:var(--brown-08)] px-4 py-2 font-display text-[10px] tracking-[0.28em]">
            {t.venue.extra}
          </div>
          <div className="mt-6 font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">{t.venue.title}</div>
          <div className="mt-3 font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">{t.venue.at}</div>
          <div className="mt-4 font-script text-5xl leading-none md:text-6xl">{t.venue.name}</div>
          <div className="mt-5 font-display text-[11px] tracking-[0.24em] opacity-85">
            <div>{t.venue.address1}</div>
            <div>{t.venue.address2}</div>
          </div>
          <div className="mt-5 font-display text-sm tracking-[0.18em] opacity-90">{t.venue.dateLine}</div>
          <div className="mt-1 font-display text-[11px] tracking-[0.24em] opacity-80">{t.venue.follow}</div>
        </FadeIn>

        <FadeIn className="order-1 md:order-2" delay={0.1}>
          <div className="mx-auto max-w-md">
            <img
              src={ASSETS.venueIllustration}
              alt=""
              className="w-full select-none"
              draggable={false}
            />
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function MenuSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-xl text-center">
        <FadeIn>
          <div className="font-display text-[10px] tracking-[0.35em] opacity-80 md:text-xs">{t.menu.date}</div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          <div className="relative mx-auto max-w-md md:max-w-lg">
            <img src={ASSETS.menuFrame} alt="" className="w-full select-none" draggable={false} />
            <div className="absolute inset-0 grid place-items-center px-10 py-12">
              <div className="w-full">
                {t.menu.courses.map((c, idx) => (
                  <div key={c.label} className={idx === 0 ? '' : 'mt-6'}>
                    <div className="font-display text-[10px] tracking-[0.35em] opacity-90 md:text-xs">{c.label}</div>
                    <div className="mt-2 whitespace-pre-line font-body text-[13px] leading-6 opacity-90 md:text-[14px]">
                      {c.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function DressCodeSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <FadeIn>
          <div className="font-script text-5xl md:text-6xl">{t.dressCode.title}</div>
          <div className="mt-4 max-w-md font-body text-[13px] leading-6 opacity-90 md:text-[15px] md:leading-7">
            {t.dressCode.body}
          </div>
          <div className="mt-6 font-display text-[11px] tracking-[0.24em] opacity-90">{t.dressCode.attire}</div>
          <div className="mt-1 font-display text-[11px] tracking-[0.24em] opacity-75">{t.dressCode.avoid}</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-md">
            <img
              src={ASSETS.dresscodeIllustration}
              alt=""
              className="w-full select-none"
              draggable={false}
            />
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
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--brown-15)] bg-white/60">
            <img src={ASSETS.giftIcon} alt="" className="h-8 w-8 select-none" draggable={false} />
          </div>
          <div className="font-script text-5xl md:text-6xl">{t.gifts.title}</div>
          <div className="mx-auto mt-4 max-w-xl font-body text-[13px] leading-6 opacity-90 md:text-[15px] md:leading-7">
            {t.gifts.body}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-[color:var(--brown-15)] bg-white/55 px-6 py-7 backdrop-blur">
            <div className="font-display text-[10px] tracking-[0.35em] opacity-90">{t.gifts.bankDetails}</div>
            <div className="mt-4 space-y-2 font-display text-[11px] tracking-[0.18em] opacity-90">
              <div>{t.gifts.accountHolder}</div>
              <div>{t.gifts.iban}</div>
              <div>{t.gifts.reference}</div>
            </div>
            <div className="mt-5 font-body text-[13px] opacity-85">{t.gifts.love}</div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}

function TransportSection({ t }: { t: (typeof COPY)[Lang] }) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <div className="font-script text-5xl md:text-6xl">{t.transport.title}</div>
          <div className="mx-auto mt-4 max-w-xl font-body text-[13px] leading-6 opacity-90 md:text-[15px] md:leading-7">
            {t.transport.body}
          </div>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-[color:var(--brown-15)] bg-white/55 px-6 py-7 text-left backdrop-blur">
              <div className="font-display text-[10px] tracking-[0.35em] opacity-90">{t.transport.busDeparture}</div>
              <div className="mt-4 font-body text-[14px] opacity-90">{t.transport.busDeparturePlace}</div>
              <div className="mt-1 font-display text-sm tracking-[0.18em] opacity-90">{t.transport.busDepartureTime}</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="rounded-3xl border border-[color:var(--brown-15)] bg-white/55 px-6 py-7 text-left backdrop-blur">
              <div className="font-display text-[10px] tracking-[0.35em] opacity-90">{t.transport.returnTo}</div>
              <div className="mt-4 font-body text-[14px] opacity-90">{t.transport.busDeparturePlace}</div>
              <div className="mt-1 font-display text-sm tracking-[0.18em] opacity-90">{t.transport.returnTime}</div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.22}>
          <div className="mt-6 font-display text-[10px] tracking-[0.35em] opacity-70 md:text-xs">{t.transport.note}</div>
        </FadeIn>
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
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  const [song, setSong] = useState('')
  const [needsBus, setNeedsBus] = useState(false)
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
              <div className="font-body text-[13px] opacity-80">{t.rsvp.subtitle}</div>
              <div className="mt-3 font-script text-5xl md:text-6xl">{t.rsvp.title}</div>
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
                    <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.dietary}</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                    />
                  </div>

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

                  <div>
                    <label className="font-display text-[10px] tracking-[0.35em] opacity-85">{t.rsvp.song}</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--brown-15)] bg-white/70 px-4 py-3 font-body text-[14px] outline-none focus:border-[color:var(--brown-20)]"
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--brown-15)] bg-white/60 px-4 py-3">
                    <input type="checkbox" checked={needsBus} onChange={(e) => setNeedsBus(e.target.checked)} />
                    <span className="font-body text-[14px]">{t.rsvp.needsBus}</span>
                  </label>

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
            <div className="mx-auto max-w-sm">
              <video className="w-full" src={ASSETS.rsvpConfirmation} autoPlay muted playsInline loop />
            </div>
            <div className="mt-6 font-script text-5xl md:text-6xl">{t.rsvp.thanksTitle}</div>
            <div className="mx-auto mt-4 max-w-xl font-body text-[13px] leading-6 opacity-90 md:text-[15px] md:leading-7">
              {t.rsvp.thanksBody}
            </div>
            <div className="mt-5 font-script text-3xl opacity-95">{t.rsvp.thanksFrom}</div>
          </FadeIn>
        )}
      </div>
    </SectionShell>
  )
}

export default App
