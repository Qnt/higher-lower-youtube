import { env } from "@/env";
import { youtube } from "@googleapis/youtube";

export async function getVideoData(videoIdList: string[]) {
  const service = youtube("v3");
  try {
    const response = await service.videos.list({
      id: videoIdList,
      part: ["snippet", "contentDetails", "statistics"],
      fields: "items(id,snippet,statistics)",
      key: env.YOUTUBE_API_KEY,
    });
    if (response?.data?.items?.length === 0) {
      throw new Error("Video not found");
    }
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
}
