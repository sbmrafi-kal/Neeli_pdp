import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isMotionEligible } from '../analytics'
import './science-story-v3.css'

gsap.registerPlugin(ScrollTrigger)

export type ScienceStoryV3Props = {
  onSceneChange?: (scene: number) => void
}

type Scene = {
  key: 'droplet' | 'fibre' | 'scalp' | 'follicle'
  step: string
  navLabel: string
  eyebrow: string
  title: string
  body: string
  alt: string
  image: string
  evidenceLabel: string
  evidence: string[]
  qualifier?: string
}

const scenes: Scene[] = [
  {
    key: 'droplet',
    step: '01',
    navLabel: 'Formula',
    eyebrow: 'The complete formula',
    title: 'Five ingredients. Two recovery paths. One complete oil.',
    body:
      'A coconut-oil base brings Amla, Neeli, Karnasphota and Bhringraj into one multi-herb formula designed to care for the hair fibre, scalp and growth-cycle research story.',
    alt: 'Magnified deep violet-brown Neelibhringadi oil droplet with restrained botanical colour traces',
    image: 'droplet',
    evidenceLabel: 'Formula architecture',
    evidence: ['Lauric-acid-rich coconut oil', 'Amla · Neeli · Karnasphota · Bhringraj'],
  },
  {
    key: 'fibre',
    step: '02',
    navLabel: 'Fibre',
    eyebrow: 'Recovery path 1 · Hair fibre',
    title: 'First, help protect what your hair already has.',
    body:
      'Coconut oil’s lauric acid has a strong affinity for hair protein and is associated with fibre penetration and reduced protein loss from damaged and undamaged hair.',
    alt: 'Scientific macro cutaway of lauric-acid markers entering the hair fibre',
    image: 'fibre',
    evidenceLabel: 'Observed hair-fibre benefit',
    evidence: ['Fibre penetration', 'Reduced protein loss'],
  },
  {
    key: 'scalp',
    step: '03',
    navLabel: 'Scalp',
    eyebrow: 'Recovery path 1 · Scalp',
    title: 'Then, care for the scalp environment.',
    body:
      'Amla contributes antioxidant potential, Neeli brings traditional scalp-care use, and Karnasphota adds an emerging ingredient-level research story around scalp-stress signals.',
    alt: 'Scientific scalp cutaway with muted Amla and Neeli pathways and a copper Karnasphota pathway',
    image: 'scalp-karnasphota',
    evidenceLabel: 'Ingredient actions',
    evidence: [
      'Amla · antioxidant potential',
      'Neeli · traditional scalp care',
      'Karnasphota · experimental signal research',
    ],
    qualifier: 'Ingredient-level experimental evidence · not finished-product clinical proof',
  },
  {
    key: 'follicle',
    step: '04',
    navLabel: 'Follicle',
    eyebrow: 'Recovery path 2 · Follicle research',
    title: 'Finally, follow the Bhringraj research story.',
    body:
      'In preclinical dermal-papilla research, Bhringraj has shown molecular activity associated with the anagen phase. It is a promising ingredient story-not proof of regrowth from the finished oil.',
    alt: 'Scientific research view of a hair follicle and dermal papilla with restrained gold signalling',
    image: 'follicle',
    evidenceLabel: 'Preclinical signals',
    evidence: ['FGF-7 ↑', 'FGF-5 ↓', 'mTOR activity observed'],
    qualifier: 'Preclinical evidence only · clinical regrowth by the finished oil is not established',
  },
]

const camera = {
  desktop: [
    { from: { scale: 1.035, xPercent: 2.5, yPercent: 1.5 }, to: { scale: 1.175, xPercent: -3.5, yPercent: -1 } },
    { from: { scale: 1.025, xPercent: 3, yPercent: 1 }, to: { scale: 1.16, xPercent: -5.5, yPercent: -2 } },
    { from: { scale: 1.02, xPercent: 1.5, yPercent: 0 }, to: { scale: 1.14, xPercent: -2.5, yPercent: 1.5 } },
    { from: { scale: 1.02, xPercent: -2.5, yPercent: 1 }, to: { scale: 1.155, xPercent: 3.5, yPercent: -3 } },
  ],
  mobile: [
    { from: { scale: 1.015, xPercent: 2, yPercent: 1 }, to: { scale: 1.105, xPercent: -2, yPercent: -1 } },
    { from: { scale: 1.015, xPercent: 1, yPercent: 0 }, to: { scale: 1.115, xPercent: -3, yPercent: -1 } },
    { from: { scale: 1.01, xPercent: 1, yPercent: 0 }, to: { scale: 1.095, xPercent: -1, yPercent: 1 } },
    { from: { scale: 1.01, xPercent: -1, yPercent: 1 }, to: { scale: 1.105, xPercent: 2, yPercent: -2 } },
  ],
} as const

function SciencePicture({ scene }: { scene: Scene }) {
  const base = `/assets/science-v3/${scene.image}`
  return (
    <picture>
      <source media="(min-width: 900px)" type="image/webp" srcSet={`${base}-desktop.webp`} />
      <source media="(max-width: 699px)" type="image/webp" srcSet={`${base}-mobile.webp`} />
      <source type="image/webp" srcSet={`${base}-master.webp`} />
      <img
        src={`${base}-master.webp`}
        alt={scene.alt}
        width="1200"
        height="1600"
        // All four plates participate in the pinned scrub; eager loading avoids
        // blank frames when a shopper scrolls quickly through the sequence.
        loading="eager"
        fetchPriority={scene.key === 'droplet' ? 'high' : 'auto'}
      />
    </picture>
  )
}

function SceneTrace({ scene }: { scene: Scene['key'] }) {
  return (
    <svg className={`sv3-trace sv3-trace--${scene}`} viewBox="0 0 100 100" aria-hidden="true">
      {scene === 'droplet' && <path pathLength="1" d="M32 24 C55 12 82 32 74 68 C66 84 46 90 32 78" />}
      {scene === 'fibre' && <path pathLength="1" d="M18 78 C36 68 46 54 58 42 C72 28 84 22 92 18" />}
      {scene === 'scalp' && (
        <>
          <path className="sv3-trace__amla" pathLength="1" d="M22 71 C40 69 49 62 58 49" />
          <circle cx="58" cy="49" r="3.5" fill="#cca54e" />
          <path className="sv3-trace__neeli" pathLength="1" d="M18 80 C37 79 44 70 54 58" />
          <circle cx="54" cy="58" r="3.5" fill="#cca54e" />
          <path className="sv3-trace__karnasphota" pathLength="1" d="M82 84 C72 76 67 63 70 48 S80 28 85 18" />
          <circle cx="70" cy="48" r="3.5" fill="#cca54e" />
        </>
      )}
      {scene === 'follicle' && (
        <>
          <path pathLength="1" d="M48 86 C52 74 53 66 53 56" />
          <circle cx="53" cy="56" r="7" stroke="#cca54e" strokeWidth="1.8" fill="none" />
        </>
      )}
    </svg>
  )
}

function ScienceCopy({ scene, hidden }: { scene: Scene; hidden?: boolean }) {
  return (
    <article className={`sv3-copy sv3-copy--${scene.key}`} aria-hidden={hidden || undefined}>
      <header className="sv3-copy__eyebrow">
        <span>{scene.step}</span>
        <p>{scene.eyebrow}</p>
      </header>
      <h3 className="sv3-copy__title">{scene.title}</h3>
      <p className="sv3-copy__body">{scene.body}</p>
      <div className="sv3-evidence">
        <span>{scene.evidenceLabel}</span>
        <ul>
          {scene.evidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {scene.qualifier && <p className="sv3-qualifier">{scene.qualifier}</p>}
    </article>
  )
}

export default function ScienceStoryV3({ onSceneChange }: ScienceStoryV3Props) {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lastSceneRef = useRef(-1)
  const [activeScene, setActiveScene] = useState(0)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const shouldBeStatic = reducedMotionQuery.matches || !isMotionEligible()
    setStaticMode(shouldBeStatic)
    const syncLayoutMode = () => setStaticMode(reducedMotionQuery.matches || !isMotionEligible())
    reducedMotionQuery.addEventListener('change', syncLayoutMode)
    if (shouldBeStatic || !rootRef.current || !trackRef.current) {
      return () => {
        reducedMotionQuery.removeEventListener('change', syncLayoutMode)
      }
    }

    const root = rootRef.current
    const track = trackRef.current
    const stage = root.querySelector<HTMLElement>('.sv3-stage')
    const sceneNodes = Array.from(root.querySelectorAll<HTMLElement>('.sv3-scene'))
    const imageNodes = sceneNodes.map((scene) => scene.querySelector<HTMLElement>('.sv3-scene__media'))
    const atmosphereNodes = sceneNodes.map((scene) => scene.querySelector<HTMLElement>('.sv3-atmosphere'))
    const copyNodes = Array.from(root.querySelectorAll<HTMLElement>('.sv3-copy'))
    const copyGroups = copyNodes.map((copy) => Array.from(copy.children) as HTMLElement[])
    const progressNodes = Array.from(root.querySelectorAll<HTMLElement>('.sv3-progress li'))
    const tracePaths = Array.from(root.querySelectorAll<SVGGeometryElement>('.sv3-trace path, .sv3-trace circle'))
    const scrollCue = root.querySelector<HTMLElement>('.sv3-stage-cue')
    const media = gsap.matchMedia()

    const updateProgress = (progress: number) => {
      const mapped = progress * scenes.length
      progressNodes.forEach((node, index) => {
        const fill = Math.max(0, Math.min(1, mapped - index))
        node.style.setProperty('--sv3-progress', fill.toFixed(4))
      })
      if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 12))
    }

    const context = gsap.context(() => {
      gsap.set(sceneNodes, { autoAlpha: 0, clipPath: 'inset(0 0 0 0)' })
      gsap.set(sceneNodes[0], { autoAlpha: 1 })
      gsap.set(copyNodes, { autoAlpha: 0 })
      gsap.set(copyNodes[0], { autoAlpha: 1 })
      gsap.set(copyGroups.flat(), { autoAlpha: 0, y: 22, filter: 'blur(3px)' })
      gsap.set(copyGroups[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(tracePaths, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(atmosphereNodes, { xPercent: -45, autoAlpha: 0.05 })
      updateProgress(0)

      media.add(
        {
          desktop: '(min-width: 900px)',
          mobile: '(max-width: 899px)',
        },
        (motionContext) => {
          const mode = motionContext.conditions?.desktop ? 'desktop' : 'mobile'
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: track,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.55,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                updateProgress(self.progress)
                const next = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length))
                if (lastSceneRef.current === next) return
                lastSceneRef.current = next
                setActiveScene(next)
                onSceneChange?.(next)
              },
            },
          })

          scenes.forEach((scene, index) => {
            const at = index
            const image = imageNodes[index]
            const atmosphere = atmosphereNodes[index]
            const paths = sceneNodes[index].querySelectorAll<SVGGeometryElement>('.sv3-trace path, .sv3-trace circle')
            if (!image) return

            if (index > 0) {
              const wipeFrom = index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
              tl.to(
                sceneNodes[index - 1],
                { autoAlpha: 0.15, scale: 1.025, filter: 'blur(7px)', duration: 0.24 },
                at - 0.15,
              )
              tl.to(copyGroups[index - 1], {
                autoAlpha: 0,
                y: -14,
                filter: 'blur(3px)',
                duration: 0.12,
                stagger: 0.018,
              }, at - 0.12)
              tl.set(copyNodes[index - 1], { autoAlpha: 0 }, at - 0.01)
              tl.fromTo(
                sceneNodes[index],
                { autoAlpha: 0.25, clipPath: wipeFrom, filter: 'blur(8px)' },
                { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)', duration: 0.3, ease: 'power1.inOut' },
                at - 0.13,
              )
              tl.set(copyNodes[index], { autoAlpha: 1 }, at - 0.03)
              tl.fromTo(
                copyGroups[index],
                { autoAlpha: 0, y: 24, filter: 'blur(3px)' },
                { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.18, stagger: 0.035, ease: 'power2.out' },
                at - 0.01,
              )
            }

            tl.fromTo(image, camera[mode][index].from, { ...camera[mode][index].to, duration: 0.95 }, at)
            if (atmosphere) {
              tl.fromTo(
                atmosphere,
                { xPercent: -55, autoAlpha: 0.03 },
                { xPercent: 55, autoAlpha: 0.35, duration: 0.88 },
                at + 0.03,
              )
            }
            tl.to(paths, { strokeDashoffset: 0, duration: 0.64, stagger: 0.065 }, at + 0.14)
          })

          if (stage) {
            tl.fromTo(stage, { '--sv3-stage-glow': 0.12 }, { '--sv3-stage-glow': 0.34, duration: scenes.length - 0.05 }, 0)
          }

          return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
          }
        },
      )
    }, root)

    return () => {
      media.revert()
      context.revert()
      reducedMotionQuery.removeEventListener('change', syncLayoutMode)
    }
  }, [onSceneChange])

  return (
    <section
      ref={rootRef}
      className={`science-story-v3${staticMode ? ' sv3-static' : ''}`}
      id="science"
      aria-labelledby="science-v3-title"
    >
      <header className="sv3-intro">
        <div>
          <h2 id="science-v3-title">
            From one drop
            <span>to two recovery paths.</span>
          </h2>
        </div>
        <div className="sv3-intro-content">
          <p>
            Follow the formula from hair fibre to scalp and follicle research-while keeping every evidence
            boundary clear.
          </p>
        </div>
      </header>

      {staticMode ? (
        <div className="sv3-static-sequence">
          {scenes.map((scene) => (
            <section className={`sv3-static-scene sv3-static-scene--${scene.key}`} key={scene.key}>
              <figure className={`sv3-scene sv3-scene--${scene.key}`}>
                <div className="sv3-scene__media"><SciencePicture scene={scene} /></div>
                <div className="sv3-atmosphere" aria-hidden="true" />
                <SceneTrace scene={scene.key} />
              </figure>
              <ScienceCopy scene={scene} />
            </section>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="sv3-scroll">
          <div className="sv3-stage">
            <div className="sv3-scenes" aria-live="off">
              {scenes.map((scene, index) => (
                <figure
                  className={`sv3-scene sv3-scene--${scene.key}`}
                  key={scene.key}
                  aria-hidden={activeScene !== index}
                >
                  <div className="sv3-scene__media">
                    <SciencePicture scene={scene} />
                  </div>
                  <div className="sv3-atmosphere" aria-hidden="true" />
                  <SceneTrace scene={scene.key} />
                </figure>
              ))}
            </div>

            <div className="sv3-copy-stack">
              {scenes.map((scene, index) => (
                <ScienceCopy scene={scene} hidden={activeScene !== index} key={scene.key} />
              ))}
            </div>

            <p className="sv3-stage-cue" aria-hidden="true"><span>Scroll</span> to move through the formula</p>

            <ol className="sv3-progress" aria-label="Science story progress">
              {scenes.map((scene, index) => (
                <li key={scene.key} aria-current={activeScene === index ? 'step' : undefined}>
                  <span>{scene.step}</span>
                  <b>{scene.navLabel}</b>
                  <i aria-hidden="true"><em /></i>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
