import React, { useEffect } from 'react';
import { X, MapPin, Beaker } from 'lucide-react';
import { IngredientItem } from './IngredientCard';

interface IngredientDetailModalProps {
  ingredient: IngredientItem | null;
  onClose: () => void;
}

export const IngredientDetailModal: React.FC<IngredientDetailModalProps> = ({
  ingredient,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (ingredient) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ingredient, onClose]);

  if (!ingredient) return null;

  const details = ingredient.fullDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      {/* Soft Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card with Clean Image & Unboxed Editorial Flow */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF8F5] rounded-[28px] overflow-hidden shadow-2xl flex flex-col z-10 border border-stone-200/80 text-stone-900">
        {/* Completely Clean Hero Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-950 overflow-hidden flex-shrink-0">
          {ingredient.videoSrc ? (
            <video
              key={ingredient.videoSrc}
              src={ingredient.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={ingredient.imageSrc}
              alt={ingredient.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Top-Right High Contrast Floating Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all shadow-md cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Modal Body Content (Comfortable Padding ending cleanly after Metadata Grid) */}
        <div className="p-6 sm:p-8 pb-8 sm:pb-10 overflow-y-auto space-y-5 text-left custom-scrollbar">
          {/* 1. Ingredient Title & Botanical Subtitle */}
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              {ingredient.name}
            </h3>
            <p className="font-serif italic text-stone-500 text-sm mt-0.5 font-light">
              ({ingredient.scientificName})
            </p>
          </div>

          {/* Key Benefits List with Deep Botanical Green Bullets */}
          {details?.benefits && details.benefits.length > 0 && (
            <div className="space-y-3 pt-1">
              <h4 className="text-xs uppercase tracking-[0.18em] font-extrabold text-stone-800">
                Key Benefits & Actions
              </h4>
              <ul className="space-y-2.5">
                {details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-stone-800 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#2D3A2F] shrink-0 mt-2" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Two-Column Metadata Grid (Sourcing & Key Active Nutrients) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 pt-4 border-t border-stone-200/80">
            {details?.sourcing && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#954721] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase">
                    Sourcing Habitat
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5 leading-snug">
                    {details.sourcing}
                  </p>
                </div>
              </div>
            )}

            {details?.keyCompounds && (
              <div className="flex items-start gap-3">
                <Beaker className="w-4 h-4 text-[#2D3A2F] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase">
                    Key Active Nutrients
                  </h5>
                  <p className="text-xs sm:text-sm text-[#2D3A2F] font-medium mt-0.5 leading-snug">
                    {details.keyCompounds}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
