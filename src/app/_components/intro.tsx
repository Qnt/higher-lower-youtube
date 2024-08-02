import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../_ui/button";

export default function Intro({
  isStarted,
  setIsStarted,
}: {
  isStarted: boolean;
  setIsStarted: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Welcome to the &quot;Higher or Lower&quot; Game</h1>
      <Button onClick={() => setIsStarted(!isStarted)}>Start Game</Button>
    </div>
  );
}
