import type { MouseEventHandler } from 'react'
export type ConsultationCTAProps = {
  consultHref: string
  onConsultClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ConsultationCTA({
  consultHref,
  onConsultClick,
}: ConsultationCTAProps) {
  const hasConsultLink = consultHref.trim().length > 0

  return (
    <section className="consultation-cta" id="consultation" aria-labelledby="consultation-cta-title">
      <div className="consultation-cta__intro">
        <p>Doctor-guided Ayurveda</p>
        <h2 id="consultation-cta-title">When hair fall needs a closer look.</h2>
      </div>
      <div className="consultation-cta__body">
        <p>
          Persistent, sudden, or complex hair fall may need more than a product
          choice. Start with WhatsApp support, then move into an expert
          consultation and follow-up when appropriate.
        </p>
        {hasConsultLink ? (
          <a
            className="consultation-cta__action"
            href={consultHref}
            onClick={onConsultClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start WhatsApp support for an Ayurveda consultation"
          >
            Speak with our care team
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="consultation-cta__fallback" role="status">
            Online consultation is temporarily unavailable. Please contact Kerala
            Ayurveda support through an official channel.
          </p>
        )}
        <small>
          Support can help route your concern; diagnosis and treatment decisions
          belong with a qualified clinician.
        </small>
      </div>
    </section>
  )
}

export default ConsultationCTA
