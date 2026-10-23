import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircleHeart, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface SweetMessage {
  text: string;
  kannada?: string;
  mood: string;
}

export const TapWhenMissButton: React.FC = () => {
  const messages: SweetMessage[] = [
    {
      text: "Somewhere, someone is smiling just because you exist. That's me. ❤️",
      kannada: "ನೀನು ಈ ಜಗತ್ತಿನಲ್ಲಿದ್ದೀಯ ಅಂತಲೇ ನನ್ನ ಮುಖದಲ್ಲಿ ಈ ನಗು.",
      mood: "Warmth",
    },
    {
      text: "Take your time, enjoy your family function. I'll be waiting for our next conversation. 🫶",
      kannada: "ಮನೆಯವರ ಜೊತೆ ಖುಷಿಯಾಗಿರು, ನಾನು ನಮಗಾಗಿ ಕಾಯ್ತಿದ್ದೀನಿ.",
      mood: "Patience & Love",
    },
    {
      text: "If I could teleport anywhere right now, I'd come just to see your smile.",
      kannada: "ಈ ಕ್ಷಣದಲ್ಲೇ ನಿನ್ನ ಬಳಿ ಬಂದು ನಿನ್ನ ಆ ನಗುವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳುವಾಸೆ.",
      mood: "Longing",
    },
    {
      text: "ನಿನ್ನ ನೆನಪಲ್ಲಿ ನಗುತಿದ್ದೀನಿ, ನಿನ್ನ ಮಾತಿಗಾಗಿ ಕಾಯ್ತಿದ್ದೀನಿ ಕಣೇ ❤️",
      kannada: "Smiling in your sweet thoughts, eagerly waiting for your voice, darling.",
      mood: "From The Soul",
    },
    {
      text: "Whenever you feel a sudden breeze or a quiet smile, know that I just sent a thought your way. 🍃❤️",
      kannada: "ಗಾಳಿಯಂತೆ ನಿನ್ನ ಸುತ್ತಲೂ ನನ್ನ ಪ್ರೀತಿಯ ನೆನಪುಗಳಿರಲಿ.",
      mood: "Whisper",
    },
    {
      text: "You make my heart happier than anyone else ever could. 💖",
      kannada: "ನಿನ್ನಷ್ಟು ನನ್ನ ಮನಸ್ಸನ್ನು ಖುಷಿಪಡಿಸಿದವರು ಯಾರೂ ಇಲ್ಲ.",
      mood: "Gratitude",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flyingHearts, setFlyingHearts] = useState<{ id: number; left: number }[]>([]);

  const handleTap = () => {
    soundEngine.playHeartBurst();
    setIsAnimating(true);
    setTapCount((prev) => prev + 1);

    // Pick a message different from current
    let nextIdx = Math.floor(Math.random() * messages.length);
    if (currentIndex !== null && messages.length > 1) {
      while (nextIdx === currentIndex) {
        nextIdx = Math.floor(Math.random() * messages.length);
      }
    }
    setCurrentIndex(nextIdx);

    // Spawn floating heart particles
    const newHeart = { id: Date.now(), left: Math.random() * 80 + 10 };
    setFlyingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);

    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  const activeMsg = currentIndex !== null ? messages[currentIndex] : null;

  return (
    <section id="cute-message-button" className="py-16 px-4 max-w-3xl mx-auto relative z-10 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <MessageCircleHeart className="w-3.5 h-3.5 text-pink-400" />
          <span>Instant Comfort</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          A Cute Message for You 💌
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          Whenever you miss me during the function, tap this heart to receive a new loving thought.
        </p>
      </div>

      {/* Main Interactive Button */}
      <div className="relative inline-block my-4">
        {/* Flying Hearts */}
        {flyingHearts.map((h) => (
          <div
            key={h.id}
            className="absolute bottom-full text-2xl animate-float-slow pointer-events-none transition-opacity duration-1000"
            style={{ left: `${h.left}%` }}
          >
            💖
          </div>
        ))}

        <button
          id="tap-when-miss-me-btn"
          onClick={handleTap}
          className={`group relative inline-flex items-center gap-3 px-8 sm:px-10 py-5 rounded-full text-base sm:text-lg font-semibold text-white glass-button overflow-hidden transition-all duration-300 ${
            isAnimating ? 'scale-95 ring-4 ring-pink-400/50' : 'hover:scale-105'
          }`}
        >
          <Heart
            className={`w-6 h-6 text-rose-300 fill-rose-300 transition-transform ${
              isAnimating ? 'scale-125' : 'group-hover:scale-110'
            }`}
          />
          <span className="tracking-wide">Tap When You Miss Me</span>
          <span className="text-xl">💌</span>
        </button>
      </div>

      {/* Counter badge */}
      {tapCount > 0 && (
        <div className="mt-2 text-xs text-pink-300/60 font-medium">
          Sent {tapCount} {tapCount === 1 ? 'sweet note' : 'sweet notes'} to your heart 🌸
        </div>
      )}

      {/* Display Card for message */}
      {activeMsg && (
        <div className="mt-8 transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-3">
          <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-pink-400/30 max-w-xl mx-auto shadow-[0_15px_35px_rgba(244,63,94,0.25)] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-pink-400/15 text-xs text-pink-300/70">
              <span className="uppercase tracking-widest">{activeMsg.mood}</span>
              <button
                onClick={handleTap}
                className="hover:text-pink-200 transition-colors flex items-center gap-1"
                title="Next message"
              >
                <span>Another one</span>
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-lg sm:text-xl font-medium text-pink-50 leading-relaxed font-sans">
                "{activeMsg.text}"
              </p>

              {activeMsg.kannada && (
                <p className="font-kannada text-sm sm:text-base text-pink-300/80 italic pt-2 border-t border-pink-400/15">
                  {activeMsg.kannada}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-pink-400/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Right here thinking of you</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
