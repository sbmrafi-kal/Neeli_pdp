import { useEffect, useRef, useState } from 'react'
import { isMotionEligible } from '../analytics'
export type ScienceRecoveryStoryProps = {
  onChapterChange?: (chapter: number) => void
}

const chapters = [
  {
    number: '01',
    label: 'Protect fibre · stabilise scalp',
    title: 'Keep more strength in every strand.',
  },
  {
    number: '02',
    label: 'Support anagen-linked signals',
    title: 'Support signals linked to the anagen phase.',
  },
  {
    number: '03',
    label: 'The extraction platform',
    title: 'Three milks. One traditional extraction matrix.',
  },
] as const

function ScientificPlate({ active }: { active: number }) {
  return (
    <figure className="srs-plate" data-active={active}>
      <svg viewBox="0 0 720 760" role="img" aria-labelledby="srs-plate-title srs-plate-description">
        <title id="srs-plate-title">Two-path hair recovery research plate</title>
        <desc id="srs-plate-description">
          A scientific illustration connects hair-fibre protection and preclinical anagen-linked signals to a
          triple-milk extraction platform.
        </desc>

        <defs>
          <clipPath id="srs-scope">
            <circle cx="360" cy="344" r="278" />
          </clipPath>
          <linearGradient id="srs-fibre-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b5967b" />
            <stop offset=".48" stopColor="#efe6dc" />
            <stop offset="1" stopColor="#954721" />
          </linearGradient>
        </defs>

        <circle className="srs-scope-rim" cx="360" cy="344" r="284" />
        <circle className="srs-scope-rule" cx="360" cy="344" r="252" />
        <path className="srs-axis" d="M360 60v568M76 344h568" />
        <g className="srs-scale" aria-hidden="true">
          <path d="M140 166h42M538 166h42M140 522h42M538 522h42" />
          <path d="M182 124v42M538 124v42M182 522v42M538 522v42" />
        </g>

        <g clipPath="url(#srs-scope)">
          <g className="srs-layer srs-layer--overview">
            <path className="srs-overview-path srs-overview-path--one" d="M118 590C190 490 228 278 337 163" />
            <path className="srs-overview-path srs-overview-path--two" d="M602 590C529 490 491 278 383 163" />
            <circle className="srs-overview-node srs-overview-node--one" cx="211" cy="410" r="54" />
            <circle className="srs-overview-node srs-overview-node--two" cx="509" cy="410" r="54" />
          </g>

          <g className="srs-layer srs-layer--fibre">
            <path className="srs-fibre-core" d="M-24 270C116 210 196 222 360 326S606 457 756 389" />
            <path className="srs-fibre-line" d="M-10 246C122 202 204 220 369 318S612 433 742 378" />
            <path className="srs-fibre-line" d="M-7 294C118 239 199 249 350 343S593 481 744 405" />
            <g className="srs-cuticle">
              <path d="M97 231l40 44-17 32-49-48zM177 236l43 55-18 30-46-55zM260 263l43 59-17 29-44-59z" />
              <path d="M342 306l45 57-16 29-46-56zM426 351l44 50-17 29-46-52zM511 387l43 40-17 31-45-43z" />
            </g>
            <g className="srs-lipid-dots">
              <circle cx="139" cy="257" r="7" />
              <circle cx="230" cy="278" r="7" />
              <circle cx="321" cy="321" r="7" />
              <circle cx="410" cy="368" r="7" />
              <circle cx="499" cy="407" r="7" />
            </g>
            <g className="srs-antioxidant">
              <path d="M124 492c52-13 86-47 95-102-56 1-94 30-95 102Z" />
              <path d="M215 390c-42 37-65 76-78 122" />
              <path d="M230 514c37-12 61-38 68-78-42 1-68 21-68 78Z" />
            </g>
          </g>

          <g className="srs-layer srs-layer--follicle">
            <path className="srs-skin" d="M82 246c88-24 176-24 264 0s176 24 292 0v390H82Z" />
            <path className="srs-follicle-wall" d="M326 176c-18 120-24 260 34 384 58-124 52-264 34-384" />
            <path className="srs-hair-shaft" d="M349 568c8-136 8-267-5-420M371 568c-8-136-8-267 5-420" />
            <ellipse className="srs-papilla" cx="360" cy="555" rx="42" ry="30" />
            <g className="srs-cell-field">
              <circle cx="320" cy="505" r="13" />
              <circle cx="344" cy="476" r="12" />
              <circle cx="379" cy="476" r="12" />
              <circle cx="402" cy="505" r="13" />
              <circle cx="360" cy="515" r="12" />
            </g>
            <g className="srs-signal srs-signal--up">
              <path d="M455 432v-84M437 367l18-19 18 19" />
              <circle cx="455" cy="432" r="8" />
            </g>
            <g className="srs-signal srs-signal--down">
              <path d="M263 346v84M245 411l18 19 18-19" />
              <circle cx="263" cy="346" r="8" />
            </g>
            <g className="srs-mtor">
              <circle cx="508" cy="512" r="38" />
              <circle cx="508" cy="512" r="7" />
              <path d="M508 464v20M508 540v20M460 512h20M536 512h20M474 478l14 14M528 532l14 14M542 478l-14 14M488 532l-14 14" />
            </g>
          </g>

          <g className="srs-layer srs-layer--matrix">
            <path className="srs-vessel" d="M246 337h228l-27 224c-3 28-27 49-55 49h-64c-28 0-52-21-55-49Z" />
            <path className="srs-liquid" d="M274 420c58-27 116 27 172 0l-17 137c-2 17-16 29-33 29h-72c-17 0-31-12-33-29Z" />
            <g className="srs-milk-drops">
              <path d="M254 172c0 35-52 35-52 0 0-20 26-58 26-58s26 38 26 58Z" />
              <path d="M386 143c0 35-52 35-52 0 0-20 26-58 26-58s26 38 26 58Z" />
              <path d="M518 172c0 35-52 35-52 0 0-20 26-58 26-58s26 38 26 58Z" />
            </g>
            <path className="srs-drop-line" d="M228 207c12 65 66 91 105 143M360 178v172M492 207c-12 65-66 91-105 143" />
            <g className="srs-botanical-orbit">
              <path d="M137 414c53-8 82-37 91-87-50 0-83 28-91 87ZM583 414c-53-8-82-37-91-87 50 0 83 28 91 87Z" />
              <path d="M136 414c40 18 68 45 87 82M584 414c-40 18-68 45-87 82" />
            </g>
          </g>
        </g>
      </svg>

      <div className="srs-plate-index" aria-hidden="true">
        <span>PLATE</span>
        <b>NBK–02</b>
      </div>
      <div className="srs-plate-caption" aria-hidden="true">
        <span className="srs-caption srs-caption--overview">Two complementary research paths</span>
        <span className="srs-caption srs-caption--fibre">Fibre cross-section · lauric affinity</span>
        <span className="srs-caption srs-caption--follicle">Follicle model · preclinical signals</span>
        <span className="srs-caption srs-caption--matrix">Triple-milk extraction matrix</span>
      </div>
    </figure>
  )
}

export default function ScienceRecoveryStory({ onChapterChange }: ScienceRecoveryStoryProps) {
  const [active, setActive] = useState(0)
  const chapterRefs = useRef<(HTMLElement | null)[]>([])
  const motionEligible = typeof window === 'undefined' ? true : isMotionEligible()

  useEffect(() => {
    if (!motionEligible) return

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!current) return
        const next = Number((current.target as HTMLElement).dataset.chapter)
        setActive((previous) => {
          if (previous === next) return previous
          onChapterChange?.(next)
          return next
        })
      },
      { rootMargin: '-32% 0px -38% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    chapterRefs.current.forEach((chapter) => chapter && observer.observe(chapter))
    return () => observer.disconnect()
  }, [motionEligible, onChapterChange])

  return (
    <section className={`science-recovery-story${motionEligible ? '' : ' srs-static'}`} id="science" aria-labelledby="science-recovery-title">
      <header className="srs-intro">
        <p className="srs-kicker">Formula research · two-track model</p>
        <h2 id="science-recovery-title">
          Two recovery paths.
          <span>One complete formula.</span>
        </h2>
        <p className="srs-deck">
          Four hero ingredients act across three connected targets: hair fibre, scalp environment and
          anagen-linked follicle signals.
        </p>
      </header>

      <figure className="srs-origin">
        <picture>
          <source media="(max-width: 699px)" srcSet="/assets/production/oil-texture-mobile.webp" />
          <img
            src="/assets/production/oil-texture.webp"
            alt="A magnified drop of deep violet-brown Neelibhringadi oil falling from a brass spoon"
            width="1600"
            height="2000"
            loading="lazy"
          />
        </picture>
        <figcaption>
          <span>Begin at the drop</span>
          <strong>One botanical oil. Two recovery paths.</strong>
        </figcaption>
      </figure>

      <div className="srs-story">
        <div className="srs-visual">
          <ScientificPlate active={active} />
          <ol className="srs-progress" aria-label="Research story progress">
            {chapters.map((chapter, index) => (
              <li key={chapter.number} aria-current={active === index ? 'step' : undefined}>
                <span>{chapter.number}</span>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <div className="srs-chapters">
          <article
            className="srs-chapter srs-chapter--fibre"
            data-chapter="0"
            ref={(node) => {
              chapterRefs.current[0] = node
            }}
          >
            <header>
              <span>{chapters[0].number}</span>
              <p>{chapters[0].label}</p>
            </header>
            <h3>{chapters[0].title}</h3>
            <p>
              Coconut oil’s lauric acid has an affinity for hair proteins and can penetrate the fibre, helping
              reduce protein loss from damaged and undamaged hair.
            </p>
            <dl className="srs-evidence">
              <div>
                <dt>Lauric acid</dt>
                <dd>Fibre penetration · reduced protein loss</dd>
              </div>
              <div>
                <dt>Amla + Neeli</dt>
                <dd>Botanical antioxidant potential</dd>
              </div>
            </dl>
            <aside className="srs-annotation">
              <span>Secondary annotation</span>
              <p>
                Karnasphota extracts have shown experimental signals involving TNF-alpha and nitric oxide.
                These are early mechanistic observations, not clinical hair-growth outcomes.
              </p>
            </aside>
          </article>

          <article
            className="srs-chapter srs-chapter--growth"
            data-chapter="1"
            ref={(node) => {
              chapterRefs.current[1] = node
            }}
          >
            <header>
              <span>{chapters[1].number}</span>
              <p>{chapters[1].label}</p>
            </header>
            <h3>{chapters[1].title}</h3>
            <p>
              In preclinical research, Bhringraj has been studied for molecular activity associated with the
              hair-growth cycle and dermal papilla cell function.
            </p>
            <ul className="srs-signals" aria-label="Preclinical Bhringraj signals">
              <li>
                <b>FGF-7</b>
                <span>up</span>
                <i aria-hidden="true">↑</i>
              </li>
              <li>
                <b>FGF-5</b>
                <span>down</span>
                <i aria-hidden="true">↓</i>
              </li>
              <li>
                <b>mTOR</b>
                <span>activity observed</span>
                <i aria-hidden="true">◎</i>
              </li>
            </ul>
            <p className="srs-qualifier">
              Preclinical evidence only. These cellular findings do not establish clinical regrowth.
            </p>
          </article>

          <article
            className="srs-chapter srs-chapter--matrix"
            data-chapter="2"
            ref={(node) => {
              chapterRefs.current[2] = node
            }}
          >
            <header>
              <span>{chapters[2].number}</span>
              <p>{chapters[2].label}</p>
            </header>
            <h3>{chapters[2].title}</h3>
            <p>
              Cow milk, goat milk and coconut milk form the extraction platform used to process the botanical
              formula through the traditional oil-making method.
            </p>
            <div className="srs-milks" aria-label="Triple-milk matrix">
              <span>Cow milk</span>
              <span>Goat milk</span>
              <span>Coconut milk</span>
            </div>
            <aside className="srs-boundary">
              <strong>What this means</strong>
              <p>
                The triple-milk matrix describes the extraction system. It should not be read as evidence of
                proven delivery to dermal papilla cells.
              </p>
            </aside>
          </article>
        </div>
      </div>

      <footer className="srs-resolution">
        <p>Path 01 + Path 02</p>
        <strong>Protein protection. Scalp support. Anagen-linked signals.</strong>
        <span>Two complementary recovery paths across three connected targets.</span>
      </footer>
    </section>
  )
}
