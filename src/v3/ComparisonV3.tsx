import React, { useState, type MouseEventHandler } from 'react';

export type ComparisonV3Props = {
  /** Destination supplied by the host (typically the official WhatsApp consultation flow). */
  consultHref?: string;
  onConsultClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ComparisonV3({ consultHref = '', onConsultClick }: ComparisonV3Props) {
  const [selectedOption, setSelectedOption] = useState(0);

  const comparisonData = [
    {
      id: "minoxidil",
      name: "Minoxidil (Pharmaceutical Medicine)",
      shortLabel: "Minoxidil Medicine",
      badge: "PHARMACEUTICAL DRUG",
      formula: "Synthetic vasodilator drug treatment intended to stimulate follicles; requires continuous daily use.",
      formulaMobile: "Synthetic vasodilator chemical drug",
      target: "Targeted single-mechanism drug — lacks botanical oils or hair shaft protein protection.",
      targetMobile: "Single mechanism; no shaft protection",
      routine: "Daily application • Leave-in chemical formula",
      routineMobile: "Daily leave-in chemical formula"
    },
    {
      id: "rosemary",
      name: "Rosemary Oils (Single-Botanical Essential Oil Blend)",
      shortLabel: "Rosemary Essential Oil",
      badge: "SINGLE-BOTANICAL",
      formula: "Essential oil diluted in basic carrier oil; lacks multi-herbal synergetic processing & milk lipid carriers.",
      formulaMobile: "Single herb diluted in carrier oil",
      target: "Mild surface circulation boost — lacks 21-herb deep scalp cooling & hair shaft protein shielding.",
      targetMobile: "Surface circulation boost only",
      routine: "2-3x weekly application • Dilution required",
      routineMobile: "2-3x weekly; dilution needed"
    },
    {
      id: "synthetic-serums",
      name: "Synthetic Hair Serums (Water/Silicone Base Peptide Serum)",
      shortLabel: "Synthetic Peptide Serum",
      badge: "WATER/SILICONE SERUM",
      formula: "Synthetic peptides, silicones, and preservatives suspended in a water/alcohol base.",
      formulaMobile: "Synthetic peptides & silicone base",
      target: "Surface coating & temporary strand smoothing — no deep root nourishing or scalp cooling properties.",
      targetMobile: "Surface coating & temporary smooth",
      routine: "Daily leave-in application",
      routineMobile: "Daily leave-in application"
    }
  ];

  const selectedData = comparisonData[selectedOption];

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="comparison">
      {/* ========================================== */}
      {/* 1. DUAL STORYBOARD CARDS SECTION */}
      {/* ========================================== */}
      <section className="w-full bg-[#efe6dc] py-4 text-left">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
          
          {/* SECTION HEADER */}
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-500 mb-2 block text-center">
              DUAL-ACTION AYURVEDIC MECHANISM
            </span>
            <h2 className="font-serif italic text-3xl md:text-5xl text-stone-900 mb-3 text-center">
              One Complete Ritual.
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-serif italic max-w-md mx-auto text-center mb-12">
              Simultaneous surface protection and deep root follicle activation.
            </p>
          </div>

          {/* DUAL STORYBOARD CARDS (2-COLUMN GRID) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full max-w-6xl mx-auto">
            
            {/* STORYBOARD CARD 01: HAIR SHAFT DEFENSE (DARK FOREST THEME) */}
            <div className="bg-[#2C3E2E] text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between border border-emerald-900/50 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-semibold">
                    PATH 01 • SURFACE DEFENSE
                  </span>
                  <span className="text-xs font-mono text-emerald-200/60">01/02</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-3">
                  Fibre &amp; Shaft Protection
                </h3>

                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-serif italic mb-6">
                  Lauric-acid-rich unrefined coconut oil penetrates the hair cortex to form a protective lipid shield, drastically cutting protein loss during wash cycles.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-800/80 my-4">
                  <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-700/30">
                    <span className="text-[9px] font-mono text-emerald-300 uppercase block mb-0.5">SHAFT DEFENSE</span>
                    <p className="text-xs font-semibold text-white">Reduces Protein Loss</p>
                  </div>
                  <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-700/30">
                    <span className="text-[9px] font-mono text-emerald-300 uppercase block mb-0.5">ANTIOXIDANT</span>
                    <p className="text-xs font-semibold text-white">Neeli &amp; Amla Shield</p>
                  </div>
                </div>

                <div className="w-full h-44 rounded-2xl overflow-hidden relative mt-2 border border-emerald-700/30">
                  <img 
                    src="/images/macro-hair-detail.jpg" 
                    alt="Hair Shaft Shield" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* STORYBOARD CARD 02: SCALP ROOT ACTIVATION (CREAM THEME) */}
            <div className="bg-[#FAF8F5] text-stone-900 rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between border border-stone-300/80 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-semibold">
                    PATH 02 • FOLLICLE ACTIVATION
                  </span>
                  <span className="text-xs font-mono text-stone-400">02/02</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-bold mb-3">
                  Growth Cycle Signals
                </h3>

                <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-serif italic mb-6">
                  Bhringraj (*Eclipta alba*) slow-cooked with triple milks stimulates root micro-circulation and supports anagen-phase hair growth signals.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 my-4">
                  <div className="bg-stone-200/60 p-3 rounded-2xl border border-stone-300/60">
                    <span className="text-[9px] font-mono text-stone-500 uppercase block mb-0.5">ANAGEN SUPPORT</span>
                    <p className="text-xs font-semibold text-stone-900">Preclinical Signals</p>
                  </div>
                  <div className="bg-stone-200/60 p-3 rounded-2xl border border-stone-300/60">
                    <span className="text-[9px] font-mono text-stone-500 uppercase block mb-0.5">AYURVEDIC BASE</span>
                    <p className="text-xs font-semibold text-stone-900">Triple-Milk Nourish</p>
                  </div>
                </div>

                <div className="w-full h-44 rounded-2xl overflow-hidden relative mt-2 border border-stone-200">
                  <img 
                    src="/images/handheld-oil.jpg" 
                    alt="Scalp Root Activation" 
                    className="w-full h-full object-cover" 
                  />
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
          <div className="mb-6 border-b border-stone-300/60 pb-6 text-left">
            <span className="text-[11px] tracking-[0.2em] text-stone-500 font-semibold uppercase mb-2 block">
              Category Comparison
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2 tracking-tight">
              Neelibhringadi alongside another approach
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans">
              Select a comparison category below to view side-by-side formulation differences.
            </p>
          </div>

          {/* TAB BAR CONTRAST & LEGIBILITY */}
          <div className="bg-stone-200/80 p-1.5 rounded-full flex items-center justify-between max-w-xl mx-auto mb-6 md:mb-10 border border-stone-300/80 shadow-inner font-sans">
            {comparisonData.map((item, idx) => {
              const active = selectedOption === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedOption(idx)}
                  className={
                    active
                      ? 'bg-[#2C3E2E] !text-white font-semibold shadow-md py-2 px-3 sm:py-2.5 sm:px-6 rounded-full text-[11px] sm:text-xs md:text-sm transition-all duration-300 cursor-pointer'
                      : 'text-stone-600 hover:text-stone-900 font-medium py-2 px-3 sm:py-2.5 sm:px-6 rounded-full text-[11px] sm:text-xs md:text-sm transition-all duration-300 cursor-pointer'
                  }
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>

          {/* DESKTOP 2-CARD GRID (hidden on mobile, visible on desktop) */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch w-full">
            
            {/* CARD 1: NEELIBHRINGADI KERAM (THE WINNER) */}
            <div className="bg-[#FAF8F5] border-2 border-[#2C3E2E] rounded-3xl p-6 md:p-8 shadow-lg relative flex flex-col justify-between h-full">
              <div className="absolute -top-3.5 left-6 bg-[#2C3E2E] text-white text-[9px] font-mono tracking-widest uppercase px-3.5 py-1 rounded-full shadow-sm z-10">
                ★ CANONICAL CHOICE
              </div>

              <div>
                <div className="mt-2 mb-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-bold">
                    Neelibhringadi Keram
                  </h3>
                  <span className="text-[10px] font-mono tracking-wider text-emerald-800 uppercase block mt-1 font-semibold">
                    100% Classical Preparation
                  </span>
                </div>

                <div className="space-y-5 divide-y divide-stone-200/80">
                  <div className="pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-1">
                      FORMULA BASE
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-900 font-medium leading-relaxed">
                      <span className="text-emerald-700 font-bold text-sm leading-none mt-0.5 shrink-0">✓</span>
                      <span>21 Ayurvedic herbs slow-cooked in unrefined coconut oil + triple milks (Cow, Goat, Coconut)</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-1">
                      TARGET ZONE &amp; MECHANISM
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-900 font-medium leading-relaxed">
                      <span className="text-emerald-700 font-bold text-sm leading-none mt-0.5 shrink-0">✓</span>
                      <span>Dual Action: Protects hair shaft against protein loss + deeply cools &amp; nourishes scalp follicles</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-1">
                      ROUTINE
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-900 font-medium leading-relaxed">
                      <span className="text-emerald-700 font-bold text-sm leading-none mt-0.5 shrink-0">✓</span>
                      <span>2x weekly • 30–60 min pre-wash ritual • Wash out</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: DYNAMIC COMPARISON ROUTE (MUTED ALTERNATIVE) */}
            <div className="bg-stone-200/50 border border-stone-300/80 rounded-3xl p-6 md:p-8 relative flex flex-col justify-between h-full">
              <div>
                <div className="mb-3">
                  <span className="bg-stone-300/80 text-stone-600 text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full w-max inline-block">
                    {selectedData.badge}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-700 font-medium">
                    {selectedData.name}
                  </h3>
                </div>

                <div className="space-y-5 divide-y divide-stone-300/60">
                  <div className="pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-semibold block mb-1">
                      FORMULA BASE
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-600 leading-relaxed">
                      <span className="text-rose-500 font-bold text-sm leading-none mt-0.5 shrink-0">✕</span>
                      <span>{selectedData.formula}</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-semibold block mb-1">
                      TARGET ZONE &amp; MECHANISM
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-600 leading-relaxed">
                      <span className="text-rose-500 font-bold text-sm leading-none mt-0.5 shrink-0">✕</span>
                      <span>{selectedData.target}</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-semibold block mb-1">
                      ROUTINE
                    </span>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-stone-600 leading-relaxed">
                      <span className="text-rose-500 font-bold text-sm leading-none mt-0.5 shrink-0">✕</span>
                      <span>{selectedData.routine}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* MOBILE SPEC-MATRIX LAYOUT (ROW-BY-ROW COMPARISON - hidden on desktop, visible on mobile) */}
          <div className="block md:hidden space-y-3 w-full mt-4 font-sans">
            {/* FIXED COLUMN HEADERS */}
            <div className="grid grid-cols-2 gap-2 pb-1 border-b border-stone-300">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-stone-900 uppercase">
                  Neelibhringadi
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase truncate">
                  {selectedData.shortLabel || selectedData.name}
                </span>
              </div>
            </div>

            {/* METRIC ROW 1: FORMULA BASE */}
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-3.5 shadow-sm">
              <span className="text-[9px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-2">
                FORMULA BASE
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs leading-snug">
                <div className="text-stone-900 font-medium flex items-start gap-1.5 border-r border-stone-200 pr-2">
                  <span className="text-emerald-700 font-bold text-xs mt-0.5 shrink-0">✓</span>
                  <span>21 herbs in coconut oil + 3 milks</span>
                </div>
                <div className="text-stone-600 flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold text-xs mt-0.5 shrink-0">✕</span>
                  <span>{selectedData.formulaMobile || selectedData.formula}</span>
                </div>
              </div>
            </div>

            {/* METRIC ROW 2: TARGET ZONE */}
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-3.5 shadow-sm">
              <span className="text-[9px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-2">
                TARGET ZONE &amp; MECHANISM
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs leading-snug">
                <div className="text-stone-900 font-medium flex items-start gap-1.5 border-r border-stone-200 pr-2">
                  <span className="text-emerald-700 font-bold text-xs mt-0.5 shrink-0">✓</span>
                  <span>Protects hair shaft + cools follicles</span>
                </div>
                <div className="text-stone-600 flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold text-xs mt-0.5 shrink-0">✕</span>
                  <span>{selectedData.targetMobile || selectedData.target}</span>
                </div>
              </div>
            </div>

            {/* METRIC ROW 3: ROUTINE */}
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-3.5 shadow-sm">
              <span className="text-[9px] font-mono tracking-widest text-emerald-800 uppercase font-semibold block mb-2">
                ROUTINE
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs leading-snug">
                <div className="text-stone-900 font-medium flex items-start gap-1.5 border-r border-stone-200 pr-2">
                  <span className="text-emerald-700 font-bold text-xs mt-0.5 shrink-0">✓</span>
                  <span>2x weekly pre-wash ritual</span>
                </div>
                <div className="text-stone-600 flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold text-xs mt-0.5 shrink-0">✕</span>
                  <span>{selectedData.routineMobile || selectedData.routine}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default ComparisonV3;
