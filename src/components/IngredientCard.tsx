import React, { useRef, useState, useEffect } from 'react';
import { MoreHorizontal, Play, Pause } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasVideoError) return;

    // Attempt autoplay safely
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [ingredient.videoSrc, hasVideoError]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <article
      className={`potent-card group relative w-full h-[480px] sm:h-[520px] rounded-[24px] overflow-hidden select-none shadow-lg transition-transform duration-300 ${
        isActive ? 'ring-2 ring-emerald-800/30' : ''
      }`}
    >
      {/* Background Media */}
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        {ingredient.videoSrc && !hasVideoError ? (
          <video
            ref={videoRef}
            src={ingredient.videoSrc}
            poster={ingredient.imageSrc}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setHasVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={ingredient.imageSrc}
            alt={`${ingredient.name} (${ingredient.scientificName})`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      {/* Top Gradient Overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-[75%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

      {/* Top Right Action Button */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {ingredient.videoSrc && !hasVideoError && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpenDetails(ingredient)}
          aria-label={`View details for ${ingredient.name}`}
          className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        >
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Card Content Overlay (Bottom Left) */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10">
        {/* Ingredient Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug drop-shadow-sm">
          {ingredient.name}
        </h3>

        {/* Scientific Name */}
        <p className="text-emerald-200/90 text-sm sm:text-base italic font-serif mt-0.5 mb-2.5">
          ({ingredient.scientificName})
        </p>

        {/* Short 2-line Description */}
        <p className="text-white/85 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-sans font-light">
          {ingredient.description}
        </p>

        {/* Action Button: Learn More */}
        <div>
          <button
            type="button"
            onClick={() => onOpenDetails(ingredient)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/40 bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-emerald-950 transition-all duration-300 group-hover:bg-white group-hover:text-emerald-950 shadow-sm"
          >
            <span>Learn More</span>
          </button>
        </div>
      </div>
    </article>
  );
};
