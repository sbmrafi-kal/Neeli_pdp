import { useState, type MouseEventHandler } from 'react'

export type ComparisonV3Props = {
  /** Destination supplied by the host (typically the official WhatsApp consultation flow). */
  consultHref?: string
  onConsultClick?: MouseEventHandler<HTMLAnchorElement>
}

type Alternative = {
  id: string
  name: string
  descriptor: string
  formula: string
  targetZone: string
  routine: string
}

const alternatives: Alternative[] = [
  {
    id: 'minoxidil',
    name: 'Minoxidil',
    descriptor: 'Medicine',
    formula: 'A drug treatment intended to stimulate follicles; suitability and response need medical guidance.',
    targetZone: 'A targeted medicine — not a botanical oil or a like-for-like routine.',
    routine: 'Typically daily · leave on',
  },
  {
    id: 'rosemary-oils',
    name: 'Rosemary Oils',
    descriptor: 'Single-botanical route',
    formula: 'Rosemary-led blends are commonly positioned around scalp and growth support.',
    targetZone: 'Usually a pre-wash oil routine, rather than a multi-herb formula.',
    routine: 'Commonly 2× weekly · wash out',
  },
  {
    id: 'hair-serums',
    name: 'Hair serums',
    descriptor: 'Formula varies',
    formula: 'Benefits depend on the active ingredients and the individual formula.',
    targetZone: 'Coverage and claims vary by formula; check the current product directions.',
    routine: 'Usually daily · leave in',
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
  const [alternativeId, setAlternativeId] = useState(alternatives[0].id)
  const selectedAlternative = alternatives.find((alternative) => alternative.id === alternativeId) ?? alternatives[0]
  const comparisonRows = [
    {
      label: 'Formula base',
      ours: 'Multi-herb oil · coconut + three milks (21 Ayurvedic ingredients)',
      other: selectedAlternative.formula,
    },
    {
      label: 'Target zone',
      ours: 'Dual: protects hair shaft (reduces protein loss) + supports scalp environment',
      other: selectedAlternative.targetZone,
    },
    {
      label: 'Routine',
      ours: neeli.routine,
      other: selectedAlternative.routine,
    },
  ]

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
        <div className="comparison-v3__anchor-header">
          <h3 id="comparison-v3-neeli">One formula. Two distinct support paths.</h3>
          <p className="comparison-v3__formula">{neeli.formula}</p>
        </div>
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

      <div className="comparison-v3__matrix-wrapper" aria-label="Compare Neelibhringadi Keram with another approach">
        <div className="comparison-v3__versus-title">
          <h3>Neelibhringadi alongside another approach</h3>
          <p>Select one comparison route to keep the differences easy to scan.</p>
        </div>
        
        <div className="comparison-v3__table-container">
          <table className="comparison-v3__table">
            <thead>
              <tr>
                <th scope="col" className="col-param">Comparison parameter</th>
                <th scope="col" className="highlighted col-ours">
                  <div className="table-premium-header">
                    <span className="star-tag">★ Canonical Choice</span>
                    <strong>Neelibhringadi Keram</strong>
                    <span className="sub">AUTHENTIC AYURVEDIC OIL</span>
                  </div>
                </th>
                <th scope="col" className="comparison-v3__other-header col-other">
                  <label htmlFor="comparison-alternative">Compare with</label>
                  <select
                    id="comparison-alternative"
                    value={selectedAlternative.id}
                    onChange={(event) => setAlternativeId(event.target.value)}
                  >
                    {alternatives.map((alternative) => (
                      <option key={alternative.id} value={alternative.id}>{alternative.name}</option>
                    ))}
                  </select>
                  <span className="sub">{selectedAlternative.descriptor}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="col-param"><strong>{row.label}</strong></th>
                  <td className="highlighted col-ours">{row.ours}</td>
                  <td className="col-other">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="comparison-v3__consult">
        <div className="comparison-v3__consult-grid">
          <div className="comparison-v3__consult-content">
            <p className="comparison-v3__consult-eyebrow">1-ON-1 AYURVEDA DOCTOR CONSULTATION</p>
            <h3>Bring your hair-fall concern to an Ayurveda doctor.</h3>
            <p className="comparison-v3__consult-subtext">
              Get customized Ayurvedic guidance tailored to your scalp type, hair density, and lifestyle.
            </p>
            <div className="comparison-v3__consult-cta">
              {hasConsultLink ? (
                <a href={consultHref} onClick={onConsultClick} target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp consultation with an Ayurveda doctor">
                  Start on WhatsApp ↗
                </a>
              ) : (
                <p className="comparison-v3__consult-unavailable" role="status">Consultation is currently unavailable.</p>
              )}
            </div>
          </div>
          <div className="comparison-v3__consult-image-wrap">
            <img src="/assets/ayurveda-doctor-consultation.png" alt="Ayurveda Doctor Consultation" className="comparison-v3__consult-img" />
          </div>
        </div>
      </footer>
    </section>
  )
}

export default ComparisonV3
