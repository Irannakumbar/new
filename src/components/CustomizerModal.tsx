import React, { useState } from 'react';
import { Settings, X, Heart, Music, Camera, Copy, Check, Sparkles } from 'lucide-react';
import { ConfigType } from '../types';
import { soundEngine } from '../utils/soundEffects';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfigType;
  onSaveConfig: (newConfig: Partial<ConfigType>) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [herName, setHerName] = useState(config.HER_NAME);
  const [myName, setMyName] = useState(config.MY_NAME);
  const [songTitle, setSongTitle] = useState(config.SONG_TITLE);
  const [songArtist, setSongArtist] = useState(config.SONG_ARTIST);
  const [songUrl, setSongUrl] = useState(config.SONG_URL);
  const [youtubeUrl, setYoutubeUrl] = useState(config.YOUTUBE_URL);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playHeartBurst();
    onSaveConfig({
      HER_NAME: herName,
      MY_NAME: myName,
      SONG_TITLE: songTitle,
      SONG_ARTIST: songArtist,
      SONG_URL: songUrl,
      YOUTUBE_URL: youtubeUrl,
    });
    onClose();
  };

  const codeSnippet = `// In src/config.ts:
export const PERSONAL_CONFIG = {
  MY_NAME: "${myName}",
  HER_NAME: "${herName}",
  SONG_TITLE: "${songTitle}",
  SONG_ARTIST: "${songArtist}",
  SONG_URL: "${songUrl}",
  YOUTUBE_URL: "${youtubeUrl}",
};`;

  const copyConfigSnippet = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    soundEngine.playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full my-8 rounded-3xl p-6 sm:p-8 glass-panel border border-pink-400/40 shadow-[0_0_50px_rgba(244,63,94,0.3)] space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-400/20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-pink-100">Personalize Ninna Nenapu ❤️</h3>
              <p className="text-xs text-pink-300/70">Customize values live or save to src/config.ts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleApply} className="space-y-4 text-left">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
                Her Name / Nickname
              </label>
              <input
                type="text"
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                placeholder="e.g. Ananya, Chinnu, My Love"
                className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                placeholder="e.g. Arjun, Your Person"
                className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>
          </div>

          {/* Song info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
                Song Title
              </label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="e.g. Marali Manasagide"
                className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
                Artist
              </label>
              <input
                type="text"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                placeholder="e.g. Sanjith Hegde"
                className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>
          </div>

          {/* Audio URL & YouTube */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
              Custom Audio File / URL (Optional)
            </label>
            <input
              type="text"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              placeholder="Leave empty to use built-in romantic lofi piano synthesizer"
              className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-pink-300 font-semibold mb-1">
              YouTube Search / Song Link
            </label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-night-950/80 border border-pink-500/30 text-white placeholder-pink-400/30 text-sm focus:outline-none focus:border-pink-400"
            />
          </div>

          {/* Quick Photo Tip */}
          <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-400/20 text-xs text-pink-200/90 flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Tip for Photos:</strong> Put your photos into the <code className="bg-pink-950 px-1 py-0.5 rounded text-pink-300">public/photos/</code> folder and update <code className="bg-pink-950 px-1 py-0.5 rounded text-pink-300">src/config.ts</code>!
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={copyConfigSnippet}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-200 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied code!' : 'Copy to src/config.ts'}</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-sm font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Preview Changes Now ❤️
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
