import React, { useState, type MouseEventHandler } from 'react';

export type ComparisonV3Props = {
  /** Destination supplied by the host (typically the official WhatsApp consultation flow). */
  consultHref?: string;
  onConsultClick?: MouseEventHandler<HTMLAnchorElement>;
};

type Alternative = {
  id: string;
  name: string;
  descriptor: string;
  formula: string;
  targetZone: string;
  routine: string;
};

const alternatives: Alternative[] = [
  {
    id: 'minoxidil',
    name: 'Minoxidil',
    descriptor: 'Pharmaceutical Medicine',
    formula: 'Synthetic vasodilator drug treatment intended to stimulate follicles; requires continuous daily use.',
    targetZone: 'Targeted single-mechanism drug — lacks botanical oils or hair shaft protein protection.',
    routine: 'Daily application · Leave-in',
  },
  {
    id: 'rosemary-oils',
    name: 'Rosemary Oils',
    descriptor: 'Single-Botanical Essential Oil Blend',
    formula: 'Single herb essential oil diluted in carrier oil, focused primarily on mild scalp circulation.',
    targetZone: 'Single botanical action — lacks 21-herb slow-cooked synergy & triple-milk protein base.',
    routine: '2× weekly · 30 min · Wash out',
  },
  {
    id: 'hair-serums',
    name: 'Synthetic Hair Serums',
    descriptor: 'Water/Silicone Base Peptide Serum',
    formula: 'Peptides & synthetic polymers designed for cosmetic hair coating and temporary smoothness.',
    targetZone: 'Surface hair shaft coating — lacks deep herbal root nourishment and scalp cooling.',
    routine: 'Daily · Leave-in serum',
  },
];

export function ComparisonV3({ consultHref = '', onConsultClick }: ComparisonV3Props) {
  const hasConsultLink = consultHref.trim().length > 0;
  const [alternativeId, setAlternativeId] = useState(alternatives[0].id);
  const selectedAlternative = alternatives.find((alternative) => alternative.id === alternativeId) ?? alternatives[0];

  const comparisonRows = [
    {
      label: 'FORMULA BASE',
      ours: '21 Ayurvedic herbs slow-cooked in unrefined coconut oil + triple milks (Cow, Goat, Coconut)',
      other: selectedAlternative.formula,
    },
    {
      label: 'TARGET ZONE',
      ours: 'Dual Action: Protects hair shaft against protein loss + deeply cools & nourishes scalp follicles',
      other: selectedAlternative.targetZone,
    },
    {
      label: 'ROUTINE',
      ours: '2× weekly · 30–60 min pre-wash ritual · Wash out',
      other: selectedAlternative.routine,
    },
  ];

  return (
    <div className="space-y-16 py-8" id="comparison">
      {/* ========================================== */}
      {/* 1. ONE COMPLETE RITUAL SECTION */}
      {/* ========================================== */}
      <section className="w-full bg-[#efe6dc] py-0 text-left">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
          <h2 className="text-2xl md:text-3xl font-serif tracking-widest text-stone-900 uppercase mb-8 text-center">
            ONE COMPLETE RITUAL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Path 01 */}
            <div className="bg-[#f8f6f0] border border-stone-200/80 p-8 sm:p-10 rounded-3xl text-left shadow-xs flex flex-col justify-between">
              <div>
                <span className="bg-stone-200/80 text-stone-700 text-[10px] tracking-widest uppercase px-3.5 py-1 rounded-full w-fit mb-4 font-semibold block font-sans">
                  PATH 01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-3 font-medium">
                  Fibre + Scalp Support
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
                  Lauric-acid-rich coconut oil penetrates the hair shaft to significantly reduce protein loss during wash cycles, while Amla and Neeli provide traditional antioxidant scalp defense.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-300/50 font-sans">
                <div>
                  <span className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase block">Shaft Protection</span>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 mt-0.5">Reduces protein loss</p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase block">Scalp Defense</span>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 mt-0.5">Cooling &amp; soothe</p>
                </div>
              </div>
            </div>

            {/* Card 2: Path 02 */}
            <div className="bg-[#f8f6f0] border border-stone-200/80 p-8 sm:p-10 rounded-3xl text-left shadow-xs flex flex-col justify-between">
              <div>
                <span className="bg-stone-200/80 text-stone-700 text-[10px] tracking-widest uppercase px-3.5 py-1 rounded-full w-fit mb-4 font-semibold block font-sans">
                  PATH 02
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-3 font-medium">
                  Growth Cycle Research Signals
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
                  Bhringraj (*Eclipta alba*) is the growth-cycle research anchor. Preclinical findings report activity in anagen-linked signals (FGF-7 &amp; mTOR) to support natural root strength.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-300/50 font-sans">
                <div>
                  <span className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase block">Anagen Support</span>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 mt-0.5">Preclinical signals</p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase block">Ayurvedic Base</span>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 mt-0.5">Triple-milk nourish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. CATEGORY COMPARISON SECTION */}
      {/* ========================================== */}
      <section className="w-full bg-[#efe6dc] py-0 text-left">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        <div className="mb-8 border-b border-stone-300/60 pb-6">
          <span className="text-[11px] tracking-[0.2em] text-stone-500 font-semibold uppercase mb-2 block">
            Category Comparison
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2 tracking-tight">
            Neelibhringadi alongside another approach
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Select one comparison route to keep the differences easy to scan.
          </p>
        </div>

        {/* Clean Contained Matrix Table */}
        <div className="border border-stone-300/70 rounded-2xl overflow-hidden bg-[#faf8f5] shadow-xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-stone-200/50 border-b border-stone-300/70 text-left font-sans">
            <div className="col-span-3 p-4 sm:p-5 text-xs font-semibold text-stone-600 uppercase tracking-widest flex items-center">
              Comparison Parameter
            </div>
            <div className="col-span-4 bg-[#f2efe9] p-4 sm:p-5 border-x border-stone-300/70">
              <span className="inline-block bg-[#39461d] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1">
                ★ Canonical Choice
              </span>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                Neelibhringadi Keram
              </h4>
            </div>
            <div className="col-span-5 p-4 sm:p-5 flex flex-col justify-center">
              <label htmlFor="comparison-select" className="text-[10px] tracking-widest uppercase text-stone-500 font-semibold mb-1">
                Compare With:
              </label>
              <select
                id="comparison-select"
                value={selectedAlternative.id}
                onChange={(e) => setAlternativeId(e.target.value)}
                className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-800 outline-none cursor-pointer focus:border-stone-500"
              >
                {alternatives.map((alt) => (
                  <option key={alt.id} value={alt.id}>
                    {alt.name} ({alt.descriptor})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Body Rows */}
          {comparisonRows.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-12 text-left text-xs sm:text-sm font-sans ${
                idx < comparisonRows.length - 1 ? 'border-b border-stone-300/50' : ''
              }`}
            >
              <div className="col-span-3 p-4 sm:p-5 font-semibold text-stone-800 flex items-center bg-stone-100/40">
                {row.label}
              </div>
              <div className="col-span-4 bg-[#f2efe9] p-4 sm:p-5 border-x border-stone-300/70 font-medium text-stone-900 leading-relaxed">
                {row.ours}
              </div>
              <div className="col-span-5 p-4 sm:p-5 text-stone-700 leading-relaxed flex items-center">
                {row.other}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ========================================== */}
      {/* 3. DOCTOR CONSULTATION CARD */}
      {/* ========================================== */}
      <section className="w-full bg-[#efe6dc] py-0 text-left">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
          <div className="bg-[#f0edeb] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center border border-stone-300/60 shadow-xs md:max-h-[320px]">
          {/* Left Content Column */}
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-3 text-left">
            <span className="text-[10px] tracking-widest text-stone-500 font-semibold uppercase block font-sans">
              1-ON-1 AYURVEDA DOCTOR CONSULTATION
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-stone-900 leading-snug tracking-tight">
              Bring your hair-fall concern to an Ayurveda doctor.
            </h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-sans max-w-md">
              Get customized Ayurvedic guidance tailored to your scalp type, hair density, and lifestyle from qualified Ayurveda physicians.
            </p>
            {hasConsultLink ? (
              <a
                href={consultHref}
                onClick={onConsultClick}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start a WhatsApp consultation with an Ayurveda doctor"
                className="px-5 py-2.5 text-[11px] tracking-wider uppercase font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm w-fit"
              >
                <span>Start on WhatsApp ↗</span>
              </a>
            ) : (
              <a
                href="https://wa.me/919995559842"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-[11px] tracking-wider uppercase font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm w-fit"
              >
                <span>Start Doctor Consultation ↗</span>
              </a>
            )}
          </div>

          {/* Right Image Column */}
          <div className="w-full h-64 sm:h-72 md:h-full md:max-h-[320px] overflow-hidden">
            <img
              src="/assets/ayurveda-doctor-consultation.png"
              alt="Ayurveda Doctor Consultation"
              className="w-full h-full md:max-h-[320px] object-cover object-[center_15%] md:object-top"
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default ComparisonV3;
