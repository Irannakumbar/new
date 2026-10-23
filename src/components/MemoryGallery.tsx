import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoMemory } from '../config';
import { soundEngine } from '../utils/soundEffects';

interface MemoryGalleryProps {
  photos: PhotoMemory[];
  onOpenCustomizer?: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ photos, onOpenCustomizer }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    soundEngine.playPop();
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    soundEngine.playPop();
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playChime(600, 0.4, 0.08);
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playChime(500, 0.4, 0.08);
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="our-memories" className="py-16 px-4 max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          <span>Frames of Us</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          Our Memories 📸
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          Every picture holds a memory, and every memory makes me miss you a little more today.
        </p>

        {/* Note on editable placeholders */}
        <div className="pt-2">
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 text-xs text-pink-300/80 hover:text-pink-200 underline decoration-pink-500/50 underline-offset-4 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Customize or replace with your real photos in config</span>
          </button>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => openLightbox(index)}
            className="group relative rounded-3xl overflow-hidden glass-card cursor-pointer border border-pink-400/20 hover:border-pink-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-purple-950/40">
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
              />

              {/* Romantic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                {item.date && (
                  <span className="px-2.5 py-1 rounded-full bg-night-950/70 backdrop-blur-md text-pink-200 border border-pink-500/20 text-[11px]">
                    {item.date}
                  </span>
                )}
                <div className="w-8 h-8 rounded-full bg-night-950/60 backdrop-blur-md flex items-center justify-center text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Caption Area */}
            <div className="p-5 bg-gradient-to-b from-night-900/60 to-night-950/90 backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <p className="font-sans font-medium text-pink-100 text-base sm:text-lg group-hover:text-pink-300 transition-colors">
                  {item.caption}
                </p>
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20 group-hover:fill-rose-400 transition-all flex-shrink-0 mt-0.5" />
              </div>
              {item.location && (
                <p className="text-xs text-pink-300/60 mt-1 italic">
                  📍 {item.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-300"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[88vh] flex flex-col items-center rounded-3xl overflow-hidden glass-panel border border-pink-400/40 p-2 sm:p-4 shadow-[0_0_60px_rgba(244,63,94,0.4)]"
          >
            <div className="relative overflow-hidden rounded-2xl max-h-[70vh]">
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].caption}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="pt-4 pb-2 px-4 text-center space-y-1 w-full">
              <p className="text-lg sm:text-xl font-medium text-pink-100 flex items-center justify-center gap-2">
                <span>{photos[activePhotoIndex].caption}</span>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 inline" />
              </p>
              <p className="text-xs text-pink-300/70">
                Photo {activePhotoIndex + 1} of {photos.length}
                {photos[activePhotoIndex].date && ` • ${photos[activePhotoIndex].date}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
