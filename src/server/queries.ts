import { mockGameData } from "@/data/mock";
import { env } from "@/env";
import {
  type GameDataItem,
  type GameDataOptions,
  type PlaylistIds,
} from "@/types";
import { youtube, type youtube_v3 } from "@googleapis/youtube";
import "server-only";

const service = youtube("v3");

const PLAYLIST_IDS: PlaylistIds = {
  views: [
    "PLirAqAtl_h2r5g8xGajEwdXd3x1sZh8hC",
    "PLirAqAtl_h2o4xCWaBsDH3BKNQs8YqLCL",
    "PLirAqAtl_h2p57Njt3QJDtwxAPZENJrIp",
    "PLirAqAtl_h2rTbOXU2Oc-7WBBHmFrnyUC",
  ],
  likes: ["PLirAqAtl_h2pgUWrNiribr7S4NugZiGXx"],
  dislikes: ["PLirAqAtl_h2r5g8xGajEwdXd3x1sZh8hC"],
};

export async function getVideoData(videoIdList: string[]) {
  try {
    const response = await service.videos.list({
      id: videoIdList,
      part: ["statistics"],
      fields: "items(statistics)",
      key: env.YOUTUBE_API_KEY,
    });
    if (response?.data?.items?.length === 0) {
      throw new Error(
        `No video data found for the given video IDs: ${videoIdList.join(",\n")}`,
      );
    }
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
}

export async function getPlaylistItems(playlistId: string, pageToken?: string) {
  try {
    const response = await service.playlistItems.list({
      part: ["snippet", "status"],
      playlistId,
      maxResults: 50,
      key: env.YOUTUBE_API_KEY,
      pageToken,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllItemsFromPlaylists(playlistId: string) {
  let pageToken: string | undefined;
  const allPlaylistItems: youtube_v3.Schema$PlaylistItem[] = [];
  try {
    do {
      const response = await getPlaylistItems(playlistId, pageToken);
      if (response?.items) {
        allPlaylistItems.push(...response?.items);
      }
      pageToken = response?.nextPageToken ?? undefined;
    } while (pageToken);
  } catch (error) {
    console.error(error);
  }

  return allPlaylistItems;
}

export async function gelAllItemsFromAllPlaylists({ mode }: GameDataOptions) {
  const promises = PLAYLIST_IDS[mode].map((playlistId) =>
    getAllItemsFromPlaylists(playlistId),
  );
  const allPlaylistItems = (await Promise.all(promises))
    .flat()
    .filter((video) => video?.status?.privacyStatus === "public");

  return allPlaylistItems;
}

function getDummyGameData({ mode }: GameDataOptions): GameDataItem[] {
  return mockGameData;
}

// TODO: a proper mocking solution
export async function getGameData({
  mode,
}: GameDataOptions): Promise<GameDataItem[]> {
  if (env.NODE_ENV === "development" || env.NODE_ENV === "test") {
    return getDummyGameData({ mode });
  }
  const allItemsFromAllPlaylists = await gelAllItemsFromAllPlaylists({ mode });
  const gameDataNormalized = normilizeGameData(allItemsFromAllPlaylists);
  return gameDataNormalized;
}

function normilizeGameData(
  gameData: youtube_v3.Schema$PlaylistItem[],
): GameDataItem[] {
  return gameData.map((item) => {
    return {
      title: item?.snippet?.title,
      thumbnails: item?.snippet?.thumbnails,
      videoId: item?.snippet?.resourceId?.videoId,
    };
  });
}
