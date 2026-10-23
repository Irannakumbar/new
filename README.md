# Ninna Nenapu ❤️ — A Romantic Digital Experience

> *"Even when you're far away, you're always close to my heart."*

A modern, mobile-responsive romantic website built with React, TypeScript, Tailwind CSS, and Web Audio synthesis for your girlfriend while she is away attending a family function.

---

## ✨ Features

1. **Starry Night Sky & Floating Petals**
   - Canvas-rendered twinkling stars, shooting stars (meteors), and gently floating rose petals & hearts.
2. **Glowing Heart Opening Screen**
   - Welcoming message with an animated pulsating heart and "Open My Heart 💌" gateway.
3. **A Little Letter for You 💌**
   - Realistic typewriter animation with replay/skip controls and an animated handwritten signature.
4. **Kannada Love Messages ❤️**
   - Rendered using Google Noto Sans Kannada & Tiro Kannada with English subtext translations.
5. **Our Memories 📸**
   - Photo gallery with romantic captions, soft zoom hover effects, and a full-screen lightbox modal.
6. **Music Corner 🎵**
   - Sanjith Hegde romantic missing-you vibes.
   - Built-in soothing ambient piano/chime synthesizer so it plays out-of-the-box without audio file errors.
   - Supports custom `.mp3` files, local audio tracks, and direct YouTube search links.
7. **Interactive "How Much Do You Miss Me?" 🥹**
   - 3 interactive buttons triggering sweet responses and floating heart bursts.
8. **Reasons I Love You 💕**
   - 6 interactive 3D flip cards revealing heartfelt secrets.
9. **Tap When You Miss Me 💌**
   - Interactive surprise button generating comforting romantic thoughts on demand.
10. **Final Surprise Screen 🌙**
    - Glowing moonlit night sky and the "One Last Hug 🤗" full-screen virtual hug experience.
11. **Live Customizer & Quick WhatsApp Link**
    - Floating settings modal to preview changes live or copy config to `src/config.ts`.
    - Instant "Text Me On WhatsApp ❤️" button in the virtual hug screen.

---

## 🛠️ How to Personalize for Your Girlfriend

Open [`src/config.ts`](file:///c:/Users/VERSH/OneDrive/Desktop/foru/src/config.ts) and edit the values at the top:

```typescript
export const PERSONAL_CONFIG = {
  // 1. Her Name and Your Name
  MY_NAME: "Your Name",          // e.g. "Arjun"
  HER_NAME: "My Love",           // e.g. "Ananya", "Chinnu", "Kanna"
  
  // 2. Romantic Song
  SONG_TITLE: "Marali Manasagide",
  SONG_ARTIST: "Sanjith Hegde",
  SONG_URL: "",                  // optional: paste direct mp3 link or local path
  YOUTUBE_URL: "https://www.youtube.com/results?search_query=sanjith+hegde+romantic+kannada+songs",

  // 3. Your Photos
  OUR_PHOTOS: [
    {
      id: "photo-1",
      url: "https://...",        // or "/photos/pic1.jpg"
      caption: "My favourite smile ❤️",
      date: "Forever Favourite",
      location: "In My Heart",
    },
    // ...
  ],
};
```

### Adding Your Own Local Pictures:
1. Place your photos into the `public/photos/` folder (e.g. `pic1.jpg`, `pic2.jpg`).
2. In `src/config.ts`, set `url: "/photos/pic1.jpg"`.

---

## 🚀 Running Locally

1. Install dependencies (already installed):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

3. Build production bundle:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel or Netlify (Free & Instant)

### Option 1: Deploy with Vercel CLI / Web
1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework preset: **Vite**.
5. Click **"Deploy"**. You will receive a live URL to send to your girlfriend!

### Option 2: Deploy to Netlify
1. Run `npm run build` to generate the `dist/` directory.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag-and-drop the `dist` folder directly.
3. Your romantic website will be live in 10 seconds!

---

*Made with love ❤️*
