/**
 * Web Audio API based romantic chime & ambient music synthesizer.
 * Works seamlessly in any modern browser without external audio dependencies.
 */

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private ambientInterval: number | null = null;
  public isAmbientPlaying: boolean = false;
  private currentChordIndex = 0;

  // Romantic Pentatonic Chords (C Major / A Minor romantic progression)
  // Peaceful, warm, reminiscent of late night acoustic guitar & electric piano
  private chords = [
    [261.63, 329.63, 392.00, 523.25], // Cmaj (C4, E4, G4, C5)
    [220.00, 261.63, 329.63, 440.00], // Amin (A3, C4, E4, A4)
    [174.61, 220.00, 261.63, 349.23], // Fmaj (F3, A3, C4, F4)
    [196.00, 246.94, 293.66, 392.00], // Gmaj (G3, B3, D4, G4)
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single soft crystal chime
  playChime(freq = 523.25, duration = 1.2, volume = 0.15) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with subtle harmonics for a warm music box feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  // Play a gentle cascade of romantic notes (when opening heart, selecting cards)
  playHeartBurst() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.9, 0.12 - idx * 0.02);
      }, idx * 120);
    });
  }

  // Play a soft cute pop for card flips & hugs
  playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext policy
    }
  }

  // Soft romantic arpeggiated background generator (when no song url is loaded)
  startAmbientMusic() {
    if (this.isAmbientPlaying) return;
    this.initCtx();
    this.isAmbientPlaying = true;

    const playNextChordArpeggio = () => {
      if (!this.isAmbientPlaying) return;
      const chord = this.chords[this.currentChordIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

      // Stagger notes softly
      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (this.isAmbientPlaying) {
            this.playChime(freq, 2.5, 0.08);
          }
        }, i * 400);
      });
    };

    playNextChordArpeggio();
    this.ambientInterval = window.setInterval(playNextChordArpeggio, 2800);
  }

  stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval !== null) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbientMusic();
    }
    return this.isMuted;
  }
}

export const soundEngine = new RomanticSoundEngine();
