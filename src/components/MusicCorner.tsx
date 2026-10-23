import React from 'react';
import { Music, Play, Pause, Volume2, VolumeX, ExternalLink, Sparkles, Heart } from 'lucide-react';

interface MusicCornerProps {
  songTitle: string;
  songArtist: string;
  songUrl: string;
  youtubeUrl: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
  volume: number;
  onVolumeChange: (newVol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MusicCorner: React.FC<MusicCornerProps> = ({
  songTitle,
  songArtist,
  songUrl,
  youtubeUrl,
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const handleVolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <section id="music-corner" className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
          <Music className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Late Night Frequency</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-romantic">
          This Song Reminds Me of You 🎵
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base max-w-lg mx-auto">
          Whenever I miss you, this melody plays on repeat in my mind. Press play for a peaceful romantic moment.
        </p>
      </div>

      {/* Romantic Music Player Card */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-panel border border-pink-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Vinyl / Cover Art with Pulsing Visualizer */}
          <div className="relative group cursor-pointer" onClick={onTogglePlay}>
            {/* Outer halo */}
            <div
              className={`absolute -inset-3 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-lg transition-all duration-700 ${
                isPlaying ? 'opacity-100 scale-105 animate-pulse' : 'opacity-30'
              }`}
            />

            {/* Disc */}
            <div
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-night-950 via-purple-950 to-pink-950 border-4 border-pink-500/40 shadow-2xl flex items-center justify-center transition-all"
              style={{
                animation: isPlaying ? 'spin 14s linear infinite' : 'none',
              }}
            >
              {/* Disc vinyl grooves */}
              <div className="absolute inset-3 rounded-full border border-pink-400/15" />
              <div className="absolute inset-7 rounded-full border border-pink-400/10" />

              {/* Center label */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-600 to-rose-700 flex items-center justify-center shadow-inner border-2 border-white/30 text-white">
                <Heart className={`w-8 h-8 fill-white ${isPlaying ? 'animate-heartbeat' : ''}`} />
              </div>
            </div>

            {/* Sparkle badge */}
            <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-pink-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
          </div>

          {/* Player Controls & Info */}
          <div className="flex-1 w-full space-y-5 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
                <span>{songArtist.includes('Arijit') ? 'Arijit Singh • Soulful Romance' : 'Romantic Melody'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span>{songUrl ? 'Playing Now' : 'Romantic Ambient Chimes'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-pink-50">
                {songTitle || 'Samjhawan'}
              </h3>
              <p className="text-pink-300/80 text-sm font-medium mt-0.5">
                {songArtist || 'Arijit Singh & Shreya Ghoshal'}
              </p>
              {songArtist.includes('Arijit') && (
                <p className="text-xs text-pink-200/80 italic mt-1.5 font-light">
                  "Main tenu samjhawan ki... na tere bina lagda jee ❤️"
                </p>
              )}
            </div>

            {/* Animated Audio Visualizer bars */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 h-8">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 50, 85, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-pink-600 to-rose-300 transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * Math.sin((currentTime + i) * 1.5) + h) / 2)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.35,
                  }}
                />
              ))}
            </div>

            {/* Progress Bar & Timestamps */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max={duration || 180}
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-1.5 bg-pink-950/60 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-colors"
                aria-label="Track progress"
              />
              <div className="flex justify-between text-xs text-pink-300/60 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-4 mx-auto md:mx-0">
                {/* Play/Pause Button */}
                <button
                  id="music-play-pause-btn"
                  onClick={onTogglePlay}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(244,63,94,0.5)] transition-all transform hover:scale-105 active:scale-95"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </button>

                {/* Volume / Mute */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onToggleMute}
                    className="p-2 rounded-full text-pink-300/80 hover:text-white hover:bg-pink-500/20 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolChange}
                    className="w-16 sm:w-20 h-1 bg-pink-950/80 rounded-lg appearance-none cursor-pointer accent-pink-400"
                    aria-label="Volume control"
                  />
                </div>
              </div>

              {/* YouTube / Streaming Button */}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-red-600/20 hover:bg-red-600/30 text-rose-200 border border-red-500/30 transition-all hover:scale-105 mx-auto md:mx-0 shadow-sm"
                >
                  <span>Listen on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
