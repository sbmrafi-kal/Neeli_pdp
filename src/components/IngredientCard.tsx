import React, { useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface IngredientDetail {
  role?: string;
  benefits?: string[];
  sourcing?: string;
  ayurvedicProperties?: string;
  keyCompounds?: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  videoSrc?: string;
  imageSrc: string;
  theme?: 'dark' | 'light';
  fullDetails?: IngredientDetail;
}

interface IngredientCardProps {
  ingredient: IngredientItem;
  onOpenDetails: (ingredient: IngredientItem) => void;
  isActive?: boolean;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  onOpenDetails,
  isActive = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLightTheme = ingredient.theme === 'light';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay handled silently
      });
    }
  }, [ingredient.videoSrc]);

  return (
    <article
      className={`potent-card ${isLightTheme ? 'potent-card-light' : 'potent-card-dark'} group relative w-full aspect-[4/5] sm:h-[400px] rounded-[24px] overflow-hidden select-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform-gpu ${
        isActive
          ? 'scale-[1.04] opacity-100 shadow-2xl z-20'
          : 'scale-[0.96] opacity-100 hover:scale-[0.98] shadow-md z-10'
      }`}
      style={{
        willChange: 'transform, box-shadow',
      }}
    >
      {/* Background Media Edge-to-Edge (Properly Framed & Zoomed Out) */}
      <div className="absolute inset-0 bg-slate-950 overflow-hidden pointer-events-none">
        {ingredient.videoSrc ? (
          <video
            ref={videoRef}
            src={ingredient.videoSrc}
            poster={ingredient.imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center scale-100"
            style={{ backfaceVisibility: 'hidden' }}
          />
        ) : (
          <img
            src={ingredient.imageSrc}
            alt={`${ingredient.name} (${ingredient.scientificName})`}
            className="absolute inset-0 w-full h-full object-cover object-center scale-100"
            loading="lazy"
          />
        )}
      </div>

      {/* Subtle Top Gradient Overlay */}
      <div
        className={`absolute top-0 inset-x-0 h-20 pointer-events-none z-10 ${
          isLightTheme
            ? 'bg-gradient-to-b from-white/40 via-transparent to-transparent'
            : 'bg-gradient-to-b from-black/40 via-transparent to-transparent'
        }`}
      />

      {/* Subtle Bottom Gradient Overlay (Only Darkens Behind Text) */}
      <div
        className={`absolute bottom-0 inset-x-0 h-[60%] pointer-events-none z-10 transition-opacity duration-500 ${
          isLightTheme
            ? 'bg-gradient-to-t from-[#F4F7F2]/90 via-[#F4F7F2]/40 to-transparent'
            : 'bg-gradient-to-t from-black/75 via-black/25 to-transparent'
        }`}
      />

      {/* Top Right Action: Solid White Circular Three-Dot Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => onOpenDetails(ingredient)}
          aria-label={`View details for ${ingredient.name}`}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer ${
            isLightTheme
              ? 'bg-[#39461d] text-white hover:bg-[#2A3517]'
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <MoreHorizontal className={`w-5 h-5 ${isLightTheme ? 'text-white' : 'text-slate-800'}`} />
        </button>
      </div>

      {/* Card Content Overlay Sitting Directly over Subtle Media Gradient */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end text-left z-20">
        {/* Primary Title */}
        <h3
          className={`font-serif text-2xl sm:text-3xl font-semibold tracking-tight leading-snug transition-colors duration-300 ${
            isLightTheme ? '!text-[#1C261E]' : '!text-white drop-shadow-md'
          }`}
        >
          {ingredient.name}
        </h3>

        {/* Subtitle / Scientific Name */}
        <p
          className={`font-serif italic text-xs sm:text-sm mt-0.5 mb-1 font-light transition-colors duration-300 ${
            isLightTheme ? '!text-[#2D3A2F]/80' : '!text-white/80 drop-shadow-sm'
          }`}
        >
          ({ingredient.scientificName})
        </p>

        {/* Expandable Section: Description + Learn More Button (Visible on Active Card or Hover) */}
        <div
          className={`transition-all duration-500 ease-out overflow-hidden ${
            isActive
              ? 'max-h-48 opacity-100 mt-2'
              : 'max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 group-hover:mt-2'
          }`}
        >
          {/* Short 2-Line Description */}
          <p
            className={`text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3.5 font-sans font-normal transition-colors duration-300 ${
              isLightTheme ? '!text-[#1C261E]/90' : '!text-white/95 drop-shadow-sm'
            }`}
          >
            {ingredient.description}
          </p>

          {/* Action Button: Transparent Outline Pill */}
          <div>
            <button
              type="button"
              onClick={() => onOpenDetails(ingredient)}
              className={`inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer ${
                isLightTheme
                  ? 'border border-[#39461d]/70 bg-transparent text-[#39461d] hover:bg-[#39461d] hover:text-white'
                  : 'border border-white/80 bg-transparent text-white hover:bg-white hover:text-slate-950'
              }`}
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
