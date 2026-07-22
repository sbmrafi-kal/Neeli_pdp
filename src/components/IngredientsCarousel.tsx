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
  const isScrollingRef = useRef<boolean>(false);

  // Sync scroll position to active index
  const handleScroll = useCallback(() => {
    if (!scrollTrackRef.current) return;
    const track = scrollTrackRef.current;

    window.requestAnimationFrame(() => {
      const firstChild = track.firstElementChild as HTMLElement;
      if (!firstChild) return;

      const gap = 24; // 24px gap between cards on desktop / 16px on mobile
      const itemWidth = firstChild.getBoundingClientRect().width + gap;
      if (itemWidth <= 0) return;

      const newIndex = Math.round(track.scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(ingredients.length - 1, newIndex));

      setCurrentIndex((prev) => (prev !== clampedIndex ? clampedIndex : prev));
    });
  }, [ingredients.length]);

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSlide = (index: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const targetIndex = Math.max(0, Math.min(ingredients.length - 1, index));
    const firstChild = track.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const gap = window.innerWidth < 640 ? 16 : 24;
    const itemWidth = firstChild.getBoundingClientRect().width + gap;

    isScrollingRef.current = true;
    track.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth',
    });

    setCurrentIndex(targetIndex);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 450);
  };

  const handlePrev = () => {
    scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-8">
      {/* Outer Container */}
      <div className="relative group">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous ingredients slide"
          className={`absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#39461d]/20 text-[#39461d] shadow-lg flex items-center justify-center transition-all duration-300 ${
            currentIndex === 0
              ? 'opacity-20 cursor-not-allowed pointer-events-none'
              : 'hover:bg-white hover:scale-110 active:scale-95 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= ingredients.length - 1}
          aria-label="Next ingredients slide"
          className={`absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#39461d]/20 text-[#39461d] shadow-lg flex items-center justify-center transition-all duration-300 ${
            currentIndex >= ingredients.length - 1
              ? 'opacity-20 cursor-not-allowed pointer-events-none'
              : 'hover:bg-white hover:scale-110 active:scale-95 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* 3D Depth Perspective Track Wrapper (Unclipped for Scaled Active Cards) */}
        <div
          ref={scrollTrackRef}
          className="potent-carousel-track flex gap-4 sm:gap-6 overflow-x-auto py-8 sm:py-10 px-2 rounded-[28px] scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            perspective: '1000px',
          }}
        >
          {ingredients.map((item, index) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform-gpu"
              style={{
                scrollSnapAlign: 'start',
                willChange: 'transform, opacity',
              }}
            >
              <IngredientCard
                ingredient={item}
                onOpenDetails={onOpenDetails}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Segmented Progress Bar Indicator (Bottom Center) */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3">
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

        {/* Slide Counter */}
        <p className="text-xs font-mono uppercase tracking-widest text-[#39461d]/80 font-semibold">
          {currentIndex + 1} of {ingredients.length}
        </p>
      </div>
    </div>
  );
};
