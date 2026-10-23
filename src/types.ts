export interface ConfigType {
  MY_NAME: string;
  HER_NAME: string;
  OCCASION: string;
  SUBTITLE: string;
  SPECIAL_DATE: string;
  SONG_TITLE: string;
  SONG_ARTIST: string;
  SONG_URL: string;
  YOUTUBE_URL: string;
  OUR_PHOTOS: {
    id: string;
    url: string;
    caption: string;
    date?: string;
    location?: string;
  }[];
  WHATSAPP_MESSAGE: string;
}

export interface FloatingHeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
}
