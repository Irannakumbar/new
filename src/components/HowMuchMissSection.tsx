import React, { useState } from 'react';
import { Heart, Sparkles, HelpCircle, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ChoiceOption {
  id: string;
  label: string;
  emoji: string;
  title: string;
  message: string;
  kannadaNote?: string;
  isUltimate: boolean;
}

export const HowMuchMissSection: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [heartParticles, setHeartParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const choices: ChoiceOption[] = [
    {
      id: 'little',
      label: 'A Little',
      emoji: '❤️',
      title: 'A little?! Absolutely impossible! 🙈',
      message:
        "Even if I tried with all my will, my heart physically refuses to miss you just 'a little'! My mind has been wandering to your smile all day. Try again, sweetheart! 💕",
      kannadaNote: 'ಸ್ವಲ್ಪ ಅಲ್ಲ, ತುಂಬಾ ತುಂಬಾ ಮಿಸ್ ಮಾಡ್ತಿದ್ದೀನಿ!',
      isUltimate: false,
    },
    {
      id: 'lot',
      label: 'A Lot',
      emoji: '🥺',
      title: 'So, so, so much! 🥺❤️',
      message:
        "Every single notification chime makes me secretly pray it's a message from you... But the honest truth? It's even bigger than 'a lot'! Look at the last option! ✨",
      kannadaNote: 'ತುಂಬಾ ಅಂದ್ರೆ ತುಂಬಾನೇ ಜಾಸ್ತಿ ಕಣೇ...',
      isUltimate: false,
    },
    {
      id: 'infinity',
      label: 'More Than Words Can Say',
      emoji: '💖',
      title: 'The Truth of My Heart 🌟',
      message:
        'Even all the stars in this sky couldn\'t count how many times I\'ve thought about you today. ❤️',
      kannadaNote: 'ಆಕಾಶದ ನಕ್ಷತ್ರಗಳೂ ಸಾಲದು ನಿನ್ನ ನೆನಪನ್ನು ಎಣಿಸಲು... ನಿನಗಿಂತ ಮುಖ್ಯ ಇನ್ನೇನೂ ಇಲ್ಲ.',
      isUltimate: true,
    },
  ];

  const handleSelect = (choice: ChoiceOption, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedChoice(choice.id);

    // Audio chime
    if (choice.isUltimate) {
      soundEngine.playHeartBurst();
    } else {
      soundEngine.playChime(580, 0.8, 0.12);
    }

    // Spawn floating heart burst at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: choice.isUltimate ? 16 : 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
      y: rect.top - 20 - Math.random() * 40,
    }));

    setHeartParticles((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHeartParticles((prev) => prev.filter((p) => !newHearts.some((nh) => nh.id === p.id)));
    }, 1500);
  };

  const activeOption = choices.find((c) => c.id === selectedChoice);

  return (
    <section id="how-much-miss" className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      {/* Dynamic Floating Click Hearts */}
      {heartParticles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50 text-xl animate-float-slow transition-opacity duration-1000 opacity-90"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
          }}
        >
          💖
        </div>
      ))}

      {/* Title */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
          <span>A Quick Question for You</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          Guess how much I'm missing you right now? 🥹
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
          Tap what you think is the real answer...
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          return (
            <button
              key={choice.id}
              onClick={(e) => handleSelect(choice, e)}
              className={`relative px-5 py-4 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${
                isSelected
                  ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)] scale-105 border-transparent'
                  : 'glass-card border-pink-400/20 text-pink-100 hover:border-pink-400/60 hover:scale-102'
              }`}
            >
              <span className="text-2xl transition-transform group-hover:scale-125">
                {choice.emoji}
              </span>
              <span className="tracking-wide">{choice.label}</span>
              {choice.isUltimate && (
                <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-amber-400/90 text-night-950 text-[10px] font-bold flex items-center gap-0.5 shadow-md">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Real
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Animated Answer Reveal Box */}
      {activeOption && (
        <div className="mt-10 max-w-2xl mx-auto transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden glass-panel border ${
              activeOption.isUltimate
                ? 'border-pink-400 shadow-[0_0_40px_rgba(244,63,94,0.4)] bg-gradient-to-b from-purple-950/60 to-pink-950/70'
                : 'border-pink-400/30'
            }`}
          >
            {activeOption.isUltimate && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-amber-300 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Only True Answer</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="pt-2 space-y-3">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-gradient-romantic">
                {activeOption.title}
              </h3>
              <p className="text-base sm:text-lg text-pink-100 font-light leading-relaxed max-w-lg mx-auto">
                "{activeOption.message}"
              </p>

              {activeOption.kannadaNote && (
                <p className="font-kannada text-sm sm:text-base text-pink-300/80 pt-2 border-t border-pink-400/20 italic">
                  {activeOption.kannadaNote}
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-pink-300/60">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>Always in my thoughts</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
