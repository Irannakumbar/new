import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface LoveLetterProps {
  herName: string;
  myName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ herName, myName }) => {
  const fullText = `Hey, my love...

I know you're spending time with your family, and I hope you're having a beautiful time. I don't want to disturb you, but I just wanted you to know that someone here is thinking about you.

I miss your smile, your voice, your little talks, and all those tiny things that make my day better.

I keep checking my phone, hoping to see your message. Every time I think of you, I smile, and then I miss you even more.

Enjoy your time, sweetheart. Take lots of pictures, smile a lot, and be happy.

I'll be right here, saving all my stories for you.

Come back soon, my favourite person. ❤️

— ${myName || 'Your person'}, who misses you endlessly.`;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedLength(fullText.length);
      return;
    }

    if (displayedLength < fullText.length) {
      const char = fullText[displayedLength];
      // variable delay for natural feel: pauses on punctuation
      let delay = 24;
      if (char === '.' || char === '!' || char === '?') delay = 240;
      else if (char === '\n') delay = 180;
      else if (char === ',') delay = 90;

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
        if (Math.random() < 0.08) {
          soundEngine.playChime(660 + Math.random() * 80, 0.25, 0.02);
        }
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [displayedLength, isTyping, fullText]);

  const handleReplay = () => {
    soundEngine.playPop();
    setDisplayedLength(0);
    setIsTyping(true);
  };

  const handleSkip = () => {
    soundEngine.playPop();
    setDisplayedLength(fullText.length);
    setIsTyping(false);
  };

  const currentContent = fullText.slice(0, displayedLength);

  return (
    <section id="love-letter-section" className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-pink-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 text-rose-300 text-sm tracking-wider uppercase">
          <Mail className="w-4 h-4 text-pink-400" />
          <span>Straight From My Heart</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          A Little Letter for You 💌
        </h2>
        <p className="text-pink-200/60 text-sm max-w-md mx-auto">
          Written softly while thinking about you and your laughter today.
        </p>
      </div>

      {/* Letter Parchment Container */}
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 glass-panel border border-pink-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Soft corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/15 to-transparent rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/15 to-transparent rounded-br-3xl pointer-events-none" />

        {/* Wax Stamp Decoration */}
        <div className="flex items-center justify-between pb-6 border-b border-pink-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/40 border border-rose-400/50 flex items-center justify-center text-rose-200 shadow-inner">
              <Heart className="w-5 h-5 fill-rose-300 text-rose-300 animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-400 font-medium">To My Sweetheart</p>
              <p className="text-sm font-semibold text-pink-100">{herName || 'My Love'}</p>
            </div>
          </div>

          {/* Letter controls */}
          <div className="flex items-center gap-2">
            {isTyping ? (
              <button
                onClick={handleSkip}
                className="px-3 py-1.5 rounded-full text-xs bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 transition-colors flex items-center gap-1"
                title="Show full letter"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-300" />
                <span>Show All</span>
              </button>
            ) : (
              <button
                onClick={handleReplay}
                className="px-3 py-1.5 rounded-full text-xs bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 transition-colors flex items-center gap-1"
                title="Replay typewriter"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-300" />
                <span>Replay</span>
              </button>
            )}
          </div>
        </div>

        {/* Letter Text Content */}
        <div className="font-sans text-pink-50 text-base sm:text-lg sm:leading-relaxed whitespace-pre-line tracking-wide min-h-[300px]">
          {currentContent}
          {isTyping && <span className="typewriter-cursor" />}
        </div>

        {/* Handwritten signature section (fades in once typed or skipped) */}
        <div
          className={`mt-10 pt-6 border-t border-pink-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-opacity duration-700 ${
            displayedLength >= fullText.length - 60 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 text-pink-300/80 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sealed with endless love & a million thoughts</span>
          </div>

          <div className="text-right sm:text-right w-full sm:w-auto">
            <span className="block text-xs uppercase tracking-wider text-pink-400/80">Forever yours,</span>
            <span className="text-2xl sm:text-3xl font-handwritten text-pink-200 block drop-shadow-[0_2px_10px_rgba(244,63,94,0.5)]">
              {myName || 'Your person'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
