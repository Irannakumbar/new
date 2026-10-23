/**
 * =========================================================================
 * 💌 NINNA NENAPU ❤️ — PERSONALIZATION CONFIGURATION
 * =========================================================================
 * You can personalize every single value below for your girlfriend!
 * Replace placeholders with your own names, photos, and preferred song.
 */

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
}

export const PERSONAL_CONFIG = {
  // 1. Names
  MY_NAME: "Your Person",        // e.g. "Arjun"
  HER_NAME: "My Love",           // e.g. "Ananya", "Chinnu", "Kanna"
  
  // 2. Special Occasion / Subtitle
  OCCASION: "Family Function Away",
  SUBTITLE: "Even when you're far away, you're always close to my heart.",
  SPECIAL_DATE: "Today & Always", // e.g., "Since 14th Feb 2023"

  // 3. Romantic Song Configuration (Arijit Singh - Samjhawan)
  SONG_TITLE: "Samjhawan",
  SONG_ARTIST: "Arijit Singh & Shreya Ghoshal",
  SONG_URL: "/audio/samjhawan.mp3",
  YOUTUBE_URL: "https://www.youtube.com/results?search_query=arijit+singh+samjhawan",

  // 4. Our Memories (Photo Gallery)
  OUR_PHOTOS: [
    {
      id: "photo-1",
      url: "/photos/1.jpeg",
      caption: "My favourite smile ❤️",
      date: "Forever Favourite",
      location: "In My Heart",
    },
    {
      id: "photo-2",
      url: "/photos/2.jpeg",
      caption: "Every moment with you is special.",
      date: "Golden Moments",
      location: "Everywhere With You",
    },
    {
      id: "photo-3",
      url: "/photos/3.jpeg",
      caption: "I wish you were here right now.",
      date: "Under The Same Sky",
      location: "Missing You",
    },
    {
      id: "photo-4",
      url: "/photos/4.jpeg",
      caption: "My happiest place is beside you.",
      date: "Always & Forever",
      location: "By Your Side",
    },
    {
      id: "photo-5",
      url: "/photos/5.jpeg",
      caption: "Counting every star until I see you again ✨",
      date: "Late Night Thoughts",
      location: "Only You",
    },
    {
      id: "photo-6",
      url: "/photos/6.jpeg",
      caption: "Waiting eagerly for that phone call 📞❤️",
      date: "Soon",
      location: "Our World",
    },
    {
      id: "photo-7",
      url: "/photos/7.jpeg",
      caption: "Can't wait to hold your hand again ❤️",
      date: "Together Soon",
      location: "My Whole World",
    },
  ] as PhotoMemory[],

  // 5. WhatsApp Quick Love Note (Optional number or message)
  WHATSAPP_MESSAGE: "Hey sweetheart, I saw the website you made for me! Missing you too... ❤️",
};
