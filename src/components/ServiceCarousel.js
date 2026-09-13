'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import usePrefersReducedMotion from './usePrefersReducedMotion'

const AUTO_DELAY = 6000
const TRANSITION_DURATION = 1000

export default function ServiceCarousel({ services }) {
  const viewportRef = useRef(null)
  const railRef = useRef(null)
  const cardRefs = useRef([])
  const containerRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)
  const [animState, setAnimState] = useState('centered')

  const activeIndexRef = useRef(0)
  const animStateRef = useRef('centered')
  const pendingIndexRef = useRef(null)
  const isPaused = useRef(false)
  const autoTimer = useRef(null)
  const inTransition = useRef(false)
  const containerCenterRef = useRef(0)
  const cardLayout = useRef([])

  const N = services?.length || 0

  const measure = useCallback(() => {
    const vp = viewportRef.current
    const rail = railRef.current
    if (!vp || !rail) return
    const vpRect = vp.getBoundingClientRect()
    containerCenterRef.current = vpRect.width / 2

    const layout = []
    let runningOffset = 0
    const gap = parseFloat(window.getComputedStyle(rail).gap || window.getComputedStyle(rail).columnGap || '0') || 0
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) break
      const rect = el.getBoundingClientRect()
      const cardW = rect.width
      if (i === 0) runningOffset = 0
      const center = runningOffset + cardW / 2
      layout.push({ cardW, center, left: runningOffset })
      runningOffset += cardW + gap
    }
    cardLayout.current = layout

    const totalW = runningOffset - gap
    if (totalW > 0) {
      const targetCenter = layout[activeIndexRef.current]?.center || 0
      const tx = containerCenterRef.current - targetCenter
      rail.style.transition = 'none'
      rail.style.transform = `translate3d(${tx}px,0,0)`
      rail.offsetHeight
    }
    updateActiveCardAppearance(activeIndexRef.current, 'centered')
  }, [N])

  const updateActiveCardAppearance = useCallback((idx, state) => {
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const cardInner = el.querySelector('.card-inner')
      if (!cardInner) continue
      if (i === idx && state === 'centered') {
        cardInner.classList.add('is-active')
        cardInner.classList.remove('is-inactive')
      } else {
        cardInner.classList.remove('is-active')
        cardInner.classList.add('is-inactive')
      }
    }
  }, [N])

  const goTo = useCallback((idx) => {
    if (inTransition.current) return
    if (N === 0) return
    if (reduced) {
      setActiveIndex(idx)
      activeIndexRef.current = idx
      setAnimState('centered')
      animStateRef.current = 'centered'
      updateActiveCardAppearance(idx, 'centered')
      return
    }

    const layout = cardLayout.current
    const vpCenter = containerCenterRef.current
    if (!layout[idx] || !vpCenter) return

    // Step 1: remove active from current card
    const prev = activeIndexRef.current
    updateActiveCardAppearance(prev, 'moving')
    const prevInner = cardRefs.current[prev]?.querySelector('.card-inner')
    if (prevInner) prevInner.classList.add('is-inactive')

    // Step 2: move rail to center the target card
    const targetCenter = layout[idx].center
    const tx = vpCenter - targetCenter

    const rail = railRef.current
    if (!rail) return

    inTransition.current = true
    pendingIndexRef.current = idx
    setAnimState('moving')
    animStateRef.current = 'moving'

    rail.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
    rail.style.transform = `translate3d(${tx}px,0,0)`
  }, [N, reduced, updateActiveCardAppearance])

  // transitionend handler
  useEffect(() => {
    const rail = railRef.current
    if (!rail || N === 0) return
    const onTransitionEnd = (e) => {
      if (e.propertyName !== 'transform') return
      if (animStateRef.current !== 'moving') return
      const idx = pendingIndexRef.current
      if (idx === null) return
      updateActiveCardAppearance(idx, 'centered')
      const inner = cardRefs.current[idx]?.querySelector('.card-inner')
      if (inner) {
        inner.classList.remove('is-inactive')
        inner.classList.add('is-active')
      }
      setAnimState('centered')
      animStateRef.current = 'centered'
      setActiveIndex(idx)
      activeIndexRef.current = idx
      pendingIndexRef.current = null
      inTransition.current = false
    }
    rail.addEventListener('transitionend', onTransitionEnd)
    return () => rail.removeEventListener('transitionend', onTransitionEnd)
  }, [N, updateActiveCardAppearance])

  const next = useCallback(() => {
    if (inTransition.current) return
    const idx = (activeIndexRef.current + 1) % N
    goTo(idx)
    resetAuto()
  }, [N, goTo])

  const prev = useCallback(() => {
    if (inTransition.current) return
    const idx = (activeIndexRef.current - 1 + N) % N
    goTo(idx)
    resetAuto()
  }, [N, goTo])

  const resetAuto = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current)
      autoTimer.current = null
    }
    if (!reduced && !isPaused.current) {
      autoTimer.current = setInterval(() => {
        if (!isPaused.current && !inTransition.current) {
          const idx = (activeIndexRef.current + 1) % N
          goTo(idx)
        }
      }, AUTO_DELAY)
    }
  }, [N, reduced, goTo])

  // Setup
  useEffect(() => {
    if (N === 0) return
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    resetAuto()
    return () => {
      window.removeEventListener('resize', onResize)
      if (autoTimer.current) clearInterval(autoTimer.current)
    }
  }, [N, measure, resetAuto])

  // handle container hover for pause
  const onMouseEnter = () => { isPaused.current = true }
  const onMouseLeave = () => {
    isPaused.current = false
    resetAuto()
  }

  // swipe
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchActive = useRef(false)
  const touchMoved = useRef(false)
  const touchDx = useRef(0)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchActive.current = true
    touchMoved.current = false
    touchDx.current = 0
    isPaused.current = true
  }
  const onTouchMove = (e) => {
    if (!touchActive.current) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      touchMoved.current = true
      touchDx.current = dx
      e.preventDefault()
    }
  }
  const onTouchEnd = () => {
    if (!touchActive.current) return
    if (touchMoved.current && Math.abs(touchDx.current) > 40) {
      if (touchDx.current < 0) next()
      else prev()
    }
    touchActive.current = false
    setTimeout(() => { isPaused.current = false; resetAuto() }, 2500)
  }

  // keyboard
  const handleKeyboard = (e) => {
    if (e.key === 'ArrowLeft') { prev(); e.preventDefault() }
    if (e.key === 'ArrowRight') { next(); e.preventDefault() }
  }

  const setActiveAndGo = (idx) => {
    if (idx === activeIndexRef.current || inTransition.current) return
    goTo(idx)
    resetAuto()
  }

  if (N === 0) return null

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={handleKeyboard}
        tabIndex={0}
        role="region"
        aria-label="Services carousel"
      >
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(76, 175, 80, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 200, 160, 0.8) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }} />
          <div className="absolute inset-0 opacity-[0.06] animate-carousel-glow" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(76, 175, 80, 0.15), transparent 60%)',
          }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none">
            <path className="animate-circuit-flow" stroke="rgba(76, 175, 80, 0.7)" strokeWidth="0.8" strokeDasharray="6 14" d="M0 200 H200 L250 150 H350 L400 200 H800" />
            <path className="animate-circuit-flow-delay" stroke="rgba(120, 200, 180, 0.5)" strokeWidth="0.8" strokeDasharray="4 10" d="M0 300 H150 L200 250 H500 L550 300 H800" />
            <circle r="3" fill="rgba(120, 200, 180, 0.6)">
              <animateMotion dur="7s" repeatCount="indefinite" path="M0 200 H200 L250 150 H350 L400 200 H800" />
            </circle>
            <circle r="3" fill="rgba(76, 175, 80, 0.6)">
              <animateMotion dur="10s" begin="2s" repeatCount="indefinite" path="M0 300 H150 L200 250 H500 L550 300 H800" />
            </circle>
          </svg>
        </div>

        {/* Spotlight behind active card */}
        <div
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[45%] h-2/3 opacity-0 transition-opacity duration-800 z-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(76, 175, 80, 0.09) 0%, rgba(139, 195, 74, 0.05) 40%, transparent 70%)`,
            filter: 'blur(30px)',
            opacity: animState === 'centered' ? 1 : 0
          }}
        />

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          className="relative overflow-hidden select-none z-1"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Previous button */}
          <button
            onClick={prev}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#4CAF50] hover:border-[#4CAF50]/30 transition-all z-30"
            aria-label="Previous service"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div ref={railRef} className="flex gap-[30px] md:gap-[60px] lg:gap-[100px]">
            {services.map((S, i) => (
              <Link
                key={S.label}
                href={S.href}
                ref={(el) => { cardRefs.current[i] = el }}
                onClick={(e) => {
                  if (animState === 'moving') { e.preventDefault(); return }
                  if (i === activeIndexRef.current) return
                  e.preventDefault()
                  setActiveAndGo(i)
                }}
                className="shrink-0 w-[78%] md:w-[48%] lg:w-[30%] xl:w-[26%] block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4CAF50]"
              >
                <div className="card-inner h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(76,175,80,0.25),0_0_50px_rgba(76,175,80,0.12)] hover:border-[#4CAF50]/50">
                  {S.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img src={S.image} alt={S.label} className="w-full h-full object-cover" loading={i < 3 ? 'eager' : 'lazy'} draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D24]/85 via-[#0B3D24]/25 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] gradient-dark flex items-center justify-center overflow-hidden">
                      <S.icon className="w-16 h-16 text-[#8BC34A]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D24]/85 to-transparent" />
                    </div>
                  )}
                  <div className="p-4 md:p-5 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <S.icon className="w-5 h-5 text-[#4CAF50] transition-colors duration-500" />
                      <h3 className="font-heading font-bold text-sm md:text-base text-[#0B3D24] transition-colors duration-500">{S.label}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 transition-colors duration-500">{S.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#4CAF50] transition-all duration-500 group-hover:gap-2">
                      Explore Service
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#4CAF50] hover:border-[#4CAF50]/30 transition-all z-30"
            aria-label="Next service"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mt-6 gap-3 z-10 relative">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveAndGo(i)}
            className={`transition-all duration-500 rounded-full ${
              i === activeIndex
                ? 'w-8 h-2 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to service ${i + 1}`}
            disabled={animState === 'moving'}
          />
        ))}
        <span className="text-xs text-gray-400 ml-2 font-medium">
          {String(activeIndex + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}
        </span>
      </div>

      <style>{`
        @keyframes carousel-glow-pulse {
          0%, 100% { opacity: 0.06; transform: scale(0.95); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        .animate-carousel-glow {
          animation: carousel-glow-pulse 5s ease-in-out infinite;
        }
        @keyframes circuit-flow {
          to { stroke-dashoffset: -200; }
        }
        .animate-circuit-flow {
          animation: circuit-flow 4s linear infinite;
        }
        .animate-circuit-flow-delay {
          animation: circuit-flow 6s linear infinite;
        }

        .card-inner:hover {
          transform: scale(1.03) !important;
          border-color: rgba(76, 175, 80, 0.5) !important;
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.25), 0 0 50px rgba(76, 175, 80, 0.12) !important;
        }

        .card-inner.is-active {
          border-color: rgba(76, 175, 80, 0.5) !important;
          box-shadow: 0 8px 40px rgba(76, 175, 80, 0.12);
          background: white;
          transition: all 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .card-inner.is-inactive {
          opacity: 0.55;
          border-color: rgba(0, 0, 0, 0.06);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          background: white;
          transition: all 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-carousel-glow,
          .animate-circuit-flow,
          .animate-circuit-flow-delay {
            animation: none !important;
          }
          .card-inner:hover {
            transform: none !important;
          }
          .card-inner.is-inactive {
            opacity: 1;
          }
          .card-inner {
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
