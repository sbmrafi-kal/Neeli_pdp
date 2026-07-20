import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './pdp-section-nav-v3.css';

type Destination = {
  id: 'results' | 'science' | 'comparison' | 'ritual' | 'reviews' | 'faq';
  label: string;
  target: string;
  activeTargets: readonly string[];
};

const destinations: readonly Destination[] = [
  { id: 'results', label: 'Results', target: 'results', activeTargets: ['results'] },
  { id: 'science', label: 'Science', target: 'formula', activeTargets: ['formula', 'science'] },
  { id: 'comparison', label: 'Compare', target: 'comparison', activeTargets: ['comparison'] },
  { id: 'ritual', label: 'Use', target: 'ritual', activeTargets: ['ritual'] },
  { id: 'reviews', label: 'Reviews', target: 'reviews', activeTargets: ['reviews'] },
  { id: 'faq', label: 'FAQ', target: 'faq', activeTargets: ['faq'] },
];

const activeDestinationFor = (sectionId: string | null) =>
  destinations.find(({ activeTargets }) => sectionId !== null && activeTargets.includes(sectionId))?.id ?? null;

/**
 * Mobile-only PDP section rail. The page header/logo intentionally owns the Overview route.
 * It can be placed immediately below that header; target section ids are the current PDP ids.
 */
export function PdpSectionNavV3() {
  const railRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const [overflowing, setOverflowing] = useState(false);

  // Switch layouts only when the actual, rendered labels no longer fit equal cells.
  // This respects browser text-size settings rather than relying on a device-width guess.
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const assessFit = () => {
      const cellWidth = rail.clientWidth / destinations.length;
      const needsIntrinsicWidths = destinations.some(({ id }) => {
        const link = linkRefs.current.get(id);
        const label = link?.firstElementChild as HTMLElement | null;
        return !!label && label.scrollWidth + 4 > cellWidth;
      });
      setOverflowing(needsIntrinsicWidths);
    };

    assessFit();
    const observer = new ResizeObserver(assessFit);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ['results', 'formula', 'science', 'comparison', 'ritual', 'reviews', 'faq']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.42;
      const current = sections.reduce<HTMLElement | null>((latest, section) =>
        section.getBoundingClientRect().top <= readingLine ? section : latest, null);
      setActiveDestination(activeDestinationFor(current?.id ?? null));
    };
    const onScrollOrResize = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    addEventListener('scroll', onScrollOrResize, { passive: true });
    addEventListener('resize', onScrollOrResize);
    return () => {
      removeEventListener('scroll', onScrollOrResize);
      removeEventListener('resize', onScrollOrResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!activeDestination || !overflowing) return;
    const rail = railRef.current;
    const link = linkRefs.current.get(activeDestination);
    const scroller = rail?.querySelector<HTMLElement>('.pdp-section-nav-v3__scroller');
    if (!link || !scroller) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetLeft = link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2;
    scroller.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [activeDestination, overflowing]);

  return (
    <nav
      ref={railRef}
      className="pdp-section-nav-v3"
      data-overflowing={overflowing || undefined}
      aria-label="Product sections"
    >
      <div className="pdp-section-nav-v3__scroller">
        {destinations.map(({ id, label, target }) => {
          const active = activeDestination === id;
          return (
            <a
              key={id}
              ref={(node) => {
                if (node) linkRefs.current.set(id, node);
                else linkRefs.current.delete(id);
              }}
              className="pdp-section-nav-v3__link"
              href={`#${target}`}
              aria-current={active ? 'location' : undefined}
            >
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default PdpSectionNavV3;
