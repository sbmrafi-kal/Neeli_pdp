import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Initialize track position to start (index 0 - Neeli)
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: 'auto' });
  }, []);

  const scrollToSlide = (targetIndex: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    // Wrap around bounds (0 to ingredients.length - 1)
    let newIndex = targetIndex;
    if (newIndex < 0) {
      newIndex = ingredients.length - 1;
    } else if (newIndex >= ingredients.length) {
      newIndex = 0;
    }

    const firstChild = track.firstElementChild as HTMLElement;
    if (firstChild) {
      const gap = window.innerWidth < 640 ? 12 : 16;
      const itemWidth = firstChild.getBoundingClientRect().width + gap;
      track.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth',
      });
    }

    setCurrentIndex(newIndex);
  };

  // Sync scroll state with native swipe / drag
  const handleScroll = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    window.requestAnimationFrame(() => {
      const firstChild = track.firstElementChild as HTMLElement;
      if (!firstChild) return;

      const gap = window.innerWidth < 640 ? 12 : 16;
      const itemWidth = firstChild.getBoundingClientRect().width + gap;
      if (itemWidth <= 0) return;

      const rawIndex = Math.round(track.scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(ingredients.length - 1, rawIndex));
      setCurrentIndex(clampedIndex);
    });
  }, [ingredients.length]);

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handlePrev = () => {
    scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-0 sm:px-6">
      {/* Outer Container */}
      <div className="relative group">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous ingredient slide"
          className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#39461d]/20 text-[#39461d] shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next ingredient slide"
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
          {ingredients.map((item, index) => {
            const isItemActive = index === currentIndex;

            return (
              <div
                key={item.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
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

      {/* Segmented Progress Bar Indicator */}
      <div className="mt-4 sm:mt-4 flex justify-center">
        <div
          className="flex items-center gap-2 max-w-xs sm:max-w-md w-full justify-center px-4"
          role="tablist"
          aria-label="Ingredients carousel slides"
        >
          {ingredients.map((item, idx) => {
            const isExactCurrent = idx === currentIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
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
