"use client";
import rickroll from "@/data/images/rickroll.webp";
import { type GameDataItem } from "@/types";
import Image from "next/image";
import { type SetStateAction, useState } from "react";
import Intro from "./intro";

function getRandomGameDataItem(gameData: GameDataItem[]) {
  const randomIndex = Math.floor(Math.random() * gameData.length);
  return gameData[randomIndex];
}

export default function Game({ gameData }: { gameData: GameDataItem[] }) {
  const [curScore, setCurScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted && <Intro isStarted={false} setIsStarted={setIsStarted} />}
      {isStarted && (
        <div>
          <h1>Higher or Lower</h1>
          <p>
            Score: {curScore}/{maxScore}
          </p>
          <ol>
            {gameData.map((item) => {
              return (
                <li key={item.videoId}>
                  <p>{item.title}</p>
                  <Image
                    key={item.videoId}
                    src={item.thumbnails?.maxres?.url ?? rickroll}
                    width={item?.thumbnails?.maxres?.width ?? 480}
                    height={item?.thumbnails?.maxres?.height ?? 360}
                    alt="Thumbnail"
                  />
                  <span>{item.videoId}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </>
  );
}
