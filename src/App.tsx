import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NightSkyCanvas } from './components/NightSkyCanvas';
import { HeroOpening } from './components/HeroOpening';
import { LoveLetter } from './components/LoveLetter';
import { KannadaQuotes } from './components/KannadaQuotes';
import { MemoryGallery } from './components/MemoryGallery';
import { MusicCorner } from './components/MusicCorner';
import { HowMuchMissSection } from './components/HowMuchMissSection';
import { ReasonsLoveSection } from './components/ReasonsLoveSection';
import { TapWhenMissButton } from './components/TapWhenMissButton';
import { FinalSurpriseScreen } from './components/FinalSurpriseScreen';
import { CustomizerModal } from './components/CustomizerModal';
import { PERSONAL_CONFIG } from './config';
import { ConfigType } from './types';
import { Volume2, VolumeX, Settings, Heart, Music, Sparkles, Play } from 'lucide-react';
import { soundEngine } from './utils/soundEffects';

export function App() {
  const [config, setConfig] = useState<ConfigType>(PERSONAL_CONFIG);
  const [isHeartOpened, setIsHeartOpened] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(0.85);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedPlayingRef = useRef(false);

  // Autoplay function: tries to play audio safely
  const attemptPlayAudio = useCallback((isExplicitGesture = false) => {
    if (config.SONG_URL && audioRef.current) {
      const audio = audioRef.current;
      audio.muted = false;
      audio.volume = volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setNeedsUserGesture(false);
            hasStartedPlayingRef.current = true;
          })
          .catch((err) => {
            console.log('Autoplay unmuted blocked by browser policy:', err);
            if (!isExplicitGesture) {
              setNeedsUserGesture(true);
              // Start muted so audio buffer is ready and playing silently
              audio.muted = true;
              audio.play().then(() => {
                setIsPlaying(true);
                setIsMuted(true);
              }).catch(() => {
                // Browser waiting for first user touch
              });
            }
          });
      }
    } else {
      soundEngine.startAmbientMusic();
      setIsPlaying(true);
      setNeedsUserGesture(false);
    }
  }, [config.SONG_URL, volume]);

  // Attempt autoplay immediately on mount and on first user gesture anywhere
  useEffect(() => {
    // 1. Initial immediate attempt on website open
    attemptPlayAudio(false);

    // 2. Global listener on ANY tap, touch, or click anywhere on the page
    const handleGlobalInteraction = () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        if (audio.paused || audio.muted || !hasStartedPlayingRef.current) {
          audio.muted = false;
          audio.volume = volume;
          audio.play().then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setNeedsUserGesture(false);
            hasStartedPlayingRef.current = true;
          }).catch(() => {});
        }
      }
    };

    const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'];
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleGlobalInteraction, { capture: true, passive: true });
    });

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGlobalInteraction, { capture: true });
      });
    };
  }, [attemptPlayAudio, volume]);

  // Audio element event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 180);
    }
  };

  const handleTogglePlay = () => {
    soundEngine.playPop();
    if (config.SONG_URL && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          soundEngine.startAmbientMusic();
          setIsPlaying(true);
        });
      }
    } else {
      if (isPlaying) {
        soundEngine.stopAmbientMusic();
        setIsPlaying(false);
      } else {
        soundEngine.startAmbientMusic();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current && config.SONG_URL) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.toggleMute();
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Called when "Open My Heart 💌" button or glowing heart is clicked
  const handleOpenHeart = () => {
    setIsHeartOpened(true);
    // Guarantee song is playing immediately within user gesture!
    if (config.SONG_URL && audioRef.current) {
      const audio = audioRef.current;
      audio.muted = false;
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        setNeedsUserGesture(false);
        hasStartedPlayingRef.current = true;
      }).catch((e) => {
        console.log('Open heart play error:', e);
      });
    } else {
      soundEngine.startAmbientMusic();
      setIsPlaying(true);
    }
    // Smooth scroll down to letter
    setTimeout(() => {
      const letterSec = document.getElementById('love-letter-section');
      if (letterSec) {
        letterSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const handleUpdateConfig = (newVals: Partial<ConfigType>) => {
    setConfig((prev) => ({
      ...prev,
      ...newVals,
    }));
  };

  return (
    <div className="relative min-h-screen text-pink-50 selection:bg-rose-500 selection:text-white">
      {/* Background Starry Night Canvas with Shooting Stars & Petals */}
      <NightSkyCanvas />

      {/* Global Audio Element */}
      {config.SONG_URL && (
        <audio
          ref={audioRef}
          src={config.SONG_URL}
          preload="auto"
          autoPlay
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => {
            if (!hasStartedPlayingRef.current) {
              attemptPlayAudio(false);
            }
          }}
          onPlay={() => {
            setIsPlaying(true);
            setNeedsUserGesture(false);
            hasStartedPlayingRef.current = true;
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-3.5 flex items-center justify-between pointer-events-none">
        {/* Brand */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-night-950/75 backdrop-blur-md border border-pink-500/20 shadow-md">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
          <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-gradient-romantic">
            Ninna Nenapu ❤️
          </span>
        </div>

        {/* Center: Floating Now Playing Pill */}
        <div
          onClick={handleTogglePlay}
          className={`pointer-events-auto cursor-pointer flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-night-950/80 backdrop-blur-md border border-pink-500/30 text-[11px] sm:text-xs text-pink-200 transition-all duration-300 ${
            isPlaying ? 'opacity-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'opacity-70'
          }`}
          title="Click to play/pause music"
        >
          <Music className={`w-3.5 h-3.5 text-pink-400 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="font-medium text-pink-100 truncate max-w-[85px] sm:max-w-[170px]">
            {config.SONG_TITLE}
          </span>
          <span className="text-pink-400 hidden sm:inline">•</span>
          <span className="text-pink-300/80 truncate max-w-[120px] hidden sm:inline">
            {config.SONG_ARTIST.split('&')[0]}
          </span>
          {/* Animated sound wave bars */}
          <div className="flex items-center gap-0.5 ml-1 h-3">
            {[40, 90, 60].map((h, i) => (
              <div
                key={i}
                className="w-0.5 bg-pink-400 rounded-full transition-all"
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  animation: isPlaying ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.2}s` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="w-10 h-10 rounded-full bg-night-950/75 hover:bg-night-950/95 backdrop-blur-md border border-pink-500/20 text-pink-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
          </button>

          {/* Personalize Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3.5 py-2 rounded-full bg-night-950/75 hover:bg-night-950/95 backdrop-blur-md border border-pink-500/20 text-pink-200 text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md"
            title="Personalize names and songs"
          >
            <Settings className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Personalize</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-12 pb-16">
        {/* 1. Opening Screen */}
        <HeroOpening
          herName={config.HER_NAME}
          onOpen={handleOpenHeart}
          isOpen={isHeartOpened}
        />

        {/* The Full Experience (Unfolded and easily explored) */}
        <div className={`transition-opacity duration-1000 ${isHeartOpened ? 'opacity-100' : 'opacity-85'}`}>
          {/* 2. Personal Love Letter */}
          <LoveLetter herName={config.HER_NAME} myName={config.MY_NAME} />

          {/* 3. Kannada Love Messages */}
          <KannadaQuotes />

          {/* 4. Our Memories (Photo Gallery) */}
          <MemoryGallery
            photos={config.OUR_PHOTOS}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />

          {/* 5. Music Corner (Arijit Singh - Samjhawan) */}
          <MusicCorner
            songTitle={config.SONG_TITLE}
            songArtist={config.SONG_ARTIST}
            songUrl={config.SONG_URL}
            youtubeUrl={config.YOUTUBE_URL}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />

          {/* 6. Interactive "How Much Do You Miss Me?" */}
          <HowMuchMissSection />

          {/* 7. Reasons I Love You */}
          <ReasonsLoveSection />

          {/* 8. Tap When You Miss Me */}
          <TapWhenMissButton />

          {/* 9. Final Surprise Screen (Moonlit Finale & Virtual Hug) */}
          <FinalSurpriseScreen
            herName={config.HER_NAME}
            myName={config.MY_NAME}
            whatsappMessage={config.WHATSAPP_MESSAGE}
          />
        </div>
      </main>

      {/* Romantic Footer */}
      <footer className="relative z-10 border-t border-pink-500/15 py-8 text-center text-xs text-pink-300/60 space-y-2 bg-night-950/60 backdrop-blur-md">
        <p className="flex items-center justify-center gap-1.5 text-pink-200">
          <span>Crafted with endless love for</span>
          <span className="font-semibold text-pink-300 underline decoration-pink-500/40">
            {config.HER_NAME}
          </span>
          <span>❤️</span>
        </p>
        <p className="font-kannada text-pink-300/50">
          "ಎಷ್ಟೇ ದೂರವಿದ್ದರೂ, ನೀನು ಸದಾ ನನ್ನ ಹೃದಯದ ಹತ್ತಿರವೇ."
        </p>
        <p className="text-[11px] text-pink-400/40">
          Ninna Nenapu • A personal love letter made with ❤️ by {config.MY_NAME}
        </p>
      </footer>

      {/* Floating Romantic Song Prompt if browser blocked automatic sound on open */}
      {needsUserGesture && !isPlaying && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            attemptPlayAudio(true);
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95 animate-bounce"
          title="Tap anywhere to start playing song"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white shadow-[0_0_35px_rgba(244,63,94,0.7)] border border-pink-300/40 backdrop-blur-lg">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Music className="w-4 h-4 text-white" />
            </div>
            <div className="text-left pr-1">
              <p className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                <span>Tap anywhere to play our song</span>
                <span className="text-sm">🎵</span>
              </p>
              <p className="text-[10px] text-pink-200">
                {config.SONG_TITLE} • {config.SONG_ARTIST.split('&')[0]} ❤️
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-md">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      )}

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={handleUpdateConfig}
      />
    </div>
  );
}

export default App;
