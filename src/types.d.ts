import { type youtube_v3 } from "@googleapis/youtube";

export type GameDataOptions = {
  mode: "views" | "likes" | "dislikes";
};

export type PlaylistIds = Record<GameDataOptions["mode"], string[]>;

export type GameDataItem = {
  title: string | null | undefined;
  thumbnails: youtube_v3.Schema$ThumbnailDetails | undefined;
  videoId: string | null | undefined;
};
