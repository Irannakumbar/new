import React, { useState } from 'react';
import { Moon, Heart, Sparkles, X, MessageSquare, Send } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface FinalSurpriseScreenProps {
  herName: string;
  myName: string;
  whatsappMessage?: string;
}

export const FinalSurpriseScreen: React.FC<FinalSurpriseScreenProps> = ({
  herName,
  myName,
  whatsappMessage,
}) => {
  const [showHugModal, setShowHugModal] = useState(false);
  const [hugHearts, setHugHearts] = useState<{ id: number; left: number; top: number; size: number }[]>([]);

  const handleHugClick = () => {
    soundEngine.playHeartBurst();
    setShowHugModal(true);

    // Generate burst of hug hearts
    const hearts = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 24 + 16,
    }));
    setHugHearts(hearts);
  };

  const closeHugModal = () => {
    soundEngine.playPop();
    setShowHugModal(false);
  };

  const shareText = encodeURIComponent(
    whatsappMessage || `Hey ${myName || 'my love'}, I saw your website Ninna Nenapu ❤️! Missing you too so much!`
  );

  return (
    <section id="final-surprise" className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Cinematic Glowing Moon */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
        <div className="relative group cursor-pointer" onClick={handleHugClick}>
          {/* Moon halo glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-amber-200/20 via-pink-300/20 to-purple-400/20 blur-3xl group-hover:scale-125 transition-transform duration-1000" />

          {/* Moon Sphere */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-purple-200 shadow-[0_0_60px_rgba(254,243,199,0.55)] border-2 border-white/60 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_90px_rgba(254,243,199,0.85)]">
            {/* Moon craters / subtle textures */}
            <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-amber-200/40 blur-[1px]" />
            <div className="absolute top-16 right-10 w-9 h-9 rounded-full bg-purple-200/35 blur-[1px]" />
            <div className="absolute bottom-8 left-14 w-12 h-12 rounded-full bg-pink-200/30 blur-[2px]" />

            {/* Glowing Heart inside moon */}
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose-500 fill-rose-500/80 animate-heartbeat drop-shadow-md" />
          </div>

          <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-night-950/80 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Under the same moon</span>
          </div>
        </div>

        {/* Cinematic Love Message */}
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
            Until I Hear Your Voice Again... 🌙
          </h2>

          <div className="space-y-4 text-pink-100/90 text-base sm:text-lg leading-relaxed font-light">
            <p>
              "I hope you're smiling right now. I miss you, but more than anything, I want you to be happy."
            </p>
            <p>
              "Enjoy your family time, my love. Don't worry about replying quickly."
            </p>
            <p className="text-pink-200 font-normal">
              "Whenever you're free, come back to me with your stories, your laughter, and that beautiful smile of yours."
            </p>
            <p className="text-pink-200/80 italic">
              "No matter how busy today gets, there's always a little place in my heart where it's just you and me."
            </p>
            <p className="text-xl sm:text-2xl font-serif text-pink-50 font-bold pt-2">
              "I miss you, my favourite human. ❤️"
            </p>
          </div>

          {/* Final Button: One Last Hug */}
          <div className="pt-6">
            <button
              id="one-last-hug-btn"
              onClick={handleHugClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg sm:text-xl font-bold text-white glass-button overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(244,63,94,0.5)] hover:shadow-[0_0_60px_rgba(244,63,94,0.8)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>One Last Hug</span>
                <span className="text-2xl group-hover:scale-125 transition-transform">🤗</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Animated Virtual Hug Modal */}
      {showHugModal && (
        <div
          onClick={closeHugModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-500 animate-in fade-in"
        >
          {/* Animated floating hearts inside modal */}
          {hugHearts.map((h) => (
            <div
              key={h.id}
              className="fixed pointer-events-none text-pink-400/80 animate-float-slow select-none"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${(h.id % 5) * 0.3}s`,
              }}
            >
              ❤️
            </div>
          ))}

          {/* Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-3xl p-8 sm:p-10 glass-panel border-2 border-pink-400/60 text-center shadow-[0_0_80px_rgba(244,63,94,0.6)] space-y-6 transform animate-in zoom-in-95 duration-300"
          >
            {/* Close */}
            <button
              onClick={closeHugModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hug Icon */}
            <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-heartbeat">
              🫂
            </div>

            {/* Hug Message specified in prompt */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gradient-romantic">
                Warm Virtual Hug 🤗
              </h3>
              <p className="text-base sm:text-lg text-pink-100 font-light leading-relaxed">
                "Sending you the biggest virtual hug! Imagine me holding you close and not letting go for a little while. ❤️🫂"
              </p>
              <p className="font-kannada text-sm text-pink-300/90 italic pt-2 border-t border-pink-400/20">
                ನೀನು ಎಲ್ಲೇ ಇದ್ದರೂ, ನನ್ನ ಪ್ರೀತಿ ಸದಾ ನಿನ್ನ ಜೊತೆಯೇ ಇರುತ್ತೆ ಕಣೇ.
              </p>
            </div>

            {/* WhatsApp reply shortcut */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text Me On WhatsApp ❤️</span>
              </a>

              <button
                onClick={closeHugModal}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-sm font-medium bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 transition-colors"
              >
                Hold in my heart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
