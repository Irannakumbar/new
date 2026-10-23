import React, { useState } from 'react';
import { Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ReasonCard {
  id: number;
  frontTitle: string;
  revealedText: string;
  kannadaTranslation: string;
  emoji: string;
}

export const ReasonsLoveSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const reasons: ReasonCard[] = [
    {
      id: 1,
      frontTitle: "Reason #1",
      revealedText: "Your beautiful smile.",
      kannadaTranslation: "ನಿನ್ನ ಆ ಮುದ್ದಾದ ನಗು.",
      emoji: "😊",
    },
    {
      id: 2,
      frontTitle: "Reason #2",
      revealedText: "The way you make ordinary days special.",
      kannadaTranslation: "ಸಾಮಾನ್ಯ ದಿನಗಳನ್ನೂ ವಿಶೇಷವಾಗಿಸುವ ನಿನ್ನ ಮಾಯೆ.",
      emoji: "✨",
    },
    {
      id: 3,
      frontTitle: "Reason #3",
      revealedText: "Your voice that makes everything feel better.",
      kannadaTranslation: "ಮನಸ್ಸಿಗೆ ಸಮಾಧಾನ ಕೊಡುವ ನಿನ್ನ ಧ್ವನಿ.",
      emoji: "🎶",
    },
    {
      id: 4,
      frontTitle: "Reason #4",
      revealedText: "The little things you do without realizing.",
      kannadaTranslation: "ನಿನಗೇ ತಿಳಿಯದೆ ನೀನು ಮಾಡುವ ಪುಟ್ಟ ಪುಟ್ಟ ಮುದ್ದಾದ ವಿಷಯಗಳು.",
      emoji: "🌸",
    },
    {
      id: 5,
      frontTitle: "Reason #5",
      revealedText: "The happiness I feel when I talk to you.",
      kannadaTranslation: "ನಿನ್ನೊಂದಿಗೆ ಮಾತಾಡುವಾಗ ಸಿಗುವ ಅಪಾರ ಸಂತೋಷ.",
      emoji: "💖",
    },
    {
      id: 6,
      frontTitle: "Reason #6",
      revealedText: "Simply because you're you.",
      kannadaTranslation: "ಯಾವುದೇ ಕಾರಣವಿಲ್ಲದೆ, ನೀನು ನೀನಾಗಿದ್ದಕ್ಕೆ ಮಾತ್ರ.",
      emoji: "👑",
    },
  ];

  const toggleFlip = (id: number) => {
    soundEngine.playPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <section id="reasons-i-love-you" className="py-16 px-4 max-w-5xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>Tap to Unveil My Secrets</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          Reasons I Love You 💕
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          There are a million reasons, but here are six little pieces of my heart. Tap each card to reveal.
        </p>
        <div className="text-xs text-pink-400/80 font-medium">
          Unlocked {flippedCount} of {reasons.length} secret notes ✨
        </div>
      </div>

      {/* 6 Cards Grid (3 columns desktop, 2 tablet, 1 mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r) => {
          const isFlipped = !!flippedCards[r.id];

          return (
            <div
              key={r.id}
              onClick={() => toggleFlip(r.id)}
              className="h-56 cursor-pointer perspective-1000 group"
            >
              <div
                className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT (Unrevealed Envelope Card) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 glass-card border border-pink-400/30 flex flex-col items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.4)] group-hover:border-pink-400/70 group-hover:scale-102 transition-all">
                  <div className="flex items-center justify-between w-full text-xs text-pink-300/70">
                    <span>{r.frontTitle}</span>
                    <Lock className="w-3.5 h-3.5 text-pink-400" />
                  </div>

                  {/* Center wax stamp illustration */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center border-2 border-white/30 text-white transform group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 fill-white animate-pulse" />
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium text-pink-100 flex items-center justify-center gap-1">
                      <span>Tap to reveal</span>
                      <Sparkles className="w-3 h-3 text-amber-300" />
                    </p>
                    <p className="text-[11px] text-pink-300/50">A secret just for you</p>
                  </div>
                </div>

                {/* BACK (Revealed Reason Card) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-6 glass-panel border border-pink-400/50 flex flex-col items-center justify-between text-center bg-gradient-to-br from-purple-950/80 via-pink-950/70 to-night-950/90 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                  <div className="flex items-center justify-between w-full text-xs text-pink-300/70">
                    <span className="font-semibold text-pink-400">{r.frontTitle}</span>
                    <Unlock className="w-3.5 h-3.5 text-pink-300" />
                  </div>

                  {/* Revealed Reason */}
                  <div className="space-y-2">
                    <span className="text-3xl">{r.emoji}</span>
                    <h4 className="text-lg sm:text-xl font-serif font-bold text-pink-50">
                      "{r.revealedText}"
                    </h4>
                    <p className="font-kannada text-xs sm:text-sm text-pink-300/80 italic">
                      {r.kannadaTranslation}
                    </p>
                  </div>

                  <p className="text-[11px] text-pink-300/50">Tap to flip back</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
