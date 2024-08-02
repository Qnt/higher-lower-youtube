import { getGameData } from "@/server/queries";
import { type GameDataItem } from "@/types";
import Game from "./_components/game";

export default async function HomePage() {
  const gameData: GameDataItem[] = await getGameData({ mode: "likes" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* <ol className="flex list-decimal flex-col gap-4 p-4">
        {gameData?.map((item) => {
          return (
            // <Image
            //   key={videoData?.id}
            //   src={videoData?.snippet?.thumbnails?.maxres?.url ?? ""}
            //   width={videoData?.snippet?.thumbnails?.maxres?.width ?? 480}
            //   height={videoData?.snippet?.thumbnails?.maxres?.height ?? 360}
            //   alt="Thumbnail"
            // />
            <li key={item?.videoId}>
              <p>{item?.title}</p>
              <span>{item?.videoId}</span>
            </li>
          );
        })}
      </ol> */}
      <Game gameData={gameData} />
    </main>
  );
}
