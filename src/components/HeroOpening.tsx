import React, { useState } from 'react';
import { Heart, Sparkles, Send } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface HeroOpeningProps {
  herName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const HeroOpening: React.FC<HeroOpeningProps> = ({ herName, onOpen, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleOpenClick = () => {
    // 1. Immediately trigger onOpen synchronously inside user interaction
    onOpen();
    setClicked(true);
    soundEngine.playHeartBurst();
  };

  return (
    <section
      id="opening-hero"
      className={`relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
        isOpen ? 'opacity-90' : 'opacity-100'
      }`}
    >
      {/* Soft romantic backdrop halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-romantic-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center glowing heart with concentric pulsating rings */}
      <div className="relative mb-8 group cursor-pointer" onClick={handleOpenClick}>
        {/* Pulsing ring 1 */}
        <div className="absolute -inset-4 rounded-full bg-romantic-500/25 blur-xl animate-ping opacity-60" />
        
        {/* Pulsing ring 2 */}
        <div className="absolute -inset-8 rounded-full border border-pink-400/20 animate-pulse-slow" />

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full glass-panel flex items-center justify-center border-2 border-pink-400/40 shadow-[0_0_50px_rgba(244,63,94,0.45)] transition-transform duration-500 ${
            isHovered ? 'scale-110 shadow-[0_0_70px_rgba(244,63,94,0.7)]' : 'scale-100'
          }`}
        >
          <Heart
            className={`w-14 h-14 sm:w-16 sm:h-16 text-romantic-500 fill-romantic-500 transition-all duration-300 ${
              clicked ? 'scale-125 text-pink-400 fill-pink-400' : 'animate-heartbeat'
            }`}
          />
          <Sparkles className="absolute top-3 right-4 w-5 h-5 text-amber-200 animate-pulse" />
        </div>
      </div>

      {/* Opening Header Text */}
      <div className="max-w-2xl mx-auto space-y-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Ninna Nenapu • Thinking of You Always</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-romantic tracking-tight">
          Hey, {herName || 'My Love'} ❤️
        </h1>

        <div className="space-y-3 pt-2">
          <p className="text-base sm:text-xl text-pink-100/90 font-light leading-relaxed max-w-xl mx-auto">
            "Today, you're busy with your family function... and here I am, missing you a little more than usual."
          </p>
          <p className="text-sm sm:text-base text-pink-200/70 italic font-light max-w-lg mx-auto">
            "Distance is only a few hours, but when I miss you, even a minute feels so long."
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-6 space-y-2">
          <button
            id="open-heart-btn"
            onClick={handleOpenClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-medium text-white glass-button overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.7)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Open My Heart</span>
              <span className="text-xl group-hover:scale-125 transition-transform">💌</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <p className="text-xs text-pink-300/70 flex items-center justify-center gap-1.5 font-light">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Opens love letter & plays our song 🎵</span>
            <Sparkles className="w-3 h-3 text-pink-400" />
          </p>
        </div>

        {isOpen && (
          <div className="pt-4 text-xs text-pink-300/60 animate-bounce">
            ↓ Scroll down to read my love letter ↓
          </div>
        )}
      </div>
    </section>
  );
};
