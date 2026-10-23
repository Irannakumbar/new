import React, { useState } from 'react';
import { Heart, Sparkles, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface KannadaQuoteItem {
  id: number;
  kannada: string;
  english: string;
  mood: string;
  accent: string;
}

export const KannadaQuotes: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const quotes: KannadaQuoteItem[] = [
    {
      id: 1,
      kannada: "ನಿನ್ನ ನೆನಪೇ ನನ್ನ ಮನಸ್ಸಿನಲ್ಲಿ ತುಂಬಿದೆ ❤️",
      english: "My mind is completely filled with thoughts of you.",
      mood: "Everlasting Memory",
      accent: "from-pink-500/20 to-rose-600/20",
    },
    {
      id: 2,
      kannada: "ನಿನ್ನ ಜೊತೆ ಮಾತಾಡಬೇಕು ಅನ್ನಿಸುತ್ತಿದೆ, ತುಂಬಾ ಮಿಸ್ ಮಾಡ್ಕೊಳ್ತಿದ್ದೀನಿ ಕಣೇ 🥺",
      english: "I feel like talking to you so much, missing you endlessly darling.",
      mood: "Missing Your Voice",
      accent: "from-purple-500/20 to-pink-600/20",
    },
    {
      id: 3,
      kannada: "ನೀನು ಖುಷಿಯಾಗಿರು, ನಾನು ಇಲ್ಲಿ ನಿನ್ನ ನೆನಪಲ್ಲಿ ಇರ್ತೀನಿ ❤️",
      english: "Enjoy every second with your family, I'll happily be right here lost in your thoughts.",
      mood: "Loving Care",
      accent: "from-rose-500/20 to-amber-600/20",
    },
    {
      id: 4,
      kannada: "ನಿನ್ನ ನಗು ನೋಡೋಕೆ ಮನಸ್ಸು ಕಾಯ್ತಿದೆ, ನನ್ನ ಪ್ರೀತಿಯೇ 💗",
      english: "My heart is waiting eagerly just to see that magical smile of yours, my love.",
      mood: "Waiting For You",
      accent: "from-violet-500/20 to-rose-500/20",
    },
  ];

  const handleCardClick = (id: number) => {
    setActiveCard(id);
    soundEngine.playChime(523 + id * 60, 1.2, 0.14);
  };

  return (
    <section id="kannada-messages" className="py-16 px-4 max-w-5xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>ಪ್ರೀತಿಯ ಮಾತುಗಳು • Words of Love</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          Kannada Love Messages ❤️
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-lg mx-auto">
          Some feelings sound so much deeper and softer in our mother tongue. Tap each card to feel the emotion.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((q) => {
          const isSelected = activeCard === q.id;
          return (
            <div
              key={q.id}
              onClick={() => handleCardClick(q.id)}
              className={`group relative rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 glass-card border ${
                isSelected
                  ? 'border-pink-400 shadow-[0_0_35px_rgba(244,63,94,0.35)] scale-[1.02]'
                  : 'border-pink-400/20 hover:border-pink-400/50'
              }`}
            >
              {/* Inner ambient glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${q.accent} opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-pink-300/80 font-medium px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-400/20">
                    {q.mood}
                  </span>
                  <div className="flex items-center gap-1.5 text-pink-300/60 group-hover:text-pink-300 transition-colors">
                    <Sparkles className="w-4 h-4 text-amber-300 opacity-70 group-hover:opacity-100" />
                    <Volume2 className="w-4 h-4 text-pink-300/80" />
                  </div>
                </div>

                {/* Kannada text */}
                <div className="space-y-3">
                  <p className="font-kannada text-2xl sm:text-3xl font-medium text-pink-50 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {q.kannada}
                  </p>

                  {/* English meaning */}
                  <div className="pt-2 border-t border-pink-400/15">
                    <p className="text-xs uppercase tracking-widest text-pink-400/70 font-semibold mb-1">
                      Meaning in English:
                    </p>
                    <p className="text-sm sm:text-base text-pink-200/80 font-light italic leading-normal">
                      "{q.english}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-pink-300/50 pt-1">
                  <span>Tap to feel</span>
                  <Heart
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected
                        ? 'fill-pink-500 text-pink-500 scale-125'
                        : 'text-pink-400/50 group-hover:scale-110'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
