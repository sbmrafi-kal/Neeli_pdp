import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, ingredients.length - Math.floor(visibleCount));

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, Math.max(0, index)));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8">
      {/* Carousel Outer Wrapper */}
      <div className="relative group">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous ingredients slide"
          className={`absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 backdrop-blur-md border border-[#39461d]/15 text-[#39461d] shadow-md flex items-center justify-center transition-all duration-200 ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white hover:scale-110 active:scale-95 cursor-pointer hover:shadow-lg'
          }`}
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next ingredients slide"
          className={`absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 backdrop-blur-md border border-[#39461d]/15 text-[#39461d] shadow-md flex items-center justify-center transition-all duration-200 ${
            currentIndex >= maxIndex
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white hover:scale-110 active:scale-95 cursor-pointer hover:shadow-lg'
          }`}
        >
          <ChevronRight className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Cards Slider Track */}
        <div ref={containerRef} className="overflow-hidden py-4 rounded-[28px]">
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {ingredients.map((item, index) => (
              <motion.div
                key={item.id}
                className="shrink-0"
                style={{
                  width: `calc(${100 / visibleCount}% - ${
                    ((visibleCount - 1) * (visibleCount >= 3 ? 24 : 16)) / visibleCount
                  }px)`,
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <IngredientCard
                  ingredient={item}
                  onOpenDetails={onOpenDetails}
                  isActive={index === currentIndex}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Segmented Progress Bar & Indicator (Bottom Center) */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <div
          className="flex items-center gap-2 max-w-xs sm:max-w-md w-full justify-center px-4"
          role="tablist"
          aria-label="Ingredients carousel slides"
        >
          {ingredients.map((item, idx) => {
            const isVisibleInCurrentView =
              idx >= currentIndex && idx < currentIndex + visibleCount;
            const isExactCurrent = idx === currentIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.name}`}
                aria-selected={isExactCurrent}
                className="flex-1 py-2 group focus:outline-none"
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    isExactCurrent
                      ? 'bg-[#39461d] scale-y-110 shadow-sm'
                      : isVisibleInCurrentView
                      ? 'bg-[#39461d]/60'
                      : 'bg-[#39461d]/20 group-hover:bg-[#39461d]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Counter label */}
        <p className="text-xs font-mono uppercase tracking-widest text-[#39461d]/70">
          Showing {Math.min(currentIndex + 1, ingredients.length)}–
          {Math.min(currentIndex + Math.floor(visibleCount), ingredients.length)} of {ingredients.length}
        </p>
      </div>
    </div>
  );
};
