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
    <section className="w-full bg-[#FAF8F5] py-8 md:py-12 text-left" id="consultation" aria-labelledby="consultation-cta-title">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        <div className="bg-[#f0edeb] rounded-2xl md:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center border border-stone-300/60 shadow-xs md:max-h-[300px] hover-lift transition-all duration-300">
          {/* Left Content Column (7 cols for wide 2-line headline) */}
          <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-center space-y-2.5 text-left">
            <span className="text-[10px] tracking-[0.2em] text-stone-500 font-semibold uppercase block font-sans">
              1-ON-1 AYURVEDA DOCTOR CONSULTATION
            </span>
            <h2 id="consultation-cta-title" className="font-serif text-[32px] text-stone-900 leading-[1.18] tracking-tight">
              Bring your hair-fall concern <br className="hidden sm:inline" />
              to an Ayurveda doctor.
            </h2>
            <p className="text-xs md:text-[13px] text-stone-600 leading-relaxed font-sans max-w-md">
              Get customized Ayurvedic guidance tailored to your scalp type, hair density, and lifestyle from qualified Ayurveda physicians.
            </p>
            {hasConsultLink ? (
              <a
                href={consultHref}
                onClick={onConsultClick}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start a WhatsApp consultation with an Ayurveda doctor"
                className="px-5 py-2 text-[10px] tracking-wider uppercase font-bold bg-stone-900 text-white rounded-full hover:bg-stone-800 hover-arrow transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm w-fit font-sans mt-1"
              >
                <span>Start on WhatsApp ↗</span>
              </a>
            ) : (
              <a
                href="https://wa.me/919995559842"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-[10px] tracking-wider uppercase font-bold bg-stone-900 text-white rounded-full hover:bg-stone-800 hover-arrow transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm w-fit font-sans mt-1"
              >
                <span>Start Doctor Consultation ↗</span>
              </a>
            )}
          </div>

          {/* Right Image Column (5 cols) */}
          <div className="md:col-span-5 w-full h-60 sm:h-72 md:h-full md:max-h-[300px] overflow-hidden">
            <img
              src="/assets/ayurveda-doctor-consultation.png"
              alt="Qualified Ayurveda Doctor"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationCTA
