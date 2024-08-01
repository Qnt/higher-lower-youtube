import { getVideoData } from "@/server/queries";
import Image from "next/image";

export default async function HomePage() {
  const videoDataList = await getVideoData(["EeF3UTkCoxY"]);
  // console.log(videoData?.snippet?.thumbnails);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {videoDataList?.map((videoData) => {
        return (
          <Image
            key={videoData?.id}
            src={videoData?.snippet?.thumbnails?.maxres?.url ?? ""}
            width={videoData?.snippet?.thumbnails?.maxres?.width ?? 480}
            height={videoData?.snippet?.thumbnails?.maxres?.height ?? 360}
            alt="Thumbnail"
          />
        );
      })}
    </main>
  );
}
