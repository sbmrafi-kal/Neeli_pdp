import React, { useEffect } from 'react';
import { X, CheckCircle2, Sparkles, MapPin, Beaker } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#F7F5F0] rounded-[28px] overflow-hidden shadow-2xl flex flex-col z-10 border border-[#39461d]/15 text-[#2A3517]">
        {/* Header Media Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden flex-shrink-0">
          {ingredient.videoSrc ? (
            <video
              src={ingredient.videoSrc}
              poster={ingredient.imageSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={ingredient.imageSrc}
              alt={ingredient.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F0] via-black/30 to-black/40" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title inside Media */}
          <div className="absolute bottom-4 left-6 right-6 text-left">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {ingredient.name}
            </h3>
            <p className="font-serif text-emerald-200 text-base sm:text-lg italic mt-0.5">
              {ingredient.scientificName}
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
          {/* Key Role */}
          {details?.role && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#E8ECE5] border border-[#39461d]/10">
              <Sparkles className="w-5 h-5 text-[#39461d] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#39461d]/80">
                  Ayurvedic Role
                </h4>
                <p className="font-medium text-[#2A3517] text-base mt-0.5">{details.role}</p>
              </div>
            </div>
          )}

          {/* Short Description */}
          <p className="text-base text-[#39461d]/90 leading-relaxed">{ingredient.description}</p>

          {/* Benefits List */}
          {details?.benefits && details.benefits.length > 0 && (
            <div>
              <h4 className="text-sm uppercase tracking-wider font-bold text-[#39461d] mb-3">
                Key Benefits & Actions
              </h4>
              <ul className="space-y-2.5">
                {details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-[#2A3517]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Grid Metadata: Sourcing & Compounds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#39461d]/15">
            {details?.sourcing && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#954721] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs uppercase font-bold text-[#39461d]/70">Sourcing Habitat</h5>
                  <p className="text-xs sm:text-sm text-[#2A3517] font-medium mt-0.5">{details.sourcing}</p>
                </div>
              </div>
            )}

            {details?.keyCompounds && (
              <div className="flex items-start gap-2.5">
                <Beaker className="w-4 h-4 text-[#39461d] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs uppercase font-bold text-[#39461d]/70">Phyto-nutrients</h5>
                  <p className="text-xs sm:text-sm text-[#2A3517] font-medium mt-0.5">{details.keyCompounds}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#E8ECE5] border-t border-[#39461d]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#39461d] text-white hover:bg-[#2c3717] font-medium text-sm transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
