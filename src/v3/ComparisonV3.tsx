import type { MouseEventHandler } from 'react'

export type ComparisonV3Props = {
  /** Destination supplied by the host (typically the official WhatsApp consultation flow). */
  consultHref?: string
  onConsultClick?: MouseEventHandler<HTMLAnchorElement>
}

type Alternative = {
  name: string
  descriptor: string
  path: string
  coverage: string
  routine: string
}

const alternatives: Alternative[] = [
  {
    name: 'Minoxidil',
    descriptor: 'Medicine',
    path: 'A drug treatment intended to stimulate follicles; suitability and response need medical guidance.',
    coverage: 'A targeted medicine—not a botanical oil or a like-for-like routine.',
    routine: 'Typically daily · leave on',
  },
  {
    name: 'Hair serums',
    descriptor: 'Formula varies',
    path: 'Benefits depend on the active ingredients and the individual formula.',
    coverage: 'Coverage and claims vary by formula; check the current product directions.',
    routine: 'Usually daily · leave in',
  },
  {
    name: 'Rosemary oils',
    descriptor: 'Single-botanical route',
    path: 'Rosemary-led blends are commonly positioned around scalp and growth support.',
    coverage: 'Usually a pre-wash oil routine, rather than a multi-herb formula.',
    routine: 'Commonly 2× weekly · wash out',
  },
]

const neeli = {
  formula: 'Multi-herb oil · coconut + three milks',
  fibre: 'Lauric-acid-rich coconut oil is associated with hair-fibre penetration and reduced protein loss.',
  scalp: 'Amla and Neeli bring traditional scalp-care and antioxidant support.',
  anagen: 'Preclinical Bhringraj research reports anagen-linked signals.',
  routine: '2× weekly · 30–60 min · wash out',
}

export function ComparisonV3({ consultHref = '', onConsultClick }: ComparisonV3Props) {
  const hasConsultLink = consultHref.trim().length > 0

  return (
    <section className="comparison-v3" id="comparison" aria-labelledby="comparison-v3-title">
      <header className="comparison-v3__intro">
        <div>
          <div className="comparison-v3__header-badge">
            <span className="comparison-v3__badge-dot" />
            <span>CATEGORY COMPARISON</span>
          </div>
          <h2 id="comparison-v3-title">More than a single route to hair recovery.</h2>
        </div>
        <p className="comparison-v3__lede">
          Two support paths. One wash-out ritual. Discover how Neelibhringadi Keram compares with conventional hair-fall options.
        </p>
      </header>

      <article className="comparison-v3__anchor" aria-labelledby="comparison-v3-neeli">
        <div className="comparison-v3__anchor-head">
          <div className="comparison-v3__hero-tag">
            <span className="comparison-v3__star">★</span>
            <p>Neelibhringadi Keram</p>
          </div>
          <span className="comparison-v3__hero-type">AUTHENTIC AYURVEDIC OIL</span>
        </div>
        <h3 id="comparison-v3-neeli">One formula. Two distinct support paths.</h3>
        <p className="comparison-v3__formula">{neeli.formula}</p>
        <div className="comparison-v3__paths">
          <div className="comparison-v3__path-box">
            <span className="comparison-v3__path-tag">Path 01</span>
            <strong>Fibre + Scalp Support</strong>
            <p>{neeli.fibre} {neeli.scalp}</p>
          </div>
          <div className="comparison-v3__path-box">
            <span className="comparison-v3__path-tag">Path 02</span>
            <strong>Anagen-Linked Research Signals</strong>
            <p>{neeli.anagen}</p>
          </div>
        </div>
        <p className="comparison-v3__ritual">
          <span>RITUAL:</span> {neeli.routine}
        </p>
      </article>

      <div className="comparison-v3__versus" aria-label="Compare Neelibhringadi Keram with other approaches">
        <div className="comparison-v3__versus-title">
          <h3>Neelibhringadi Alongside Alternative Approaches</h3>
          <p>Understanding the difference in formula, routine, and scientific boundaries.</p>
        </div>
        {alternatives.map((alternative) => (
          <article className="comparison-v3__matchup" key={alternative.name}>
            <header>
              <div>
                <p className="comparison-v3__matchup-sub">Neeli alongside</p>
                <h3>{alternative.name}</h3>
              </div>
              <span className="comparison-v3__matchup-badge">{alternative.descriptor}</span>
            </header>
            <dl>
              <div>
                <dt>Approach</dt>
                <dd><b>Neeli</b><span>Fibre + scalp support; preclinical anagen-linked signals.</span></dd>
                <dd><b>{alternative.name}</b><span>{alternative.path}</span></dd>
              </div>
              <div>
                <dt>Formula / coverage</dt>
                <dd><b>Neeli</b><span>{neeli.formula}</span></dd>
                <dd><b>{alternative.name}</b><span>{alternative.coverage}</span></dd>
              </div>
              <div>
                <dt>Routine</dt>
                <dd><b>Neeli</b><span>{neeli.routine}</span></dd>
                <dd><b>{alternative.name}</b><span>{alternative.routine}</span></dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <footer className="comparison-v3__consult">
        <div className="comparison-v3__consult-badge">
          <span className="comparison-v3__whatsapp-dot" />
          <span>1-ON-1 AYURVEDA DOCTOR CONSULTATION</span>
        </div>
        <div className="comparison-v3__consult-grid">
          <div className="comparison-v3__consult-text">
            <p className="comparison-v3__consult-eyebrow">Need a more personal route?</p>
            <h3>Bring your hair-fall concern to an Ayurveda doctor.</h3>
            <p className="comparison-v3__consult-subtext">
              Get customized Ayurvedic guidance tailored to your scalp type, hair density, and lifestyle.
            </p>
            <div className="comparison-v3__consult-trust">
              <span>✓ Certified Ayurvedic Doctors</span>
              <span>✓ Direct WhatsApp Consultation</span>
            </div>
          </div>
          <div className="comparison-v3__consult-cta">
            {hasConsultLink ? (
              <a href={consultHref} onClick={onConsultClick} target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp consultation with an Ayurveda doctor">
                <svg className="comparison-v3__wa-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm5.8 14.11c-.24.68-1.2 1.25-1.93 1.41-.5.11-1.15.2-3.34-.71-2.79-1.15-4.59-4-4.73-4.18-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.34.26-.28.57-.35.76-.35.19 0 .38 0 .54.01.17.01.4-.06.63.48.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.38-.43.51-.14.14-.3.29-.13.57.17.28.76 1.25 1.63 2.03 1.12.99 2.07 1.3 2.36 1.44.29.14.46.12.63-.07.17-.19.74-.86.94-1.15.2-.29.4-.24.67-.14.28.09 1.76.83 2.06.98.3.15.5.22.57.34.07.12.07.72-.17 1.4z"/></svg>
                Start on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <p className="comparison-v3__consult-unavailable" role="status">Consultation is currently unavailable.</p>
            )}
          </div>
        </div>
      </footer>
    </section>
  )
}

export default ComparisonV3
