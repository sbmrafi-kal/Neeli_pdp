import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IngredientCard, IngredientItem } from './IngredientCard';

interface IngredientsCarouselProps {
  ingredients: IngredientItem[];
  onOpenDetails: (ingredient: IngredientItem) => void;
}

export const IngredientsCarousel: React.FC<IngredientsCarouselProps> = ({
  ingredients,
  onOpenDetails,
}) => {
  const baseCount = ingredients.length;

  // Tripled array for seamless infinite 360° looping
  const displayItems = useMemo(() => {
    let list: IngredientItem[] = [];
    for (let i = 0; i < 3; i++) {
      list = list.concat(
        ingredients.map((item, idx) => ({
          ...item,
          id: `${item.id}-loop-${i}-${idx}`,
        }))
      );
    }
    return list;
  }, [ingredients]);

  // Start at index baseCount (beginning of middle set)
  const [currentIndex, setCurrentIndex] = useState<number>(baseCount);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef<boolean>(false);

  // Initialize track position to middle set on mount
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const timer = setTimeout(() => {
      const firstChild = track.firstElementChild as HTMLElement;
      if (!firstChild) return;
      const gap = window.innerWidth < 640 ? 12 : 16;
      const itemWidth = firstChild.getBoundingClientRect().width + gap;
      track.scrollTo({ left: baseCount * itemWidth, behavior: 'auto' });
    }, 60);

    return () => clearTimeout(timer);
  }, [baseCount]);

  // Handle native scroll & silent boundary wrapping
  const handleScroll = useCallback(() => {
    if (!scrollTrackRef.current) return;
    const track = scrollTrackRef.current;

    window.requestAnimationFrame(() => {
      const firstChild = track.firstElementChild as HTMLElement;
      if (!firstChild) return;

      const gap = window.innerWidth < 640 ? 12 : 16;
      const itemWidth = firstChild.getBoundingClientRect().width + gap;
      if (itemWidth <= 0) return;

      const rawIndex = Math.round(track.scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(displayItems.length - 1, rawIndex));

      setCurrentIndex((prev) => (prev !== clampedIndex ? clampedIndex : prev));

      // Silent boundary reset (Instant jump to middle set without animation)
      if (!isAutoScrolling.current) {
        if (clampedIndex < baseCount) {
          track.scrollTo({ left: (clampedIndex + baseCount) * itemWidth, behavior: 'auto' });
          setCurrentIndex(clampedIndex + baseCount);
        } else if (clampedIndex >= baseCount * 2) {
          track.scrollTo({ left: (clampedIndex - baseCount) * itemWidth, behavior: 'auto' });
          setCurrentIndex(clampedIndex - baseCount);
        }
      }
    });
  }, [baseCount, displayItems.length]);

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSlide = (targetIndex: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const firstChild = track.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const gap = window.innerWidth < 640 ? 12 : 16;
    const itemWidth = firstChild.getBoundingClientRect().width + gap;

    isAutoScrolling.current = true;
    track.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth',
    });

    setCurrentIndex(targetIndex);

    setTimeout(() => {
      isAutoScrolling.current = false;
      // Wrap boundaries seamlessly after smooth scroll finishes
      if (targetIndex < baseCount) {
        const wrapped = targetIndex + baseCount;
        track.scrollTo({ left: wrapped * itemWidth, behavior: 'auto' });
        setCurrentIndex(wrapped);
      } else if (targetIndex >= baseCount * 2) {
        const wrapped = targetIndex - baseCount;
        track.scrollTo({ left: wrapped * itemWidth, behavior: 'auto' });
        setCurrentIndex(wrapped);
      }
    }, 450);
  };

  const handlePrev = () => {
    scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(currentIndex + 1);
  };

  // Active Modulo Index for Progress Bar
  const activeModuloIndex = ((currentIndex % baseCount) + baseCount) % baseCount;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-1 sm:px-6">
      {/* Outer Container */}
      <div className="relative group">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous ingredients slide"
          className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#39461d]/20 text-[#39461d] shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next ingredients slide"
          className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#39461d]/20 text-[#39461d] shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Native Touch & Drag Snap Scroll Track */}
        <div
          ref={scrollTrackRef}
          className="potent-carousel-track flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-8 sm:py-10 px-2 rounded-[28px] touch-pan-x"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayItems.map((item, index) => {
            const isItemActive = index === currentIndex;

            return (
              <div
                key={item.id}
                className="snap-start shrink-0 w-[82vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
                style={{ scrollSnapAlign: 'start' }}
              >
                <IngredientCard
                  ingredient={item}
                  onOpenDetails={onOpenDetails}
                  isActive={isItemActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Segmented Progress Bar Indicator (Synced Modulo Index) */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <div
          className="flex items-center gap-2 max-w-xs sm:max-w-md w-full justify-center px-4"
          role="tablist"
          aria-label="Ingredients carousel slides"
        >
          {ingredients.map((item, idx) => {
            const isExactCurrent = idx === activeModuloIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  const targetOffset = currentIndex - activeModuloIndex + idx;
                  scrollToSlide(targetOffset);
                }}
                aria-label={`Go to slide ${idx + 1}: ${item.name}`}
                aria-selected={isExactCurrent}
                className="flex-1 py-2 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    isExactCurrent
                      ? 'bg-[#39461d] scale-y-110 shadow-sm opacity-100'
                      : 'bg-[#39461d]/30 group-hover:bg-[#39461d]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
